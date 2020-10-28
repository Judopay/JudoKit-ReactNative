import React, {Component} from 'react'
import TransactionDetailsProps from "./TransactionDetailsProps";
import {SafeAreaView, StatusBar, StyleSheet, Text} from "react-native";

export default class TransactionDetails extends Component<TransactionDetailsProps> {

    constructor(props: TransactionDetailsProps) {
        super(props)
    }

    render() {
        return (
            <SafeAreaView style={[styles.container]}>
                <StatusBar barStyle="light-content" backgroundColor="#3216ac" />
                <Text>Hello</Text>
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
})