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
import { useMMKVStorage } from 'react-native-mmkv-storage';
import {
  DEFAULT_SETTINGS_DATA,
  IS_IOS,
  STORAGE_SETTINGS_KEY,
} from '../../Data/Constants';
import { appStorage } from '../../Application';

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

  const [settings, setSettings] = useMMKVStorage(
    STORAGE_SETTINGS_KEY,
    appStorage,
    DEFAULT_SETTINGS_DATA
  );

  const [settingsSections, setSettingsSections] = useState(
    transformationFunction(settings)
  );

  const handleSettingsChange = (path: string, value: boolean | string) => {
    let valueToUpdate = { ...settings };

    updateValue(valueToUpdate, path, value);

    if (path === 'authorization.isUsingPaymentSession' && value) {
      updateValue(valueToUpdate, 'authorization.isUsingTokenAndSecret', false);
    }

    if (path === 'authorization.isUsingTokenAndSecret' && value) {
      updateValue(valueToUpdate, 'authorization.isUsingPaymentSession', false);
    }

    setSettings(valueToUpdate);
  };

  const updateValue = (
    valueToUpdate: Record<string, any>,
    path: string,
    value: boolean | string
  ) => {
    const pathParts = path.split('.');

    let current = valueToUpdate;

    for (let i = 0; i < pathParts.length - 1; i++) {
      const key = pathParts[i];

      if (key && current[key] === undefined) {
        current[key] = {};
      }

      if (key) {
        current = current[key] = { ...current[key] };
      }
    }

    const finalKey = pathParts[pathParts.length - 1];
    if (finalKey) {
      current[finalKey] = value;
    }
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
