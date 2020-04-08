export enum HomeListType {
    Payment,
    PreAuth,
    RegisterCard,
    CheckCard,
    SaveCard,
    PaymentMethods,
    PreAuthMethods,
}

export type HomeListItem = {
    title: string,
    subtitle: string,
    type: HomeListType
}