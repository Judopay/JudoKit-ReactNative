import {ChallengeRequestIndicators, ScaExemptions} from "./SettingsData";

export enum SettingsPickType {
  Switch,
  TextPicker,
  SinglePicker,
  MultiPicker,
}

export enum SettingsPickArray {
  Currencies,
  CardNetworks,
  Payment,
  MerchantCapabilities,
  ApplePayContactFields,
  AppleShippingTypes,
  AppleReturnInfoTypes,
  GooglePayEnvironments,
  ScaExemptions,
  ChallengeRequestIndicators
}

export type SettingsListItem = {
  title: string,
  subtitle: string,
  type: SettingsPickType,
  value: any,
  valueArray?: string[],
  pickItems?: SettingsPickArray,
}

export type PickerItem = {
  entry: string,
  value: string,
}
