import React, {FC} from "react";
import {useTheme} from "@react-navigation/native";
import {Text, TouchableHighlight, View} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'

export interface ChildPaneSettingsItemProps {
    title: string
    onPress: () => void
}

const ChildPaneSettingsItem: FC<ChildPaneSettingsItemProps> = ({title, onPress}) => {
    const {colors: { card, text, border }} = useTheme()

    return (
        <TouchableHighlight onPress={onPress}>
            <View style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 12,
                paddingBottom: 12,
                backgroundColor: card,
            }}>
                <Text style={{
                    flex: 1,
                    fontSize: 16,
                    fontWeight: 'normal',
                    color: text,
                }}>{title}</Text>
                <Icon name="ios-chevron-forward" size={20} color={border} />
            </View>
        </TouchableHighlight>
    );
};

export default ChildPaneSettingsItem
