import { SettingsData } from '../TypeDefinitions'
import {
  JudoAddressFormat,
  JudoAuthorization,
  JudoBillingAddressParameters,
  JudoCardNetwork,
  JudoConfiguration,
  JudoContactField,
  JudoGooglePayConfiguration,
  JudoGooglePayEnvironment,
  JudoMerchantCapability,
  JudoPaymentMethod,
  JudoPaymentSummaryItem,
  JudoPaymentSummaryItemType,
  JudoReturnedInfo,
  JudoShippingAddressParameters,
  JudoShippingMethod,
  JudoShippingType,
  ChallengeRequestIndicator,
  JudoThreeDSButtonCustomization,
  JudoThreeDSButtonType,
  JudoThreeDSLabelCustomization,
  JudoThreeDSTextBoxCustomization,
  JudoThreeDSToolbarCustomization,
  JudoThreeDSUIConfiguration,
  ScaExemption,
} from 'judokit-react-native'

export const judoAuthorizationFromSettingsData = ({
  authorization: {
    isUsingPaymentSession,
    isUsingTokenAndSecret,
    secret,
    token,
    paymentSession,
  },
}: SettingsData): JudoAuthorization => {
  if (isUsingTokenAndSecret) {
    return { secret, token }
  }

  if (isUsingPaymentSession) {
    return { paymentSession, token }
  }

  return {} as JudoAuthorization
}

export const judoConfigurationFromSettingsData = ({
  apiConfiguration,
  amount,
  reference,
  cardAddress,
  supportedCardNetworks,
  primaryAccountDetails,
  networkTimeouts,
  paymentMethods,
  others,
  threeDSTwo,
  applePay,
  googlePay,
}: SettingsData): JudoConfiguration => {
  let configuration = {} as JudoConfiguration

  // apiConfiguration
  const { judoId } = apiConfiguration
  configuration = { ...configuration, judoId }

  // amount
  configuration = { ...configuration, amount }

  // reference
  configuration = {
    ...configuration,
    reference,
  }

  // cardAddress
  if (cardAddress.isEnabled) {
    const {
      line1,
      line2,
      line3,
      phoneCountryCode,
      countryCode,
      postCode,
      emailAddress,
      state,
      town,
      mobileNumber,
    } = cardAddress
    configuration = {
      ...configuration,
      phoneCountryCode,
      mobileNumber,
      emailAddress,
      cardAddress: {
        line1,
        line2,
        line3,
        countryCode: Number(countryCode),
        postCode,
        state: state?.length === 0 ? undefined : state,
        town,
      },
    }
  }

  // supportedCardNetworks
  const {
    isVisaOn,
    isMastercardOn,
    isAmexOn,
    isMaestroOn,
    isChinaUnionPayOn,
    isJCBOn,
    isDinersClubOn,
    isDiscoverOn,
  } = supportedCardNetworks

  let cardNetworks: JudoCardNetwork = 0

  if (isVisaOn) {
    cardNetworks |= JudoCardNetwork.Visa
  }

  if (isMastercardOn) {
    cardNetworks |= JudoCardNetwork.Mastercard
  }

  if (isAmexOn) {
    cardNetworks |= JudoCardNetwork.Amex
  }

  if (isMaestroOn) {
    cardNetworks |= JudoCardNetwork.Maestro
  }

  if (isDiscoverOn) {
    cardNetworks |= JudoCardNetwork.Discover
  }

  if (isDinersClubOn) {
    cardNetworks |= JudoCardNetwork.DinersClub
  }

  if (isChinaUnionPayOn) {
    cardNetworks |= JudoCardNetwork.ChinaUnionPay
  }

  if (isJCBOn) {
    cardNetworks |= JudoCardNetwork.JCB
  }

  configuration = {
    ...configuration,
    supportedCardNetworks: cardNetworks,
  }

  // primaryAccountDetails
  if (primaryAccountDetails.isEnabled) {
    const { name, postCode, dateOfBirth, accountNumber } = primaryAccountDetails
    configuration = {
      ...configuration,
      primaryAccountDetails: {
        name,
        postCode,
        dateOfBirth,
        accountNumber,
      },
    }
  }

  // networkTimeouts
  const { connectTimeout, writeTimeout, readTimeout } = networkTimeouts
  if (
    connectTimeout?.length > 0 &&
    writeTimeout?.length > 0 &&
    readTimeout?.length > 0
  ) {
    const connect = Number(connectTimeout)
    const write = Number(writeTimeout)
    const read = Number(readTimeout)

    configuration = {
      ...configuration,
      networkTimeout: {
        connectTimeout: connect,
        writeTimeout: write,
        readTimeout: read,
      },
    }
  }

  // paymentMethods
  const { isCardOn, isApplePayOn, isGooglePayOn, isPayByBankAppOn, isiDealOn } =
    paymentMethods
  let methods = 0

  if (isCardOn) {
    methods |= JudoPaymentMethod.Card
  }

  if (isApplePayOn) {
    methods |= JudoPaymentMethod.ApplePay
  }

  if (isGooglePayOn) {
    methods |= JudoPaymentMethod.GooglePay
  }

  if (isPayByBankAppOn) {
    methods |= JudoPaymentMethod.PayByBankApp
  }

  if (isiDealOn) {
    methods |= JudoPaymentMethod.iDEAL
  }

  configuration = {
    ...configuration,
    paymentMethods: methods,
  }

  // others, threeDSTwo, (mainly UI settings)
  const {
    isAddressVerificationServiceOn,
    isAmountLabelInPaymentMethodsOn,
    isAmountLabelInPaymentButtonOn,
    isInitialRecurringPaymentOn,
    isDelayedAuthorisationOn,
    isSecurityCodeOn,
  } = others

  const {
    isBillingInformationScreenEnabled,
    protocolMessageVersion,
    challengeRequestIndicator,
    uiCustomization: {
      isEnabled: isThreeDSUIConfigurationEnabled,
      toolbarCustomization: {
        textFontName: toolbarTextFontName,
        textFontSize: toolbarTextFontSize,
        textColor: toolbarTextColor,
        backgroundColor: toolbarBackgroundColor,
        headerText: toolbarHeaderText,
        buttonText: toolbarButtonText,
      },
      labelCustomization: {
        textFontName: labelTextFontName,
        textFontSize: labelTextFontSize,
        textColor: labelTextColor,
        headingTextFontSize: labelHeadingTextFontSize,
        headingTextFontName: labelHeadingTextFontName,
        headingTextColor: labelHeadingTextColor,
      },
      continueButtonCustomization: {
        textFontName: continueTextFontName,
        textColor: continueTextColor,
        textFontSize: continueTextFontSize,
        backgroundColor: continueBackgroundColor,
        cornerRadius: continueCornerRadius,
      },
      resendButtonCustomization: {
        textFontName: resendTextFontName,
        textColor: resendTextColor,
        textFontSize: resendTextFontSize,
        backgroundColor: resendBackgroundColor,
        cornerRadius: resendCornerRadius,
      },
      submitButtonCustomization: {
        textFontName: submitTextFontName,
        textColor: submitTextColor,
        textFontSize: submitTextFontSize,
        backgroundColor: submitBackgroundColor,
        cornerRadius: submitCornerRadius,
      },
      nextButtonCustomization: {
        textFontName: nextTextFontName,
        textColor: nextTextColor,
        textFontSize: nextTextFontSize,
        backgroundColor: nextBackgroundColor,
        cornerRadius: nextCornerRadius,
      },
      cancelButtonCustomization: {
        textFontName: cancelTextFontName,
        textColor: cancelTextColor,
        textFontSize: cancelTextFontSize,
        backgroundColor: cancelBackgroundColor,
        cornerRadius: cancelCornerRadius,
      },
      textBoxCustomization: {
        textFontName: textBoxTextFontName,
        textColor: textBoxTextColor,
        textFontSize: textBoxTextFontSize,
        cornerRadius: textBoxCornerRadius,
        borderColor: textBoxBorderColor,
        borderWidth: textBoxBorderWidth,
      },
    },
    SCAExemption,
    maxTimeout,
  } = threeDSTwo

  let myChallengeRequestIndicator: ChallengeRequestIndicator | undefined
  let myScaExemption: ScaExemption | undefined

  switch (challengeRequestIndicator) {
    case 'noPreference':
      myChallengeRequestIndicator = ChallengeRequestIndicator.NoPreference
      break

    case 'noChallenge':
      myChallengeRequestIndicator = ChallengeRequestIndicator.NoChallenge
      break

    case 'challengePreferred':
      myChallengeRequestIndicator = ChallengeRequestIndicator.ChallengePreferred
      break

    case 'challengeAsMandate':
      myChallengeRequestIndicator = ChallengeRequestIndicator.ChallengeAsMandate
      break

    default:
      myChallengeRequestIndicator = undefined
  }

  switch (SCAExemption) {
    case 'lowValue':
      myScaExemption = ScaExemption.LowValue
      break

    case 'secureCorporate':
      myScaExemption = ScaExemption.SecureCorporate
      break

    case 'trustedBeneficiary':
      myScaExemption = ScaExemption.TrustedBeneficiary
      break

    case 'transactionRiskAnalysis':
      myScaExemption = ScaExemption.TransactionRiskAnalysis
      break

    default:
      myScaExemption = undefined
  }

  let threeDSUIConfiguration: JudoThreeDSUIConfiguration | undefined

  if (isThreeDSUIConfigurationEnabled) {
    let buttonCustomizations: Partial<
      Record<JudoThreeDSButtonType, JudoThreeDSButtonCustomization>
    > = {}

    buttonCustomizations[JudoThreeDSButtonType.SUBMIT] = {
      textFontName: submitTextFontName,
      textColor: submitTextColor,
      backgroundColor: submitBackgroundColor,
      textFontSize: Number(submitTextFontSize),
      cornerRadius: Number(submitCornerRadius),
    }

    buttonCustomizations[JudoThreeDSButtonType.CONTINUE] = {
      textFontName: continueTextFontName,
      textColor: continueTextColor,
      backgroundColor: continueBackgroundColor,
      textFontSize: Number(continueTextFontSize),
      cornerRadius: Number(continueCornerRadius),
    }

    buttonCustomizations[JudoThreeDSButtonType.NEXT] = {
      textFontName: nextTextFontName,
      textColor: nextTextColor,
      backgroundColor: nextBackgroundColor,
      textFontSize: Number(nextTextFontSize),
      cornerRadius: Number(nextCornerRadius),
    }

    buttonCustomizations[JudoThreeDSButtonType.CANCEL] = {
      textFontName: cancelTextFontName,
      textColor: cancelTextColor,
      backgroundColor: cancelBackgroundColor,
      textFontSize: Number(cancelTextFontSize),
      cornerRadius: Number(cancelCornerRadius),
    }

    buttonCustomizations[JudoThreeDSButtonType.RESEND] = {
      textFontName: resendTextFontName,
      textColor: resendTextColor,
      backgroundColor: resendBackgroundColor,
      textFontSize: Number(resendTextFontSize),
      cornerRadius: Number(resendCornerRadius),
    }

    const toolbarCustomization: JudoThreeDSToolbarCustomization = {
      textFontName: toolbarTextFontName,
      textFontSize: Number(toolbarTextFontSize),
      textColor: toolbarTextColor,
      backgroundColor: toolbarBackgroundColor,
      headerText: toolbarHeaderText,
      buttonText: toolbarButtonText,
    }

    const labelCustomization: JudoThreeDSLabelCustomization = {
      textFontName: labelTextFontName,
      textFontSize: Number(labelTextFontSize),
      textColor: labelTextColor,
      headingTextFontSize: Number(labelHeadingTextFontSize),
      headingTextFontName: labelHeadingTextFontName,
      headingTextColor: labelHeadingTextColor,
    }

    const textBoxCustomization: JudoThreeDSTextBoxCustomization = {
      textFontName: textBoxTextFontName,
      textColor: textBoxTextColor,
      textFontSize: Number(textBoxTextFontSize),
      cornerRadius: Number(textBoxCornerRadius),
      borderColor: textBoxBorderColor,
      borderWidth: Number(textBoxBorderWidth),
    }

    threeDSUIConfiguration = {
      buttonCustomizations,
      toolbarCustomization,
      labelCustomization,
      textBoxCustomization,
    }
  }

  const threeDSTwoMaxTimeout =
    maxTimeout.length > 0 ? Number(maxTimeout) : undefined
  const messageVersion =
    protocolMessageVersion.length > 0 ? protocolMessageVersion : undefined

  configuration = {
    ...configuration,
    isInitialRecurringPayment: isInitialRecurringPaymentOn,
    isDelayedAuthorisation: isDelayedAuthorisationOn,
    challengeRequestIndicator: myChallengeRequestIndicator,
    scaExemption: myScaExemption,
    threeDSTwoMessageVersion: messageVersion,
    threeDSTwoMaxTimeout,
    uiConfiguration: {
      isAVSEnabled: isAddressVerificationServiceOn,
      shouldAskForBillingInformation: isBillingInformationScreenEnabled,
      shouldPaymentButtonDisplayAmount: isAmountLabelInPaymentButtonOn,
      shouldPaymentMethodsDisplayAmount: isAmountLabelInPaymentMethodsOn,
      shouldPaymentMethodsVerifySecurityCode: isSecurityCodeOn,
      threeDSUIConfiguration,
    },
  }

  // applePay
  const {
    merchantId,
    returnedContactInfo: {
      isBillingContactsOn: applePayIsBillingContactsOn,
      isShippingContactsOn: applePayIsShippingContactsOn,
    },
    requiredShippingContactFields: {
      isPostalAddressOn: applePayIsShippingPostalAddressOn,
      isPhoneOn: applePayIsShippingPhoneOn,
      isNameOn: applePayIsShippingNameOn,
      isEmailOn: applePayIsShippingEmailOn,
    },
    requiredBillingContactFields: {
      isPostalAddressOn: applePayIsBillingPostalAddressOn,
      isPhoneOn: applePayIsBillingPhoneOn,
      isNameOn: applePayIsBillingNameOn,
      isEmailOn: applePayIsBillingEmailOn,
    },
  } = applePay

  const itemOne: JudoPaymentSummaryItem = {
    label: 'Item 1',
    amount: '0.01',
  }

  const itemTwo: JudoPaymentSummaryItem = {
    label: 'Item 2',
    amount: '0.02',
    type: JudoPaymentSummaryItemType.Final,
  }

  const total: JudoPaymentSummaryItem = {
    label: 'Tim Apple',
    amount: '0.03',
  }

  const delivery: JudoShippingMethod = {
    identifier: 'delivery-id',
    label: 'Deliver',
    detail: 'Deliver to your home address',
    amount: '0.01',
    type: JudoPaymentSummaryItemType.Final,
  }

  let returnedInfo: JudoReturnedInfo | undefined

  if (applePayIsBillingContactsOn && applePayIsShippingContactsOn) {
    returnedInfo = JudoReturnedInfo.All
  } else if (applePayIsBillingContactsOn) {
    returnedInfo = JudoReturnedInfo.BillingDetails
  } else if (applePayIsShippingContactsOn) {
    returnedInfo = JudoReturnedInfo.ShippingDetails
  }

  let billingFields: Array<JudoContactField> = []
  let shippingFields: Array<JudoContactField> = []

  if (applePayIsBillingPostalAddressOn) {
    billingFields.push(JudoContactField.PostalAddress)
  }

  if (applePayIsBillingPhoneOn) {
    billingFields.push(JudoContactField.Phone)
  }

  if (applePayIsBillingNameOn) {
    billingFields.push(JudoContactField.Name)
  }

  if (applePayIsBillingEmailOn) {
    billingFields.push(JudoContactField.Email)
  }

  if (applePayIsShippingPostalAddressOn) {
    shippingFields.push(JudoContactField.PostalAddress)
  }

  if (applePayIsShippingPhoneOn) {
    shippingFields.push(JudoContactField.Phone)
  }

  if (applePayIsShippingNameOn) {
    shippingFields.push(JudoContactField.Name)
  }

  if (applePayIsShippingEmailOn) {
    shippingFields.push(JudoContactField.Email)
  }

  const reduceCallbackFn = (
    previousValue: JudoContactField,
    currentValue: JudoContactField,
  ) => {
    if (previousValue) {
      return previousValue | currentValue
    }
    return currentValue
  }

  let requiredBillingContactFields =
    billingFields.length > 0
      ? billingFields.reduce(reduceCallbackFn)
      : undefined
  let requiredShippingContactFields =
    shippingFields.length > 0
      ? shippingFields.reduce(reduceCallbackFn)
      : undefined

  configuration = {
    ...configuration,
    applePayConfiguration: {
      merchantId,
      countryCode: 'GB',
      paymentSummaryItems: [itemOne, itemTwo, total],
      merchantCapabilities: JudoMerchantCapability.ThreeDS,
      requiredBillingContactFields,
      requiredShippingContactFields,
      shippingMethods: [delivery],
      shippingType: JudoShippingType.Delivery,
      returnedInfo,
    },
  }

  // googlePay
  const {
    isProductionEnvironmentOn,
    countryCode,
    isBillingAddressPhoneNumberOn,
    billingAddressFields,
    isShippingAddressPhoneNumberOn,
    isShippingAddressOn,
    isEmailAddressOn,
  } = googlePay

  let billingParameters: JudoBillingAddressParameters | undefined

  if (billingAddressFields === 'MIN' || billingAddressFields === 'FULL') {
    billingParameters = {
      addressFormat:
        billingAddressFields === 'MIN'
          ? JudoAddressFormat.MINIMAL
          : JudoAddressFormat.FULL,
      isPhoneNumberRequired: isBillingAddressPhoneNumberOn,
    }
  }

  const shippingParameters: JudoShippingAddressParameters = {
    allowedCountryCodes: ['GB', 'US'],
    isPhoneNumberRequired: isShippingAddressPhoneNumberOn,
  }

  const googlePayConfiguration: JudoGooglePayConfiguration = {
    countryCode,
    environment: isProductionEnvironmentOn
      ? JudoGooglePayEnvironment.PRODUCTION
      : JudoGooglePayEnvironment.TEST,
    isEmailRequired: isEmailAddressOn,
    billingAddressParameters: billingParameters,
    shippingAddressParameters: shippingParameters,
    isBillingAddressRequired: true,
    isShippingAddressRequired: isShippingAddressOn,
  }

  configuration = {
    ...configuration,
    googlePayConfiguration,
  }

  return configuration
}
