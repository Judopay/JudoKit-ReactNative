import React, { FC, useState } from 'react';
import {
  SafeAreaView,
  SectionList,
  SectionListRenderItemInfo,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Separator from '../../../../Components/Separator';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { makeEventNotifier } from '../../../../CustomHooks/useEventListener';
import {
  RootStackParamList,
  Screen,
  SingleSelectionTableItem,
} from '../../../../Data/TypeDefinitions';

const notifier = makeEventNotifier<{
  item: SingleSelectionTableItem;
  path: string;
}>('OnSingleSelectionTableItemSelected');

export function useSingleSelectionTableListener(
  listener: typeof notifier.notify,
  deps: ReadonlyArray<any>
) {
  notifier.useEventListener(listener, deps);
}

const SectionSeparatorComponent = () => <Separator key="separator-key" />;
const ItemSeparatorComponent = () => (
  <Separator inset={20} key="separator-with-inset-key" />
);

const SettingsSingleSelectionScreen: FC<
  NativeStackScreenProps<RootStackParamList, Screen.SINGLE_SELECTION>
> = ({ route: { params } }) => {
  const { sectionListData, selectedItemId, path } = params;
  const {
    colors: { background: backgroundColor, primary, text, card },
  } = useTheme();
  const [itemId, setItemId] = useState(selectedItemId);

  const onPress = (item: SingleSelectionTableItem) => {
    setItemId(item.id);
    notifier.notify({ item, path });
  };

  const renderItem = (
    renderItemInfo: SectionListRenderItemInfo<SingleSelectionTableItem>
  ): React.ReactElement => {
    const { item } = renderItemInfo;
    const { title, id } = item;

    return (
      <TouchableHighlight key={id} onPress={() => onPress(item)}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 12,
            paddingBottom: 12,
            backgroundColor: card,
            height: 46,
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              fontWeight: 'normal',
              color: text,
            }}
          >
            {title}
          </Text>
          {id === itemId ? (
            <Ionicons name="checkmark-sharp" size={20} color={primary} />
          ) : null}
        </View>
      </TouchableHighlight>
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
        style={{ flex: 1 }}
        keyExtractor={(item, index) => item.id ?? index}
        ItemSeparatorComponent={ItemSeparatorComponent}
        SectionSeparatorComponent={SectionSeparatorComponent}
        renderItem={renderItem}
        sections={sectionListData}
        renderSectionFooter={() => (
          <View
            key="footer-key"
            style={{
              height: 48,
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default SettingsSingleSelectionScreen;
