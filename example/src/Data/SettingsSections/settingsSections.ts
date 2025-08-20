import { SettingsItem } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import { IS_ANDROID, IS_IOS } from '../Constants';
import apiConfigurationSection from './apiConfigurationSection';
import authorizationSection from './authorizationSection';
import networkTimeoutsSection from './networkTimeoutsSection';
import amountSection from './amountSection';
import cardAddressSection from './cardAddressSection';
import primaryAccountDetailsSection from './primaryAccountDetailsSection';
import referenceSection from './referenceSection';
import googlePaySection from './googlePaySection';
import supportedCardNetworksSection from './supportedCardNetworksSection';
import paymentMethodsSection from './paymentMethodsSection';
import othersSection from './othersSection';
import threeDSTwoSection from './threeDSTwoSection';
import tokenPaymentsSection from './tokenPaymentsSection';
import recommendationFeatureSection from './recommendationFeatureSection';
import applePayChildPaneSection from './applePayChildPaneSection';

const settingsSections = (): ReadonlyArray<SectionListData<SettingsItem>> => {
  let sections: ReadonlyArray<SectionListData<SettingsItem>> = [
    apiConfigurationSection(),
    authorizationSection(),
    threeDSTwoSection(),
    recommendationFeatureSection(),
    networkTimeoutsSection(),
    referenceSection(),
    amountSection(),
    cardAddressSection(),
    primaryAccountDetailsSection(),
  ];

  if (IS_IOS) {
    sections = [...sections, applePayChildPaneSection()];
  }

  if (IS_ANDROID) {
    sections = [...sections, googlePaySection()];
  }

  return [
    ...sections,
    supportedCardNetworksSection(),
    paymentMethodsSection(),
    othersSection(),
    tokenPaymentsSection(),
  ];
};

export default settingsSections;
