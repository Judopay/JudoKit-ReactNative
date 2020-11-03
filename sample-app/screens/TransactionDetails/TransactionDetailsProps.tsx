import { JudoAuthorization } from "judo-react-native"

export default interface TransactionDetailsProps {
    authorization: JudoAuthorization
    isSandboxed: boolean
}