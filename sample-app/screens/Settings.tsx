import React, { Component } from 'react';
import {
  View,
  SectionList,
  Text,
  Switch,
  TouchableHighlight,
  StyleSheet,
  processColor,
} from 'react-native'
import Dialog from "react-native-dialog"
import {
  JudoConfig,
  JudoApplePayConfig,
  JudoGooglePayConfig,
  JudoPaymentSummaryItemType,
  JudoPaymentShippingType,
  JudoTransactionType
} from 'judo-react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { SettingsData, SettingsPickType } from './SettingsData'

export const judoOptions: JudoConfig = {
  token: '<TOKEN>',
  secret: '<SECRET>',
  judoId: '<JUDO_ID>',
  siteId: '<SITE_ID>',
  isSandbox: true,
  amount: '1.00',
  currency: 'EUR',
  consumerReference: 'myConsumerReference',
  paymentReference: 'myPaymentReference',
  metaData: {
    metadatakey: 'metadataValue',
    metadatakey2: 'metadataValue2',
  },
  theme: {
    // iOS only. On Android theming works by overriding style definitions
    tintColor: processColor('#ff0000'),
    avsEnabled: true,
    showSecurityMessage: true,
    paymentButtonTitle: 'Pay now',
    backButtonTitle: 'Cancel',
    paymentTitle: 'Pay £1.50',
    loadingIndicatorProcessingTitle: 'Taking your money...',
    inputFieldHeight: 65.5,
    securityMessageString:
      "This is the most secure way of paying you've ever experienced!",
    securityMessageTextSize: 16,
    textColor: processColor('#ac8805'),
    navigationBarTitleColor: processColor('#ac0005'),
    inputFieldTextColor: processColor('#66f'),
    contentViewBackgroundColor: processColor('#ccc'),
    buttonColor: processColor('#dd0'),
    buttonTitleColor: processColor('#d00'),
    loadingBackgroundColor: processColor('#33ffff33'),
    errorColor: processColor('#600'),
    loadingBlockViewColor: processColor('#3ff'),
    inputFieldBackgroundColor: processColor('#dedede'),
    buttonCornerRadius: 16,
    buttonHeight: 80,
    buttonSpacing: 64,
  },
}

export const applePayOptions: JudoApplePayConfig = {
  merchantId: '<MERCHANT_ID>',
  countryCode: 'GB',
  transactionType: JudoTransactionType.preAuth,
  shippingType: JudoPaymentShippingType.shipping,
  shippingMethods: [
    {
      identifier: 'identifier for shiping method',
      detail: 'shipping method description',
      label: 'shipping method label',
      amount: '10.0',
      paymentSummaryItemType: JudoPaymentSummaryItemType.final,
    },
  ],
  requireBillingDetails: true,
  requireShippingDetails: false,
  summaryItems: [{ label: 'Purchased item name', amount: '1.50' }],
}

export const googlePayOptions: JudoGooglePayConfig = {
  googlePayTestEnvironment: true,
  transactionType: JudoTransactionType.preAuth,
  requireBillingDetails: true,
  requireContactDetails: false,
  requireShippingDetails: false,
}

export default class Settings extends Component {
  state = {
    SettingsData,
    dialogVisible: false,
    dialogTitle: "",
    dialogSubtitle: "",
    dialogItemSelected: null
  }

  showTextInputDialog(item: any) {
    this.setState({
      dialogVisible: true,
      dialogTitle: item.title,
      dialogSubtitle: item.subtitle,
      dialogItemSelected: item
    });
  };

  handleDialogTextInputChange(text: string) {
    var item: any = this.state.dialogItemSelected
    item.value = text
    this.setState({item})
  }

  handleCancel() {
    this.setState({ dialogVisible: false });
  };

  getListItem(item: any, index: number) {
    return (
      <TouchableHighlight
        underlayColor='gray'
        onPress={() => {this.itemPressed(item)}}
      >
        <View style={styles.item}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}> {item.value ? item.value : item.subtitle}</Text>
          </View>
          {item.type == SettingsPickType.switch
            ? <Switch onValueChange = {() => {this.itemPressed(item)}} value = {item.state} />
            : <View />}

        </View>
      </TouchableHighlight>
    );
  }

  itemPressed(item: any) {
    switch(item.type) {
      case SettingsPickType.switch: {
        item.state = !item.state
        this.setState({item})
        break;
      }
      case SettingsPickType.textPicker: {
        console.log('Cancel Pressed')
        this.showTextInputDialog(item)
      }
      case SettingsPickType.singlePicker: {
        //
        break;
      }
      case SettingsPickType.multiPicker: {
        //
        break;
      }
      default: {
        break;
      }
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
       <SectionList
         sections={this.state.SettingsData.list}
         keyExtractor={(item, index) => item.title + index}
         renderItem={({ item, index }) => this.getListItem(item, index)}
         renderSectionHeader={({ section: { title } }) => (
           <View>
            <View style={styles.separator}></View>
            <Text style={styles.header}>{title}</Text>
           </View>
         )}
       />
       <View>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>{this.state.dialogTitle}</Dialog.Title>
          <Dialog.Input wrapperStyle={styles.inputDialog} onChangeText={(text: string) => {this.handleDialogInputChange(text)}} />
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Ok" onPress={this.handleCancel} />
        </Dialog.Container>
      </View>
     </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    height: 2,
    backgroundColor: '#e9e9e9'
  },
  container: {
    flex: 1,
  },
  item: {
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
