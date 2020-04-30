
import React, { Component } from 'react'
import {
  TouchableHighlight,
  StatusBar,
  StyleSheet,
  SectionList,
  Text,
  View,
  SafeAreaView,
  Image
} from 'react-native'
// import { ReceiptScreenData } from './ReceiptData'
import { ReceiptListItem } from './ReceiptProps'

export default class Receipt extends Component {

  handleListItemPressed(item: ReceiptListItem) {
    this.props.navigation.push('Receipt', { receipt: item.object })
  }

  getListItem(item: ReceiptListItem) {
    return (
      <TouchableHighlight
        underlayColor='gray'
        onPress={() => { this.handleListItemPressed(item) }}
      >
      {
        item.expandable ?
          <View>
            <Text style={{...styles.title, marginTop: 20}}>{item.title}</Text>
            <Image
              style={styles.chevron}
              source={require('../../resources/ic_chevron.png')} />
            <View style={{...styles.separator, marginTop: 20}} />
          </View>
        :
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
            <View style={styles.separator} />
          </View>
      }
      </TouchableHighlight>
    );
  }

  getReceiptList(hash: Object) {
    console.log("keys " + JSON.stringify(hash))
    const items: Array<ReceiptListItem> = []
    for (let [key, value] of Object.entries(hash)) {
      var expandable = true
      var subtitile = ""
      var object = value
      if (!(value instanceof Object)) {
        expandable = false
        subtitile = value.toString()
      }
      let item: ReceiptListItem = {
        title: key,
        subtitle: subtitile,
        expandable: expandable,
        object: object
      }
      items.push(item)
    }
    return [{
      data: items
    }]
  }

  render() {
    const params = this.props.route.params
    const receipt = params.receipt

    return (
      <SafeAreaView style={[styles.container]}>
        <StatusBar barStyle="light-content" backgroundColor="#3216ac" />
        <View style={styles.container}>
          <SectionList
            sections={this.getReceiptList(receipt)}
            keyExtractor={(item, index) => item.title + index}
            renderItem={({ item }) => this.getListItem(item)}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#e9e9e9',
    marginTop: 10
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#000',
    width: 250,
    marginStart: 10,
    marginEnd: 10,
    marginTop: 10
  },
  chevron: {
    width: 10,
    height: 16,
    marginTop: 22,
    marginRight: 10,
    position:'absolute',
    right: 0
  },
  subtitle: {
    fontSize: 14,
    width: 300,
    marginStart: 10,
    marginEnd: 10,
    marginTop: 5
  }
})
