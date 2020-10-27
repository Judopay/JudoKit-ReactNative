import React, {Component} from 'react'
import JudoPay from 'judo-react-native'
import TransactionDetailsProps from "./TransactionDetailsProps";
import {SafeAreaView, StatusBar, StyleSheet, View} from "react-native";
import {isIos} from "../../helpers/utils";

export default class TransactionDetails extends Component<TransactionDetailsProps> {

    constructor(props: TransactionDetailsProps) {
        super(props)
    }

    render() {
        return (
            <SafeAreaView style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#3216ac" />
                <Text></Text>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    pbbaButton: {
        height: 50,
        width: isIos ? 310 : 200,
    },
})