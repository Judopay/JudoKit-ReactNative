import {
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
} from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import _ from 'lodash';

const threeDSSDKUISections = (
  data: SettingsData
): ReadonlyArray<SectionListData<SettingsItem>> => {
  const isEnabledPath = 'threeDSTwo.uiCustomization.isEnabled';
  const isEnabled = _.get(data, isEnabledPath);

  let sections: Array<SectionListData<SettingsItem>> = [
    {
      header: '',
      data: [
        {
          path: isEnabledPath,
          dataType: SettingsItemDataType.BOOLEAN,
          title: 'Enable',
          value: isEnabled,
        },
      ],
    },
  ];

  if (!isEnabled) {
    return sections;
  }

  const toolbarTextFontNamePath =
    'threeDSTwo.uiCustomization.toolbarCustomization.textFontName';
  const toolbarTextColorPath =
    'threeDSTwo.uiCustomization.toolbarCustomization.textColor';
  const toolbarTextFontSizePath =
    'threeDSTwo.uiCustomization.toolbarCustomization.textFontSize';
  const toolbarBackgroundColorPath =
    'threeDSTwo.uiCustomization.toolbarCustomization.backgroundColor';
  const toolbarHeaderTextPath =
    'threeDSTwo.uiCustomization.toolbarCustomization.headerText';
  const toolbarButtonTextPath =
    'threeDSTwo.uiCustomization.toolbarCustomization.buttonText';

  sections.push({
    header: 'TOOLBAR CUSTOMIZATION',
    data: [
      {
        path: toolbarTextFontNamePath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text font name',
        value: _.get(data, toolbarTextFontNamePath),
      },
      {
        path: toolbarTextColorPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text color',
        value: _.get(data, toolbarTextColorPath),
      },
      {
        path: toolbarTextFontSizePath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text font size',
        value: _.get(data, toolbarTextFontSizePath),
      },
      {
        path: toolbarBackgroundColorPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Background color',
        value: _.get(data, toolbarBackgroundColorPath),
      },
      {
        path: toolbarHeaderTextPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Header text',
        value: _.get(data, toolbarHeaderTextPath),
      },
      {
        path: toolbarButtonTextPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Button text',
        value: _.get(data, toolbarButtonTextPath),
      },
    ],
  });

  const labelTextFontNamePath =
    'threeDSTwo.uiCustomization.labelCustomization.textFontName';
  const labelTextColorPath =
    'threeDSTwo.uiCustomization.labelCustomization.textColor';
  const labelTextFontSizePath =
    'threeDSTwo.uiCustomization.labelCustomization.textFontSize';
  const labelHeadingTextFontNamePath =
    'threeDSTwo.uiCustomization.labelCustomization.headingTextFontName';
  const labelHeadingTextColorPath =
    'threeDSTwo.uiCustomization.labelCustomization.headingTextColor';
  const labelHeadingTextFontSizeSPath =
    'threeDSTwo.uiCustomization.labelCustomization.headingTextFontSize';

  sections.push({
    header: 'LABEL CUSTOMIZATION',
    data: [
      {
        path: labelTextFontNamePath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text font name',
        value: _.get(data, labelTextFontNamePath),
      },
      {
        path: labelTextColorPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text color',
        value: _.get(data, labelTextColorPath),
      },
      {
        path: labelTextFontSizePath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text font size',
        value: _.get(data, labelTextFontSizePath),
      },
      {
        path: labelHeadingTextFontNamePath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Heading text font name',
        value: _.get(data, labelHeadingTextFontNamePath),
      },
      {
        path: labelHeadingTextColorPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Heading text color',
        value: _.get(data, labelHeadingTextColorPath),
      },
      {
        path: labelHeadingTextFontSizeSPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Heading text font size',
        value: _.get(data, labelHeadingTextFontSizeSPath),
      },
    ],
  });

  const textBoxTextFontNamePath =
    'threeDSTwo.uiCustomization.textBoxCustomization.textFontName';
  const textBoxTextColorPath =
    'threeDSTwo.uiCustomization.textBoxCustomization.textColor';
  const textBoxTextFontSizePath =
    'threeDSTwo.uiCustomization.textBoxCustomization.textFontSize';
  const textBoxBorderWidthPath =
    'threeDSTwo.uiCustomization.textBoxCustomization.borderWidth';
  const textBoxBorderColorPath =
    'threeDSTwo.uiCustomization.textBoxCustomization.borderColor';
  const textBoxCornerRadiusPath =
    'threeDSTwo.uiCustomization.textBoxCustomization.cornerRadius';

  sections.push({
    header: 'TEXT BOX CUSTOMIZATION',
    data: [
      {
        path: textBoxTextFontNamePath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text font name',
        value: _.get(data, textBoxTextFontNamePath),
      },
      {
        path: textBoxTextColorPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text color',
        value: _.get(data, textBoxTextColorPath),
      },
      {
        path: textBoxTextFontSizePath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text font size',
        value: _.get(data, textBoxTextFontSizePath),
      },
      {
        path: textBoxBorderWidthPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Border width',
        value: _.get(data, textBoxBorderWidthPath),
      },
      {
        path: textBoxBorderColorPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Border color',
        value: _.get(data, textBoxBorderColorPath),
      },
      {
        path: textBoxCornerRadiusPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Corner radius',
        value: _.get(data, textBoxCornerRadiusPath),
      },
    ],
  });

  const submitButtonTextFontNamePath =
    'threeDSTwo.uiCustomization.submitButtonCustomization.textFontName';
  const submitButtonTextColorPath =
    'threeDSTwo.uiCustomization.submitButtonCustomization.textColor';
  const submitButtonTextFontSizePath =
    'threeDSTwo.uiCustomization.submitButtonCustomization.textFontSize';
  const submitButtonBackgroundColorPath =
    'threeDSTwo.uiCustomization.submitButtonCustomization.backgroundColor';
  const submitButtonCornerRadiusPath =
    'threeDSTwo.uiCustomization.submitButtonCustomization.cornerRadius';

  sections.push({
    header: 'SUBMIT BUTTON CUSTOMIZATION',
    data: [
      {
        path: submitButtonTextFontNamePath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text font name',
        value: _.get(data, submitButtonTextFontNamePath),
      },
      {
        path: submitButtonTextColorPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text color',
        value: _.get(data, submitButtonTextColorPath),
      },
      {
        path: submitButtonTextFontSizePath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text font size',
        value: _.get(data, submitButtonTextFontSizePath),
      },
      {
        path: submitButtonBackgroundColorPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Background color',
        value: _.get(data, submitButtonBackgroundColorPath),
      },
      {
        path: submitButtonCornerRadiusPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Corner radius',
        value: _.get(data, submitButtonCornerRadiusPath),
      },
    ],
  });

  const nextButtonTextFontNamePath =
    'threeDSTwo.uiCustomization.nextButtonCustomization.textFontName';
  const nextButtonTextColorPath =
    'threeDSTwo.uiCustomization.nextButtonCustomization.textColor';
  const nextButtonTextFontSizePath =
    'threeDSTwo.uiCustomization.nextButtonCustomization.textFontSize';
  const nextButtonBackgroundColorPath =
    'threeDSTwo.uiCustomization.nextButtonCustomization.backgroundColor';
  const nextButtonCornerRadiusPath =
    'threeDSTwo.uiCustomization.nextButtonCustomization.cornerRadius';

  sections.push({
    header: 'NEXT BUTTON CUSTOMIZATION',
    data: [
      {
        path: nextButtonTextFontNamePath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text font name',
        value: _.get(data, nextButtonTextFontNamePath),
      },
      {
        path: nextButtonTextColorPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text color',
        value: _.get(data, nextButtonTextColorPath),
      },
      {
        path: nextButtonTextFontSizePath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text font size',
        value: _.get(data, nextButtonTextFontSizePath),
      },
      {
        path: nextButtonBackgroundColorPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Background color',
        value: _.get(data, nextButtonBackgroundColorPath),
      },
      {
        path: nextButtonCornerRadiusPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Corner radius',
        value: _.get(data, nextButtonCornerRadiusPath),
      },
    ],
  });

  const continueButtonTextFontNamePath =
    'threeDSTwo.uiCustomization.continueButtonCustomization.textFontName';
  const continueButtonTextColorPath =
    'threeDSTwo.uiCustomization.continueButtonCustomization.textColor';
  const continueButtonTextFontSizePath =
    'threeDSTwo.uiCustomization.continueButtonCustomization.textFontSize';
  const continueButtonBackgroundColorPath =
    'threeDSTwo.uiCustomization.continueButtonCustomization.backgroundColor';
  const continueButtonCornerRadiusPath =
    'threeDSTwo.uiCustomization.continueButtonCustomization.cornerRadius';

  sections.push({
    header: 'CONTINUE BUTTON CUSTOMIZATION',
    data: [
      {
        path: continueButtonTextFontNamePath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text font name',
        value: _.get(data, continueButtonTextFontNamePath),
      },
      {
        path: continueButtonTextColorPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text color',
        value: _.get(data, continueButtonTextColorPath),
      },
      {
        path: continueButtonTextFontSizePath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text font size',
        value: _.get(data, continueButtonTextFontSizePath),
      },
      {
        path: continueButtonBackgroundColorPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Background color',
        value: _.get(data, continueButtonBackgroundColorPath),
      },
      {
        path: continueButtonCornerRadiusPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Corner radius',
        value: _.get(data, continueButtonCornerRadiusPath),
      },
    ],
  });

  const cancelButtonTextFontNamePath =
    'threeDSTwo.uiCustomization.cancelButtonCustomization.textFontName';
  const cancelButtonTextColorPath =
    'threeDSTwo.uiCustomization.cancelButtonCustomization.textColor';
  const cancelButtonTextFontSizePath =
    'threeDSTwo.uiCustomization.cancelButtonCustomization.textFontSize';
  const cancelButtonBackgroundColorPath =
    'threeDSTwo.uiCustomization.cancelButtonCustomization.backgroundColor';
  const cancelButtonCornerRadiusPath =
    'threeDSTwo.uiCustomization.cancelButtonCustomization.cornerRadius';

  sections.push({
    header: 'CANCEL BUTTON CUSTOMIZATION',
    data: [
      {
        path: cancelButtonTextFontNamePath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text font name',
        value: _.get(data, cancelButtonTextFontNamePath),
      },
      {
        path: cancelButtonTextColorPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text color',
        value: _.get(data, cancelButtonTextColorPath),
      },
      {
        path: cancelButtonTextFontSizePath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text font size',
        value: _.get(data, cancelButtonTextFontSizePath),
      },
      {
        path: cancelButtonBackgroundColorPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Background color',
        value: _.get(data, cancelButtonBackgroundColorPath),
      },
      {
        path: cancelButtonCornerRadiusPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Corner radius',
        value: _.get(data, cancelButtonCornerRadiusPath),
      },
    ],
  });

  const resendButtonTextFontNamePath =
    'threeDSTwo.uiCustomization.resendButtonCustomization.textFontName';
  const resendButtonTextColorPath =
    'threeDSTwo.uiCustomization.resendButtonCustomization.textColor';
  const resendButtonTextFontSizePath =
    'threeDSTwo.uiCustomization.resendButtonCustomization.textFontSize';
  const resendButtonBackgroundColorPath =
    'threeDSTwo.uiCustomization.resendButtonCustomization.backgroundColor';
  const resendButtonCornerRadiusPath =
    'threeDSTwo.uiCustomization.resendButtonCustomization.cornerRadius';

  sections.push({
    header: 'RESEND BUTTON CUSTOMIZATION',
    data: [
      {
        path: resendButtonTextFontNamePath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text font name',
        value: _.get(data, resendButtonTextFontNamePath),
      },
      {
        path: resendButtonTextColorPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text color',
        value: _.get(data, resendButtonTextColorPath),
      },
      {
        path: resendButtonTextFontSizePath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Text font size',
        value: _.get(data, resendButtonTextFontSizePath),
      },
      {
        path: resendButtonBackgroundColorPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Background color',
        value: _.get(data, resendButtonBackgroundColorPath),
      },
      {
        path: resendButtonCornerRadiusPath,
        dataType: SettingsItemDataType.TEXT,
        title: 'Corner radius',
        value: _.get(data, resendButtonCornerRadiusPath),
      },
    ],
  });

  return sections;
};

export default threeDSSDKUISections;
