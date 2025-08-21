import React, { FC, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Screen } from '../../../../Data/TypeDefinitions';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import { API_CONFIGURATION_KEYS, IS_IOS } from '../../../../Data/Constants';
import Button from '../../../../Components/Button';
import TextInput from '../../../../Components/TextInput';
import HowToStepsList from '../../../../Components/HowToStepsList';
import JudoPay from 'judokit-react-native';
import { onError, transformToListOfResultItems } from '../../../../Functions';
import {
  getBoolOrFalse,
  judoAuthorizationFromSettingsData,
} from '../../../../Data/Mapping';

const GetTransactionDetailsScreen: FC<
  NativeStackScreenProps<RootStackParamList, Screen.GET_TRANSACTION_DETAILS>
> = () => {
  const {
    colors: { background: backgroundColor },
  } = useTheme();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const [receiptId, setReceiptId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onGetTransactionDetailsPress = () => {
    setIsLoading(true);

    const judo = new JudoPay(judoAuthorizationFromSettingsData());
    judo.isSandboxed = getBoolOrFalse(API_CONFIGURATION_KEYS.IS_SANDBOXED);

    judo
      .fetchTransactionDetails(receiptId)
      .then((result) => {
        navigate(Screen.RESULT, {
          items: transformToListOfResultItems(result),
        });
        setIsLoading(false);
      })
      .catch((error) => {
        onError(error);
        setIsLoading(false);
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
                "Fill in the field from below with your 'receiptId'.",
                "Tap 'GET TRANSACTION DETAILS' button.",
              ]}
            />

            <TextInput
              marginBottom={44}
              editable={!isLoading}
              placeholder="Enter your receiptId here"
              value={receiptId}
              onChangeText={setReceiptId}
            />

            <Button
              isLoading={isLoading}
              disabled={receiptId.length === 0 || isLoading}
              title="Get transaction details"
              onPress={onGetTransactionDetailsPress}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default GetTransactionDetailsScreen;
