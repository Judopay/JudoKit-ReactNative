import JudoPay, {
  JudoAuthorization,
  JudoConfiguration,
  JudoResponse,
  JudoTransactionMode,
  JudoTransactionType,
} from 'judokit-react-native';
import { Alert } from 'react-native';
import {
  AlertFunctionProps,
  DemoFeatureType,
  Screen,
} from '../Data/TypeDefinitions';
import _ from 'lodash';
import { ResultItem } from '../Application/ApplicationRouter/Screens/ResultScreen';
import Snackbar from 'react-native-snackbar';

interface PromiseForFeature {
  featureType: DemoFeatureType;
  judo: JudoPay;
  configuration: JudoConfiguration;
}

export interface DispatchProps {
  featureType: DemoFeatureType;
  isSandboxed: boolean;
  authorization?: JudoAuthorization;
  configuration: JudoConfiguration;
  onSuccess: (response: JudoResponse) => void;
  onError: (error: Error) => void;
  onNavigate: (screen: Screen, props?: Record<string, any>) => void;
}

const promiseForFeature = ({
  featureType,
  judo,
  configuration,
}: PromiseForFeature) => {
  switch (featureType) {
    case DemoFeatureType.PAYMENT:
      return judo.invokeTransaction(JudoTransactionType.Payment, configuration);

    case DemoFeatureType.PRE_AUTH:
      return judo.invokeTransaction(JudoTransactionType.PreAuth, configuration);

    case DemoFeatureType.CREATE_CARD_TOKEN:
      return judo.invokeTransaction(
        JudoTransactionType.RegisterCard,
        configuration
      );

    case DemoFeatureType.SAVE_CARD:
      return judo.invokeTransaction(
        JudoTransactionType.SaveCard,
        configuration
      );

    case DemoFeatureType.CHECK_CARD:
      return judo.invokeTransaction(
        JudoTransactionType.CheckCard,
        configuration
      );

    case DemoFeatureType.APPLE_PAY_PAYMENT:
      return judo.invokeApplePay(JudoTransactionMode.Payment, configuration);

    case DemoFeatureType.APPLE_PAY_PRE_AUTH:
      return judo.invokeApplePay(JudoTransactionMode.PreAuth, configuration);

    case DemoFeatureType.GOOGLE_PAY_PAYMENT:
      return judo.invokeGooglePay(JudoTransactionMode.Payment, configuration);

    case DemoFeatureType.GOOGLE_PAY_PRE_AUTH:
      return judo.invokeGooglePay(JudoTransactionMode.PreAuth, configuration);

    case DemoFeatureType.PAYMENT_METHODS:
      return judo.invokePaymentMethodScreen(
        JudoTransactionMode.Payment,
        configuration
      );

    case DemoFeatureType.PRE_AUTH_METHODS:
      return judo.invokePaymentMethodScreen(
        JudoTransactionMode.PreAuth,
        configuration
      );

    case DemoFeatureType.SERVER_TO_SERVER:
      return judo.invokePaymentMethodScreen(
        JudoTransactionMode.ServerToServer,
        configuration
      );

    default:
      return Promise.reject(
        new Error(
          `No Promise for DemoFeatureType: ${featureType} to be returned.`
        )
      );
  }
};

const screenForFeature = (featureType: DemoFeatureType) => {
  switch (featureType) {
    case DemoFeatureType.TOKEN_PAYMENTS:
      return Screen.TOKEN_PAYMENTS;

    case DemoFeatureType.NO_UI_PAYMENTS:
      return Screen.NO_UI_PAYMENTS;

    case DemoFeatureType.GET_TRANSACTION_DETAILS:
      return Screen.GET_TRANSACTION_DETAILS;

    default:
      return undefined;
  }
};

export const dispatch = ({
  featureType,
  isSandboxed,
  authorization,
  configuration,
  onError,
  onSuccess,
  onNavigate,
}: DispatchProps) => {
  const judo = new JudoPay(authorization || ({} as JudoAuthorization));
  judo.isSandboxed = isSandboxed;

  const screen = screenForFeature(featureType);

  if (screen) {
    onNavigate(screen);
    return;
  }

  promiseForFeature({ featureType, judo, configuration })
    .then(onSuccess)
    .catch(onError);
};

export const alert = ({
  title = 'Error',
  message,
  onPressOK,
}: AlertFunctionProps) => {
  Alert.alert(title, message, [{ text: 'OK', onPress: onPressOK }]);
};

export function transformToListOfResultItems(
  result: JudoResponse
): Array<ResultItem> {
  const mapToResultItemList = (
    objectToMap: Record<string, any>
  ): Array<ResultItem> => {
    return _.map(objectToMap, (value, key): ResultItem => {
      if (_.isPlainObject(value)) {
        return { title: key, subItems: mapToResultItemList(value) };
      } else {
        return { title: key, value: `${value}` };
      }
    });
  };

  return mapToResultItemList(result);
}

export function fromJSONString<T>(value: string | null, defaultValue: T): T {
  try {
    return value ? (parseJSON(value) as T) : defaultValue;
  } catch (error) {
    console.warn(error);
    return defaultValue;
  }
}

export function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch (error) {
    console.warn(error);
    return undefined;
  }
}

export const onError = (error: Error) => {
  const { message } = error;
  if (message.includes('cancel')) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#e95454',
    });
    return;
  }

  alert({ message });
};

export const regeneratePaymentReferenceIfNeeded = (
  configuration: JudoConfiguration
): JudoConfiguration => {
  const { reference } = configuration;
  const { paymentReference, consumerReference } = reference;
  const metadata = {
    'example-key-1': 'example-string-value',
    'example-key-2': '10',
  };

  return {
    ...configuration,
    reference: {
      paymentReference:
        paymentReference?.length === 0
          ? Math.random().toString(36).substring(2, 10)
          : paymentReference,
      consumerReference:
        consumerReference?.length === 0
          ? 'my-unique-consumer-ref'
          : consumerReference,
      metadata,
    },
  };
};
