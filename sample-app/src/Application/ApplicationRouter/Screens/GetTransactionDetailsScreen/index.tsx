import React, { FC, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList, Screen } from '../../../../Data/TypeDefinitions'
import {
  SafeAreaView,
  ScrollView,
  View,
  KeyboardAvoidingView,
} from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { IS_IOS } from '../../../../Data/Constants'
import Button from '../../../../Components/Button'
import TextInput from '../../../../Components/TextInput'
import HowToStepsList from '../../../../Components/HowToStepsList'
import JudoPay from 'judokit-react-native'
import { useJudoConfiguration } from '../../../../CustomHooks/useJudoConfiguration'
import { onError, transformToListOfResultItems } from '../../../../Functions'

const GetTransactionDetailsScreen: FC<
  StackScreenProps<RootStackParamList, Screen.GET_TRANSACTION_DETAILS>,
> = () => {
  const {
    colors: { background: backgroundColor },
  } = useTheme()
  const { isSandboxed, authorization } = useJudoConfiguration()
  const { navigate } = useNavigation()

  const [receiptId, setReceiptId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onGetTransactionDetailsPress = () => {
    setIsLoading(true)

    const judo = new JudoPay(authorization)
    judo.isSandboxed = isSandboxed

    judo
      .fetchTransactionDetails(receiptId)
      .then((result) => {
        navigate(Screen.RESULT, { items: transformToListOfResultItems(result) })
        setIsLoading(false)
      })
      .catch((error) => {
        onError(error)
        setIsLoading(false)
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
  )
}

export default GetTransactionDetailsScreen
