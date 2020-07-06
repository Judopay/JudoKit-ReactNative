import React, { Component } from 'react'
import { storageKey, store } from '../../helpers/AsyncStore'
import Dialog from 'react-native-dialog'
import AsyncStorage from '@react-native-community/async-storage'
import Spinner from 'react-native-loading-spinner-overlay'

import {
  SettingsData,
  Currencies,
  CardNetworks,
  Payments,
  MerchantCapabilities,
  ApplePayContactFields,
  AppleShippingTypes,
  AppleReturnInfoTypes,
  GooglePayEnvironments
} from './SettingsData'

import {
  PickerItem,
  SettingsListItem,
  SettingsPickArray,
  SettingsPickType
} from './SettingsProps'

import {
  View,
  Image,
  SectionList,
  Text,
  Switch,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
} from 'react-native'

export default class Settings extends Component {
  state = {
    settingsData: SettingsData,
    settingSelected: {} as SettingsListItem,
    textPickerVisible: false,
    spinner: false
  }

  /**
  * Lifecycle
  */
  componentDidMount() {
    this.getData()
  }

  componentWillUnmount() {
    store.dispatch({ type: '' })
  }

  async storeData(data: any) {
    this.setState({ spinner: true })
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(data)).then(() => {
        this.setState({ spinner: false })
      })
    } catch (e) {
      console.log("store data error " + e.message)
    }
  }

  async getData() {
    try {
      const value = await AsyncStorage.getItem(storageKey)
      if (value !== null) {
        this.setState({ settingsData: JSON.parse(value) })
      }
    } catch (e) {
      console.log("get data error " + e.message)
    }
  }

  /**
  * Show actions
  */
  showPickerDialog(item: SettingsListItem) {
    this.setState({
      textPickerVisible: true,
      settingSelected: item
    })
  }

  /**
  * Action handlers
  */
  handleDialogTextInputChange(text: string) {
    const item = this.state.settingSelected;
    item.value = text
    this.setState({ item })
  }

  handleDialogCloseAction() {
    this.setState({ textPickerVisible: false });
    this.storeData(this.state.settingsData)
  }

  handlePickerItemPressed(item: PickerItem, settingsItem: SettingsListItem) {
    let settingItem;
    if (settingsItem.type == SettingsPickType.SinglePicker) {
      settingItem = this.state.settingSelected;
      settingItem.value = item.value
      settingItem.subtitle = item.entry
      this.setState({ settingItem })
      this.handleDialogCloseAction()
    } else {
      settingItem = this.state.settingSelected;
      const index = settingItem.valueArray!.indexOf(item.value, 0);
      if (index > -1) {
        settingItem.valueArray!.splice(index, 1);
      } else {
        settingItem.valueArray!.push(item.value)
      }
      settingItem.subtitle = settingItem.valueArray!.toString()
      this.setState({ settingItem })
    }
  }

  handleSettingsItemPressed(item: SettingsListItem) {
    if (item.type == SettingsPickType.Switch) {
      item.value = !item.value
      this.setState({ item })
      this.storeData(this.state.settingsData)
    } else {
      this.showPickerDialog(item)
    }
  }

  /**
  * Settings list setup
  */
  getSettingsListItem(item: SettingsListItem) {
    return (
      <TouchableHighlight
        underlayColor='gray'
        onPress={() => { this.handleSettingsItemPressed(item) }}
      >
        <View style={styles.listItem}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>
              {item.value
                && item.type == SettingsPickType.TextPicker
                ? item.value
                : item.subtitle}</Text>
          </View>
          {item.type == SettingsPickType.Switch
            ? <Switch onValueChange={() => { this.handleSettingsItemPressed(item) }} value={item.value} />
            : <View />}

        </View>
      </TouchableHighlight>
    );
  }

  /**
  * Pickers setup
  */
  getPickerListItem(item: PickerItem, settingsItem: SettingsListItem) {
    return (
      <TouchableHighlight
        underlayColor='gray'
        onPress={() => { this.handlePickerItemPressed(item, settingsItem) }}
      >
        <View style={[styles.listItem, { paddingLeft: 10 }]}>
          <Text style={[styles.title, { fontSize: 16 }]}>{item.entry}</Text>
          {settingsItem.valueArray!.indexOf(item.value, 0) > -1 || settingsItem.value == item.value
            ? <Image
              style={{ width: 10, height: 10, alignItems: 'center', padding: 10 }}
              source={require('../../resources/ic_check.png')} />
            : <View />}
        </View>
      </TouchableHighlight>
    );
  }

  getPickerDataList(settingItem: SettingsListItem): any {
    switch (settingItem.pickItems) {
      case SettingsPickArray.Currencies: return Currencies.list
      case SettingsPickArray.CardNetworks: return CardNetworks.list
      case SettingsPickArray.Payment: return Payments.list
      case SettingsPickArray.MerchantCapabilities: return MerchantCapabilities.list
      case SettingsPickArray.ApplePayContactFields: return ApplePayContactFields.list
      case SettingsPickArray.AppleShippingTypes: return AppleShippingTypes.list
      case SettingsPickArray.AppleReturnInfoTypes: return AppleReturnInfoTypes.list
      case SettingsPickArray.GooglePayEnvironments: return GooglePayEnvironments.list
    }
  }

  getPickerType(settingsItem: SettingsListItem) {
    if (settingsItem.type == SettingsPickType.TextPicker) {
      return (
        <Dialog.Input
          defaultValue={settingsItem.value}
          style={{ color: 'black' }}
          wrapperStyle={styles.inputDialog}
          onChangeText={(text: string) => { this.handleDialogTextInputChange(text) }} />
      )
    } else {
      return (
        <View style={{ height: 350}}>
          <SectionList
            sections={this.getPickerDataList(settingsItem)}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => this.getPickerListItem(item, settingsItem)}
          />
       </View>
      )
    }
  }

  /**
  * Component lifecycle
  */
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <SectionList
          sections={this.state.settingsData.list}
          keyExtractor={(item, index) => item.title + index}
          renderItem={({ item }) => this.getSettingsListItem(item)}
          renderSectionHeader={({ section: { title } }) => (
            <View>
              <View style={styles.separator}/>
              <Text style={styles.header}>{title}</Text>
            </View>
          )}
        />
        <View>
          <Dialog.Container visible={this.state.textPickerVisible}>
            <Dialog.Title children={`${this.state.settingSelected.title}`}/>
            {this.getPickerType(this.state.settingSelected)}
            <Dialog.Button label="Cancel" onPress={this.handleDialogCloseAction.bind(this)} />
            <Dialog.Button label="Ok" onPress={this.handleDialogCloseAction.bind(this)} />
          </Dialog.Container>
        </View>
      </SafeAreaView>
    );
  }
}

/**
* Styles
*/
const styles = StyleSheet.create({
  separator: {
    height: 2,
    backgroundColor: '#e9e9e9'
  },
  container: {
    flex: 1,
  },
  listItem: {
    paddingLeft: 20,
    marginVertical: 8,
    marginTop: 10,
    paddingRight: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputDialog: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#A9ADAE",
  },
  header: {
    paddingLeft: 20,
    fontSize: 19,
    paddingTop: 10,
    marginBottom: 10,
    fontWeight: 'normal',
    color: '#7dbeb4',
    backgroundColor: '#f2f2f2'
  },
  title: {
    fontSize: 14,
    color: '#000'
  },
  subtitle: {
    fontSize: 12,
    width: 300,
    color: 'gray'
  },
  spinnerTextStyle: {
    color: '#FFF'
  }
});
