export interface JudoBasicAuthorization {
    kind?: 'basic'
    token: string
    secret: string
}

export interface JudoSessionAuthorization {
    kind?: 'session'
    token: string
    paymentSession: string
}

export type JudoAuthorization =
    | JudoBasicAuthorization
    | JudoSessionAuthorization
