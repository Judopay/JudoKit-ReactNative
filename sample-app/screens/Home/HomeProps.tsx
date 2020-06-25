export enum HomeListType {
  Payment,
  PreAuth,
  RegisterCard,
  CheckCard,
  SaveCard,
  TokenPayments,
  ApplePay,
  ApplePreAuth,
  GooglePay,
  GooglePreAuth,
  PaymentMethods,
  PreAuthMethods,
  ServerToServer,
}

export type HomeListItem = {
  title: string,
  subtitle: string,
  type: HomeListType,
}
