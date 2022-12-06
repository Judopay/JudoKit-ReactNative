import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../App'

type TokenPaymentsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TokenPayments'
>

type TokenPaymentsRouteProp = RouteProp<RootStackParamList, 'TokenPayments'>

export default interface TokenPaymentsProps {
  navigation: TokenPaymentsNavigationProp
  route: TokenPaymentsRouteProp
}
