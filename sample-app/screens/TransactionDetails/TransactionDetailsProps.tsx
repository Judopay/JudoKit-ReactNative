import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../App'

type TransactionDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TransactionDetails'
>

type TransactionDetailsRouteProp = RouteProp<
  RootStackParamList,
  'TransactionDetails'
>

export default interface TransactionDetailsProps {
  navigation: TransactionDetailsNavigationProp
  route: TransactionDetailsRouteProp
}
