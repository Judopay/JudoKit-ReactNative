import React, { FC, useEffect, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList, Screen } from '../../../../Data/TypeDefinitions'
import { useNavigation, useTheme } from '@react-navigation/native'
import { IS_IOS } from '../../../../Data/Constants'
import JudoPay, {
  JudoPBBAButton,
  JudoTransactionMode,
} from 'judokit-react-native'
import { useJudoConfiguration } from '../../../../CustomHooks/useJudoConfiguration'
import {
  onError,
  regeneratePaymentReferenceIfNeeded,
  transformToListOfResultItems,
} from '../../../../Functions'

const PayByBankAppScreen: FC<
  StackScreenProps<RootStackParamList, Screen.PAY_BY_BANK_APP>
> = () => {
  const {
    colors: { background: backgroundColor, text },
  } = useTheme()
  const { configuration, isSandboxed, authorization } = useJudoConfiguration()
  const { navigate } = useNavigation()

  const [isBankingAppAvailable, setIsBankingAppAvailable] = useState(false)

  useEffect(() => {
    const judo = new JudoPay(authorization)
    judo.isSandboxed = isSandboxed

    judo
      .isBankingAppAvailable()
      .then(setIsBankingAppAvailable)
      .catch(console.error)
  }, [authorization, isSandboxed])

  const onPbBAButtonPress = () => {
    const judo = new JudoPay(authorization)
    judo.isSandboxed = isSandboxed

    judo
      .invokePayByBankApp(regeneratePaymentReferenceIfNeeded(configuration))
      .then(result =>
        navigate(Screen.RESULT, {
          items: transformToListOfResultItems(result),
        }),
      )
      .catch(onError)
  }

  const renderPbBAButton = () => (
    <TouchableOpacity
      onPress={onPbBAButtonPress}
      style={{
        height: 50,
        width: IS_IOS ? 310 : 200, //TODO: why?!!
      }}
    >
      <JudoPBBAButton style={{ flex: 1 }} />
    </TouchableOpacity>
  )

  const renderPbBAAppNotAvailableMessage = () => (
    <Text
      style={{
        fontSize: 14,
        fontWeight: 'bold',
        color: text,
      }}
    >
      No banking app available.
    </Text>
  )

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor,
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        {isBankingAppAvailable
          ? renderPbBAButton()
          : renderPbBAAppNotAvailableMessage()}
      </View>
    </SafeAreaView>
  )
}

export default PayByBankAppScreen
