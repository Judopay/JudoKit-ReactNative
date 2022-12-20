import React, { FC, useCallback, useEffect } from 'react'
import {
  SafeAreaView,
  SectionList,
  SectionListRenderItemInfo,
} from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import FeatureItem from '../../../../Components/FeatureItem'
import Separator from '../../../../Components/Separator'
import SectionHeader from '../../../../Components/SectionHeader'
import SectionFooter from '../../../../Components/SectionFooter'
import {
  alert,
  dispatch,
  onError,
  regeneratePaymentReferenceIfNeeded,
  transformToListOfResultItems,
} from '../../../../Functions'
import { useJudoConfiguration } from '../../../../CustomHooks/useJudoConfiguration'
import { JudoResponse } from 'judokit-react-native'
import {
  DemoFeature,
  RootStackParamList,
  Screen,
} from '../../../../Data/TypeDefinitions'
import { FEATURES } from '../../../../Data/Constants'
import { StackScreenProps } from '@react-navigation/stack'

const HomeScreen: FC<
  StackScreenProps<RootStackParamList, Screen.HOME>,
> = () => {
  const { navigate } = useNavigation()
  const {
    colors: { background: backgroundColor },
  } = useTheme()
  const { configuration, isSandboxed, authorization } = useJudoConfiguration()

  const onSuccess = (response: JudoResponse) =>
    navigate(Screen.RESULT, { items: transformToListOfResultItems(response) })

  const onNavigate = (screen: Screen, props?: Record<string, any>) =>
    navigate(screen, props)

  const onFeatureItemPress = useCallback(
    (item: DemoFeature) =>
      dispatch({
        featureType: item.type,
        configuration: regeneratePaymentReferenceIfNeeded(configuration),
        isSandboxed,
        authorization,
        onSuccess,
        onError,
        onNavigate,
      }),
    [configuration, isSandboxed, authorization],
  )

  const renderItem = (
    renderItemInfo: SectionListRenderItemInfo<DemoFeature>,
  ): React.ReactElement => {
    const { item } = renderItemInfo
    const { title, details } = item

    return (
      <FeatureItem
        title={title}
        details={details}
        onPress={() => onFeatureItemPress(item)}
      />
    )
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor,
      }}
    >
      <SectionList
        keyExtractor={(item) => item.type.toString()}
        renderSectionHeader={({ section: { header } }) => (
          <SectionHeader text={header} key="header-key" />
        )}
        renderSectionFooter={({ section: { footer } }) => (
          <SectionFooter text={footer} key="footer-key" />
        )}
        ItemSeparatorComponent={() => (
          <Separator inset={20} key="separator-with-inset-key" />
        )}
        SectionSeparatorComponent={() => <Separator key="separator-key" />}
        renderItem={renderItem}
        sections={FEATURES}
      />
    </SafeAreaView>
  )
}

export default HomeScreen
