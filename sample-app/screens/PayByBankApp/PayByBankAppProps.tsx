import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from "../../App";

type PayByBankAppNavigationProp = StackNavigationProp<
    RootStackParamList,
    'PayByBankApp'
    >;

type PayByBankAppRouteProp = RouteProp<RootStackParamList, 'PayByBankApp'>;

export default interface PayByBankAppProps {
    navigation: PayByBankAppNavigationProp,
    route: PayByBankAppRouteProp
}