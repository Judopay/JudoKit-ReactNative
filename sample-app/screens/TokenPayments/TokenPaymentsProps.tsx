import { JudoConfiguration, JudoAuthorization } from "judo-react-native"
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from "../../App";

type TokenPaymentNavigationProp = StackNavigationProp<
    RootStackParamList,
    'TokenPayments'
    >;

type TokenPaymentRouteProp = RouteProp<RootStackParamList, 'TokenPayments'>;

export default interface TokenPaymentProps {
    navigation: TokenPaymentNavigationProp,
    route: TokenPaymentRouteProp
    authorization: JudoAuthorization
    configuration: JudoConfiguration
    isSandboxed: boolean
}