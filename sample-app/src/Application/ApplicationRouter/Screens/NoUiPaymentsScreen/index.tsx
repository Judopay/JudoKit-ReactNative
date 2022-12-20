import React, { FC, useEffect, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList, Screen } from '../../../../Data/TypeDefinitions'
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { IS_IOS } from '../../../../Data/Constants'
import TextInput from '../../../../Components/TextInput'
import Button from '../../../../Components/Button'
import HowToStepsList from '../../../../Components/HowToStepsList'
import JudoPay, { JudoTransactionType } from 'judokit-react-native'
import { useJudoConfiguration } from '../../../../CustomHooks/useJudoConfiguration'
import {
  onError,
  regeneratePaymentReferenceIfNeeded,
  transformToListOfResultItems,
} from '../../../../Functions'

const NoUiPaymentsScreen: FC<
  StackScreenProps<RootStackParamList, Screen.NO_UI_PAYMENTS>,
> = () => {
  const {
    colors: { background: backgroundColor },
  } = useTheme()
  const { navigate } = useNavigation()
  const { isSandboxed, authorization, configuration } = useJudoConfiguration()

  const [isLoading, setIsLoading] = useState(false)
  const [isValid, setIsValid] = useState(false)

  const [cardNumber, setCardNumber] = useState('')
  const [cardholderName, setCardholderName] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cardSecurityCode, setCardSecurityCode] = useState('')

  useEffect(() => {
    setIsValid(
      cardNumber.length > 0 &&
        cardholderName.length > 0 &&
        expiryDate.length > 0 &&
        cardSecurityCode.length > 0,
    )
  }, [cardNumber, cardholderName, expiryDate, cardSecurityCode])

  const invokePayment = (type: JudoTransactionType) => {
    setIsLoading(true)

    const judo = new JudoPay(authorization)
    judo.isSandboxed = isSandboxed

    judo
      .invokeTransaction(
        type,
        regeneratePaymentReferenceIfNeeded(configuration),
      )
      .then((result) => {
        setIsLoading(false)
        navigate(Screen.RESULT, { items: transformToListOfResultItems(result) })
      })
      .catch((error) => {
        setIsLoading(false)
        onError(error)
      })
  }

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
                'Fill in the fields from below with your card details.',
                "Tap 'PAY WITH CARD' or `PREAUTH WITH CARD` button.",
              ]}
            />

            <TextInput
              editable={!isLoading}
              placeholder="Card number"
              value={cardNumber}
              onChangeText={setCardNumber}
            />

            <TextInput
              editable={!isLoading}
              placeholder="Cardholder name"
              value={cardholderName}
              onChangeText={setCardholderName}
            />

            <TextInput
              editable={!isLoading}
              placeholder="Expiry date (MM/YY format)"
              value={expiryDate}
              onChangeText={setExpiryDate}
            />

            <TextInput
              marginBottom={24}
              editable={!isLoading}
              placeholder="Card security code"
              value={cardSecurityCode}
              onChangeText={setCardSecurityCode}
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
              Properties like: billingAddress, emailAddress, mobileNumber,
              phoneCountryCode are taken from app settings.
            </Text>

            <Button
              isLoading={isLoading}
              disabled={isLoading || !isValid}
              title="Pay with card"
              onPress={() => invokePayment(JudoTransactionType.Payment)}
            />

            <Button
              isLoading={isLoading}
              disabled={isLoading || !isValid}
              title="PreAuth with card"
              onPress={() => invokePayment(JudoTransactionType.PreAuth)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default NoUiPaymentsScreen
