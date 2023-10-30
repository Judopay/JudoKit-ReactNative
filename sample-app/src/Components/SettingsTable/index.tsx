import React, { FC, useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
} from 'react-native'
import SectionHeader from '../SectionHeader'
import SectionFooter from '../SectionFooter'
import Separator from '../Separator'
import TextSettingsItem from '../TextSettingsItem'
import BooleanSettingsItem from '../BooleanSettingsItem'
import ChildPaneSettingsItem from '../ChildPaneSettingsItem'
import { useNavigation } from '@react-navigation/native'
import SingleSelectionSettingsItem from '../SingleSelectionSettingsItem'
import {
  Screen,
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
  SingleSelectionTableParams,
} from '../../Data/TypeDefinitions'
import { useSingleSelectionTableListener } from '../../Application/ApplicationRouter/Screens/SettingsSingleSelectionScreen'
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import {
  DEFAULT_SETTINGS_DATA,
  IS_IOS,
  STORAGE_SETTINGS_KEY,
} from '../../Data/Constants'
import * as _ from 'lodash'

export interface SettingsTableProps {
  transformationFunction: (
    data: SettingsData,
  ) => ReadonlyArray<SectionListData<SettingsItem>>
}

const SettingsTable: FC<SettingsTableProps> = ({ transformationFunction }) => {
  const { navigate, goBack, canGoBack } = useNavigation()
  const { setItem, getItem } = useAsyncStorage(STORAGE_SETTINGS_KEY)
  const [settings, setSettings] = useState<SettingsData>()
  const [settingsSections, setSettingsSections] = useState(
    transformationFunction(settings),
  )

  const readSettingsFromStorage = async () => {
    const storedSettings = await getItem()
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings))
    } else {
      setSettings(DEFAULT_SETTINGS_DATA)
    }
  }

  const writeSettingsToStorage = (objectToWrite: SettingsData) => {
    setItem(JSON.stringify(objectToWrite)).catch(console.error)
  }

  const handleSettingsChange = async (path: string, value: boolean | string) => {
    const currentSettings = settings ?? JSON.parse(await getItem());

    let updatedValue = { ..._.set(currentSettings, path, value) }

    if (path === 'authorization.isUsingPaymentSession' && value) {
      updatedValue = {
        ..._.set(updatedValue, 'authorization.isUsingTokenAndSecret', false),
      }
    }

    if (path === 'authorization.isUsingTokenAndSecret' && value) {
      updatedValue = {
        ..._.set(updatedValue, 'authorization.isUsingPaymentSession', false),
      }
    }

    setSettings(updatedValue)
  }

  useEffect(() => {
    readSettingsFromStorage().catch(console.error)
  }, [])

  useEffect(() => {
    if (settings) {
     const sections = transformationFunction(settings)
     setSettingsSections(sections)
     writeSettingsToStorage(settings)
    }
  }, [settings])

  useSingleSelectionTableListener(({ item, path }) => {
    handleSettingsChange(path, item.id)

    if (canGoBack()) {
      goBack()
    }
  }, [])

  const onSingleSelectionSettingsItemPress = (item: SettingsItem) => {
    const { options = [], value, title, path } = item

    const props: SingleSelectionTableParams = {
      path,
      name: title,
      sectionListData: [
        {
          data: options,
        },
      ],
      selectedItemId: `${value || ''}`,
    }

    navigate(Screen.SINGLE_SELECTION, props)
  }

  const renderItem = (
    renderItemInfo: SectionListRenderItemInfo<SettingsItem>,
  ): React.ReactElement | null => {
    const { item } = renderItemInfo
    const { dataType, title, path, value } = item

    switch (dataType) {
      case SettingsItemDataType.BOOLEAN:
        return (
          <BooleanSettingsItem
            title={title}
            key={path}
            value={Boolean(value)}
            onValueChange={value => handleSettingsChange(path, value)}
          />
        )

      case SettingsItemDataType.TEXT:
        return (
          <TextSettingsItem
            value={`${value || ''}`}
            title={title}
            onChange={text => handleSettingsChange(path, text)}
          />
        )

      case SettingsItemDataType.CHILD_PANE:
        return (
          <ChildPaneSettingsItem
            title={title}
            onPress={() => navigate(`${value}`)}
          />
        )

      case SettingsItemDataType.SINGLE_SELECTION:
        return (
          <SingleSelectionSettingsItem
            key={path}
            title={title}
            value={`${value || ''}`}
            onPress={() => onSingleSelectionSettingsItemPress(item)}
          />
        )

      default:
        return null
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={IS_IOS ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SectionList
        keyExtractor={item => item.path}
        ItemSeparatorComponent={() => (
          <Separator inset={20} key="separator-with-inset-key" />
        )}
        SectionSeparatorComponent={() => <Separator key="separator-key" />}
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
  )
}

export default SettingsTable
