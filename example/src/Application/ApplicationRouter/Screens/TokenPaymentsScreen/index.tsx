import React, { FC, useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, Screen } from '../../../../Data/TypeDefinitions';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import { IS_IOS } from '../../../../Data/Constants';
import HowToStepsList from '../../../../Components/HowToStepsList';
import TextInput from '../../../../Components/TextInput';
import Button from '../../../../Components/Button';
import { useJudoConfiguration } from '../../../../CustomHooks/useJudoConfiguration';
import JudoPay, {
  JudoTransactionMode,
  JudoTransactionType,
} from 'judokit-react-native';
import {
  onError,
  regeneratePaymentReferenceIfNeeded,
  transformToListOfResultItems,
} from '../../../../Functions';

const TokenPaymentsScreen: FC<
  StackScreenProps<RootStackParamList, Screen.TOKEN_PAYMENTS>
> = () => {
  const {
    colors: { background: backgroundColor },
  } = useTheme();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { isSandboxed, authorization, configuration } = useJudoConfiguration();

  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [token, setToken] = useState('');
  const [scheme, setScheme] = useState('');
  const [cardSecurityCode, sedCardSecurityCode] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  useEffect(() => {
    setIsValid(scheme.length > 0 && token.length > 0);
  }, [token, scheme]);

  const invokeSaveCard = () => {
    setIsLoading(true);

    const judo = new JudoPay(authorization);
    judo.isSandboxed = isSandboxed;
    judo
      .invokeTransaction(
        JudoTransactionType.SaveCard,
        regeneratePaymentReferenceIfNeeded(configuration)
      )
      .then((result) => {
        setIsLoading(false);
        const { cardDetails = {} } = result;
        const {
          cardToken = '',
          cardScheme = '',
          cardHolderName = '',
        } = cardDetails;

        setToken(cardToken);
        setScheme(cardScheme);
        setCardholderName(cardHolderName);
      })
      .catch((error) => {
        setIsLoading(false);
        onError(error);
      });
  };

  const invokeTokenPayment = (mode: JudoTransactionMode) => {
    setIsLoading(true);

    const judo = new JudoPay(authorization);
    judo.isSandboxed = isSandboxed;

    const code = cardSecurityCode.length > 0 ? cardSecurityCode : undefined;
    const name = cardholderName.length > 0 ? cardholderName : undefined;

    judo
      .performTokenTransaction(
        mode,
        regeneratePaymentReferenceIfNeeded(configuration),
        token,
        code,
        name,
        scheme
      )
      .then((result) => {
        setIsLoading(false);
        navigate(Screen.RESULT, {
          items: transformToListOfResultItems(result),
        });
      })
      .catch((error) => {
        setIsLoading(false);
        onError(error);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor,
      }}
    >
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: 36,
            }}
          >
            <HowToStepsList
              steps={[
                'Fill in the fields from below with your tokenized card details OR tap on `TOKENIZE A NEW CARD` button to tokenize your card and prefill the fields with newly created card token details.',
                "Tap on 'PAY WITH TOKEN' or `PRE-AUTH WITH TOKEN` button.",
              ]}
            />

            <TextInput
              editable={!isLoading}
              placeholder="Card scheme"
              value={scheme}
              onChangeText={setScheme}
            />

            <TextInput
              editable={!isLoading}
              placeholder="Card token"
              value={token}
              onChangeText={setToken}
            />

            <TextInput
              editable={!isLoading}
              placeholder="Card security code"
              value={cardSecurityCode}
              onChangeText={sedCardSecurityCode}
            />

            <TextInput
              marginBottom={24}
              editable={!isLoading}
              placeholder="Cardholder name"
              value={cardholderName}
              onChangeText={setCardholderName}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: 'normal',
                color: '#6e6e6e',
                textAlign: 'left',
                width: '100%',
                marginBottom: 44,
                fontStyle: 'italic',
              }}
            >
              If left empty 'Card security code' and/or 'Cardholder name' field,
              the corresponding property will be excluded when sending the
              request.
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: 'normal',
                color: '#6e6e6e',
                textAlign: 'center',
                width: '100%',
                marginBottom: 24,
              }}
            >
              ⎯ OR ⎯
            </Text>

            <Button
              marginBottom={44}
              isLoading={isLoading}
              disabled={isLoading}
              title="Tokenize a new card"
              onPress={() => invokeSaveCard()}
            />

            <Button
              isLoading={isLoading}
              disabled={isLoading || !isValid}
              title="Pay with token"
              onPress={() => invokeTokenPayment(JudoTransactionMode.Payment)}
            />
            <Button
              isLoading={isLoading}
              disabled={isLoading || !isValid}
              title="PreAuth with token"
              onPress={() => invokeTokenPayment(JudoTransactionMode.PreAuth)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TokenPaymentsScreen;
