
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
import ReceiptProps, { ReceiptListItem } from './ReceiptProps'

export default class Receipt extends Component<ReceiptProps> {

  handleListItemPressed(item: ReceiptListItem) {
    this.props.navigation.push('Receipt', { receipt: item.value })
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
            <Text style={styles.subtitle}>{item.value.toString()}</Text>
            <View style={styles.separator} />
          </View>
      }
      </TouchableHighlight>
    )
  }

  getReceiptList(hash: Record<string, any>) {
    const items: Array<ReceiptListItem> = []
    for (const [key, value] of Object.entries(hash)) {
      items.push({
        title: key,
        value: value || '',
        expandable: value instanceof Object
      } as ReceiptListItem)
    }
    return [{ data: items }]
  }

  render() {
    return (
      <SafeAreaView style={[styles.container]}>
        <StatusBar barStyle="light-content" backgroundColor="#3216ac" />
        <View style={styles.container}>
          <SectionList
            sections={this.getReceiptList(this.props.route.params.receipt)}
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
