import React, { FC } from 'react'
import {
  SafeAreaView,
  SectionList,
  SectionListRenderItemInfo,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList, Screen } from '../../../../Data/TypeDefinitions'
import { StackActions, useNavigation, useTheme } from '@react-navigation/native'
import Separator from '../../../../Components/Separator'
import Icon from 'react-native-vector-icons/Ionicons'
import Clipboard from '@react-native-community/clipboard'
import Snackbar from 'react-native-snackbar'

export interface ResultItem {
  title: string
  value?: string
  subItems?: Array<ResultItem>
}

const ResultScreen: FC<StackScreenProps<RootStackParamList, Screen.RESULT>> = ({
  route: {
    params: { items = [] },
  },
}) => {
  const {
    colors: { background: backgroundColor, card, text, primary },
  } = useTheme()
  const { dispatch } = useNavigation()

  const onItemPress = (item: ResultItem) => {
    const { subItems } = item
    if (subItems) {
      dispatch(StackActions.push(Screen.RESULT, { items: subItems }))
    }
  }

  const onLongPress = (item: ResultItem) => {
    const { value = null } = item

    if (value) {
      Clipboard.setString(value)
      Snackbar.show({
        text: `'${value}' copied to clipboard.`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#6a4fe1',
      })
    }
  }

  const renderItem = (
    renderItemInfo: SectionListRenderItemInfo<ResultItem>,
  ): React.ReactElement => {
    const { item } = renderItemInfo
    const { title, value, subItems } = item

    return (
      <TouchableHighlight
        onPress={() => onItemPress(item)}
        onLongPress={event => onLongPress(item)}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 16,
            paddingBottom: 16,
            backgroundColor: card,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: text,
              }}
            >
              {title}
            </Text>
            {value ? (
              <Text
                style={{
                  fontSize: 12,
                  color: '#6e6e6e',
                  marginTop: 2,
                }}
              >
                {value}
              </Text>
            ) : null}
          </View>
          {subItems ? (
            <Icon name="ios-chevron-forward" size={20} color={primary} />
          ) : null}
        </View>
      </TouchableHighlight>
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
        style={{ flex: 1 }}
        keyExtractor={(item, index) => item.title ?? index}
        ItemSeparatorComponent={() => (
          <Separator inset={20} key="separator-with-inset-key" />
        )}
        SectionSeparatorComponent={() => <Separator key="separator-key" />}
        renderItem={renderItem}
        sections={[
          {
            data: items,
          },
        ]}
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
  )
}

export default ResultScreen
