import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from "../../App";

type ReceiptNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Receipt'
    >;

type ReceiptRouteProp = RouteProp<RootStackParamList, 'Receipt'>;

export default interface ReceiptProps {
  navigation: ReceiptNavigationProp,
  route: ReceiptRouteProp
}

export type ReceiptListItem = {
  title: string,
  value: any,
  expandable: boolean,
}
