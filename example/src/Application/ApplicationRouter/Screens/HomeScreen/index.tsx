import React, { FC, useEffect, useState } from 'react';
import {
  SectionList,
  SectionListRenderItemInfo,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import FeatureItem from '../../../../Components/FeatureItem';
import Separator from '../../../../Components/Separator';
import SectionHeader from '../../../../Components/SectionHeader';
import SectionFooter from '../../../../Components/SectionFooter';
import SettingsButton from '../../../../Components/SettingsButton';
import ImportSettingsModal from '../../../../Components/ImportSettingsModal';
import { HStack } from '../../../../Components/HStack';
import {
  dispatch,
  onError,
  regeneratePaymentReferenceIfNeeded,
  transformToListOfResultItems,
} from '../../../../Functions';
import { JudoResponse } from 'judokit-react-native';
import {
  DemoFeature,
  RootStackParamList,
  Screen,
} from '../../../../Data/TypeDefinitions';
import { API_CONFIGURATION_KEYS, FEATURES } from '../../../../Data/Constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  getBoolOrFalse,
  judoAuthorizationFromSettingsData,
  judoConfigurationFromSettingsData,
} from '../../../../Data/Mapping';

const ItemSeparatorComponent = () => (
  <Separator inset={20} key="separator-with-inset-key" />
);
const SectionSeparatorComponent = () => <Separator key="separator-key" />;

const HomeHeaderRight: FC<{
  primary: string;
  onImportPress: () => void;
}> = ({ primary, onImportPress }) => (
  <HStack spacing={8} style={{ justifyContent: 'space-between' }}>
    <TouchableOpacity
      style={{
        width: 48,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      testID="import-settings-button"
      accessibilityLabel="Import settings button"
      onPress={onImportPress}
    >
      <Ionicons name="download-outline" size={28} color={primary} />
    </TouchableOpacity>
    <SettingsButton />
  </HStack>
);

const HomeScreen: FC<
  NativeStackScreenProps<RootStackParamList, Screen.HOME>
> = ({ navigation }) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    colors: { background: backgroundColor, primary },
  } = useTheme();
  const [importVisible, setImportVisible] = useState(false);

  const headerRight = () => (
    <HomeHeaderRight
      primary={primary}
      onImportPress={() => setImportVisible(true)}
    />
  );

  useEffect(() => {
    navigation.setOptions({ headerRight });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, primary]);

  const onSuccess = (response: JudoResponse) =>
    navigate(Screen.RESULT, { items: transformToListOfResultItems(response) });

  const onNavigate = (screen: Screen, props?: Record<string, any>) =>
    // @ts-ignore
    navigate(screen, props);

  const onFeatureItemPress = (item: DemoFeature) => {
    const isSandboxed = getBoolOrFalse(API_CONFIGURATION_KEYS.IS_SANDBOXED);

    dispatch({
      featureType: item.type,
      configuration: regeneratePaymentReferenceIfNeeded(
        judoConfigurationFromSettingsData()
      ),
      isSandboxed,
      authorization: judoAuthorizationFromSettingsData(),
      onSuccess,
      onError,
      onNavigate,
    });
  };

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
      edges={['bottom', 'left', 'right']}
      style={{
        flex: 1,
        backgroundColor,
      }}
    >
      <SectionList
        testID="home-screen-section-list"
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
      <ImportSettingsModal
        visible={importVisible}
        onClose={() => setImportVisible(false)}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
