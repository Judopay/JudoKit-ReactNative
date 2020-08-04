import { JudoConfiguration, JudoAuthorization } from "judo-react-native"

export default interface TokenPaymentProps {
    authorization: JudoAuthorization
    configuration: JudoConfiguration
}