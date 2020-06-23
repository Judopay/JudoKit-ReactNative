export enum HomeListType {
  Payment,
  PreAuth,
  RegisterCard,
  CheckCard,
  SaveCard,
  ApplePay,
  ApplePreAuth,
  GooglePay,
  GooglePreAuth,
  PayByBankApp,
  PaymentMethods,
  PreAuthMethods,
  ServerToServer,
}

export type HomeListItem = {
  title: string,
  subtitle: string,
  type: HomeListType,
}
