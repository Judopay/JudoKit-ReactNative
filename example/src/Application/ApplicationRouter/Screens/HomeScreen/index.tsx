import React, { FC, useCallback } from 'react';
import {
  SafeAreaView,
  SectionList,
  SectionListRenderItemInfo,
} from 'react-native';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import FeatureItem from '../../../../Components/FeatureItem';
import Separator from '../../../../Components/Separator';
import SectionHeader from '../../../../Components/SectionHeader';
import SectionFooter from '../../../../Components/SectionFooter';
import {
  dispatch,
  onError,
  regeneratePaymentReferenceIfNeeded,
  transformToListOfResultItems,
} from '../../../../Functions';
import { useJudoConfiguration } from '../../../../CustomHooks/useJudoConfiguration';
import { JudoResponse } from 'judokit-react-native';
import {
  DemoFeature,
  RootStackParamList,
  Screen,
} from '../../../../Data/TypeDefinitions';
import { FEATURES } from '../../../../Data/Constants';
import { StackScreenProps } from '@react-navigation/stack';

const ItemSeparatorComponent = () => (
  <Separator inset={20} key="separator-with-inset-key" />
);
const SectionSeparatorComponent = () => <Separator key="separator-key" />;

const HomeScreen: FC<
  StackScreenProps<RootStackParamList, Screen.HOME>
> = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    colors: { background: backgroundColor },
  } = useTheme();
  const { configuration, isSandboxed, authorization } = useJudoConfiguration();

  const onSuccess = (response: JudoResponse) =>
    navigate(Screen.RESULT, { items: transformToListOfResultItems(response) });

  const onNavigate = (screen: Screen, props?: Record<string, any>) =>
    // @ts-ignore
    navigate(screen, props);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [configuration, isSandboxed, authorization]
  );

  const renderItem = (
    renderItemInfo: SectionListRenderItemInfo<DemoFeature>
  ): React.ReactElement => {
    const { item } = renderItemInfo;
    const { title, details } = item;

    return (
      <FeatureItem
        title={title}
        details={details}
        onPress={() => onFeatureItemPress(item)}
      />
    );
  };

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
        ItemSeparatorComponent={ItemSeparatorComponent}
        SectionSeparatorComponent={SectionSeparatorComponent}
        renderItem={renderItem}
        sections={FEATURES}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
