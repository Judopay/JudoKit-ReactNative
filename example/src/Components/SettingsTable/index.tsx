import React, { FC, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
} from 'react-native';
import SectionHeader from '../SectionHeader';
import SectionFooter from '../SectionFooter';
import Separator from '../Separator';
import TextSettingsItem from '../TextSettingsItem';
import BooleanSettingsItem from '../BooleanSettingsItem';
import ChildPaneSettingsItem from '../ChildPaneSettingsItem';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import SingleSelectionSettingsItem from '../SingleSelectionSettingsItem';
import {
  RootStackParamList,
  Screen,
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
  SingleSelectionTableParams,
} from '../../Data/TypeDefinitions';
import { useSingleSelectionTableListener } from '../../Application/ApplicationRouter/Screens/SettingsSingleSelectionScreen';
import {
  DEFAULT_SETTINGS_DATA,
  IS_IOS,
  STORAGE_SETTINGS_KEY,
} from '../../Data/Constants';
import _ from 'lodash';
import { appStorage } from '../../Application';
import { useMMKVState } from '../../Functions';

export interface SettingsTableProps {
  transformationFunction: (
    data: SettingsData
  ) => ReadonlyArray<SectionListData<SettingsItem>>;
}

const SectionSeparatorComponent = () => <Separator key="separator-key" />;
const ItemSeparatorComponent = () => (
  <Separator inset={20} key="separator-with-inset-key" />
);

const SettingsTable: FC<SettingsTableProps> = ({ transformationFunction }) => {
  const { navigate, goBack, canGoBack } =
    useNavigation<NavigationProp<RootStackParamList>>();

  const [settings, setSettings] = useMMKVState(
    STORAGE_SETTINGS_KEY,
    appStorage,
    DEFAULT_SETTINGS_DATA
  );

  const [settingsSections, setSettingsSections] = useState(
    transformationFunction(settings)
  );

  const handleSettingsChange = (path: string, value: boolean | string) => {
    let updatedValue = { ..._.set(settings, path, value) };

    if (path === 'authorization.isUsingPaymentSession' && value) {
      updatedValue = {
        ..._.set(updatedValue, 'authorization.isUsingTokenAndSecret', false),
      };
    }

    if (path === 'authorization.isUsingTokenAndSecret' && value) {
      updatedValue = {
        ..._.set(updatedValue, 'authorization.isUsingPaymentSession', false),
      };
    }

    setSettings(updatedValue);
  };

  useEffect(() => {
    setSettingsSections(transformationFunction(settings));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  useSingleSelectionTableListener(({ item, path }) => {
    handleSettingsChange(path, item.id);

    if (canGoBack()) {
      goBack();
    }
  }, []);

  const onSingleSelectionSettingsItemPress = (item: SettingsItem) => {
    const { options = [], value, title, path } = item;

    const props: SingleSelectionTableParams = {
      path,
      name: title,
      sectionListData: [
        {
          data: options,
        },
      ],
      selectedItemId: `${value || ''}`,
    };

    navigate(Screen.SINGLE_SELECTION, props);
  };

  const renderItem = (
    renderItemInfo: SectionListRenderItemInfo<SettingsItem>
  ): React.ReactElement | null => {
    const { item } = renderItemInfo;
    const { dataType, title, path, value, testID } = item;

    switch (dataType) {
      case SettingsItemDataType.BOOLEAN:
        return (
          <BooleanSettingsItem
            title={title}
            key={path}
            value={Boolean(value)}
            onValueChange={(boolValue) => handleSettingsChange(path, boolValue)}
            testID={testID}
          />
        );

      case SettingsItemDataType.TEXT:
        return (
          <TextSettingsItem
            value={`${value || ''}`}
            title={title}
            onChange={(text) => handleSettingsChange(path, text)}
            testID={testID}
          />
        );

      case SettingsItemDataType.CHILD_PANE:
        return (
          <ChildPaneSettingsItem
            title={title}
            // @ts-ignore
            onPress={() => navigate(`${value}`)}
          />
        );

      case SettingsItemDataType.SINGLE_SELECTION:
        return (
          <SingleSelectionSettingsItem
            key={path}
            title={title}
            value={`${value || ''}`}
            onPress={() => onSingleSelectionSettingsItemPress(item)}
          />
        );

      case SettingsItemDataType.SECTION_SEPARATOR:
        return <SectionHeader text={title} key={path} />;

      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={IS_IOS ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SectionList
        testID="settings-list"
        keyExtractor={(item) => item.path}
        ItemSeparatorComponent={ItemSeparatorComponent}
        SectionSeparatorComponent={SectionSeparatorComponent}
        sections={settingsSections}
        renderItem={renderItem}
        renderSectionHeader={({ section: { header } }) => (
          <SectionHeader text={header} key="header-key" />
        )}
        renderSectionFooter={({ section: { footer } }) => (
          <SectionFooter text={footer} key="footer-key" />
        )}
      />
    </KeyboardAvoidingView>
  );
};

export default SettingsTable;
