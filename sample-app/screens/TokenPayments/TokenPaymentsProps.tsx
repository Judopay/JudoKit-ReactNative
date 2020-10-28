import { JudoConfiguration, JudoAuthorization } from "judo-react-native"

export default interface TokenPaymentProps {
    navigation: any,
    route: any,
    authorization: JudoAuthorization
    configuration: JudoConfiguration
    isSandboxed: boolean
}