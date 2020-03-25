import React, { Component } from 'react';
import {
  View,
  Image,
  SectionList,
  Text,
  Switch,
  TouchableHighlight,
  StyleSheet
} from 'react-native'
import Dialog from "react-native-dialog"
import SafeAreaView from 'react-native-safe-area-view'
import { SettingsData, SettingsPickType, SettingsListItem, Currencies, PickerItem } from './SettingsData'

export default class Settings extends Component {
  state = {
    SettingsData,
    settingSelected: {} as SettingsListItem,
    textPickerVisible: false
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
    var item = this.state.settingSelected
    item.value = text
    this.setState({item})
  }

  handleDialogCloseAction() {
    this.setState({ textPickerVisible: false });
  }

  handlePickerItemPressed(item: PickerItem, settingsItem: SettingsListItem) {
    if (settingsItem.type == SettingsPickType.singlePicker) {
      var settingItem = this.state.settingSelected
      settingItem.value = item.value
      settingItem.subtitle = item.entry
      this.setState({settingItem})
      this.handleDialogCloseAction()
    } else {
      var settingItem = this.state.settingSelected
      const index = settingItem.valueArray!.indexOf(item.value, 0);
      if (index > -1) {
         settingItem.valueArray!.splice(index, 1);
      } else {
        settingItem.valueArray!.push(item.value)
      }
      settingItem.subtitle = settingItem.valueArray!.toString()
      console.log("items " + settingItem)
      this.setState({settingItem})
    }
  }

  handleSettingsItemPressed(item: SettingsListItem) {
    console.log("item " + JSON.stringify(item))
    if (item.type == SettingsPickType.switch) {
      item.value = !item.value
      this.setState({item})
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
        onPress={() => {this.handleSettingsItemPressed(item)}}
      >
        <View style={styles.listItem}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>
            {item.value
              && item.type == SettingsPickType.textPicker
              ? item.value
              : item.subtitle}</Text>
          </View>
          {item.type == SettingsPickType.switch
            ? <Switch onValueChange = {() => {this.handleSettingsItemPressed(item)}} value = {item.value} />
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
        onPress={() => {this.handlePickerItemPressed(item, settingsItem)}}
      >

        <View style={[styles.listItem, { marginLeft: 0, marginRight: 0}]}>
          <Text style={styles.title}>{item.entry}</Text>
          { settingsItem.valueArray!.indexOf(item.value, 0) > -1
            ? <Image style={{ width: 30, height: 30, alignItems: 'center', padding: 10 }} source={require('../resources/ic_check.png')} />
            : <View />}
        </View>
      </TouchableHighlight>
    );
  }

  getPickerDataList(item: SettingsListItem): any {
    return Currencies.list
  }

  getPickerType(settingsItem: SettingsListItem) {
    if (settingsItem.type == SettingsPickType.textPicker) {
      return (
        <Dialog.Input
          wrapperStyle={styles.inputDialog}
          onChangeText={(text: string) => {this.handleDialogTextInputChange(text)}} />
      )
    } else {
      return (
        <SectionList
          sections={this.getPickerDataList(settingsItem)}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => this.getPickerListItem(item, settingsItem)}
        />
      )
    }
  }

  /**
  * Component lifecycle
  */
  render() {
  console.log("settingSelected " + JSON.stringify(this.state.settingSelected))
  console.log("textPickerVisible " + this.state.textPickerVisible)
    return (
      <SafeAreaView style={styles.container}>
      <SectionList
        sections={this.state.SettingsData.list}
        keyExtractor={(item, index) => item.title + index}
        renderItem={({ item }) => this.getSettingsListItem(item)}
        renderSectionHeader={({ section: { title } }) => (
          <View>
            <View style={styles.separator}></View>
            <Text style={styles.header}>{title}</Text>
          </View>
       )}
      />
      <View>
        <Dialog.Container visible={this.state.textPickerVisible}>
          <Dialog.Title>{this.state.settingSelected.title}</Dialog.Title>
          {this.getPickerType(this.state.settingSelected)!}
          <Dialog.Button label="Cancel" onPress={this.handleDialogCloseAction.bind(this)} />
          <Dialog.Button label="Ok" onPress={this.handleDialogCloseAction.bind(this)} />
        </Dialog.Container>
      </View>
      <View >
       </View>
     </SafeAreaView>
    );
  }

  componentWillUnmount() {
    //TODO remove
    console.log("objjj " + JSON.stringify(this.state.SettingsData))
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
    marginLeft: 70,
    marginVertical: 8,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputDialog: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#A9ADAE"
  },
  header: {
    marginLeft: 70,
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'normal',
    color: '#7dbeb4'
  },
  title: {
    fontSize: 18,
    color: '#000',
    width: 250
  },
  subtitle: {
    fontSize: 15,
    width: 250
  }
});
