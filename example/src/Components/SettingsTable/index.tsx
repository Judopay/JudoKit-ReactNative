import React, { FC } from 'react';
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
  SettingsItem,
  SettingsItemDataType,
} from '../../Data/TypeDefinitions';
import { IS_IOS } from '../../Data/Constants';
import { useSettingsTableState } from '../../CustomHooks';

export interface SettingsTableProps {
  transformationFunction: () => ReadonlyArray<SectionListData<SettingsItem>>;
}

const SectionSeparatorComponent = () => <Separator key="separator-key" />;
const ItemSeparatorComponent = () => (
  <Separator inset={20} key="separator-with-inset-key" />
);

const SettingsTable: FC<SettingsTableProps> = ({ transformationFunction }) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  // Use the custom hook to manage all settings table state
  const { settingsSections } = useSettingsTableState(transformationFunction);

  const renderItem = (
    renderItemInfo: SectionListRenderItemInfo<SettingsItem>
  ): React.ReactElement | null => {
    const { item } = renderItemInfo;
    const { dataType, title, path, value, testID, options = [] } = item;

    switch (dataType) {
      case SettingsItemDataType.BOOLEAN:
        return (
          <BooleanSettingsItem
            storageKey={path}
            title={title}
            key={path}
            testID={testID}
          />
        );

      case SettingsItemDataType.TEXT:
        return (
          <TextSettingsItem
            key={path}
            title={title}
            storageKey={path}
            testID={testID}
          />
        );

      case SettingsItemDataType.CHILD_PANE:
        return (
          <ChildPaneSettingsItem
            key={path}
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
            storageKey={path}
            defaultValue={`${value || ''}`}
            selectionTableParams={{
              path,
              name: title,
              sectionListData: [
                {
                  data: options,
                },
              ],
              selectedItemId: `${value || ''}`,
            }}
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
