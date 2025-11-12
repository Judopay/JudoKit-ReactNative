import { SettingsItem, SettingsItemDataType } from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import { THREE_DS_TWO_KEYS } from '../Constants';
import { getBoolOrFalse } from '../Mapping';

const threeDSSDKUISections = (): ReadonlyArray<
  SectionListData<SettingsItem>
> => {
  const isEnabled = getBoolOrFalse(
    THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.IS_ENABLED
  );

  let sections: Array<SectionListData<SettingsItem>> = [
    {
      header: '',
      data: [
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.IS_ENABLED,
          dataType: SettingsItemDataType.BOOLEAN,
          title: 'Enable',
        },
      ],
    },
  ];

  if (!isEnabled) {
    return sections;
  }

  sections.push(
    {
      header: 'TOOLBAR CUSTOMIZATION',
      data: [
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TOOLBAR_CUSTOMIZATION
            .TEXT_FONT_NAME,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text font name',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TOOLBAR_CUSTOMIZATION
            .TEXT_COLOR,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text color',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TOOLBAR_CUSTOMIZATION
            .TEXT_FONT_SIZE,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text font size',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TOOLBAR_CUSTOMIZATION
            .BACKGROUND_COLOR,
          dataType: SettingsItemDataType.TEXT,
          title: 'Background color',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TOOLBAR_CUSTOMIZATION
            .HEADER_TEXT,
          dataType: SettingsItemDataType.TEXT,
          title: 'Header text',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TOOLBAR_CUSTOMIZATION
            .BUTTON_TEXT,
          dataType: SettingsItemDataType.TEXT,
          title: 'Button text',
        },
      ],
    },
    {
      header: 'LABEL CUSTOMIZATION',
      data: [
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.LABEL_CUSTOMIZATION
            .TEXT_FONT_NAME,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text font name',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.LABEL_CUSTOMIZATION
            .TEXT_COLOR,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text color',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.LABEL_CUSTOMIZATION
            .TEXT_FONT_SIZE,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text font size',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.LABEL_CUSTOMIZATION
            .HEADING_TEXT_FONT_NAME,
          dataType: SettingsItemDataType.TEXT,
          title: 'Heading text font name',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.LABEL_CUSTOMIZATION
            .HEADING_TEXT_COLOR,
          dataType: SettingsItemDataType.TEXT,
          title: 'Heading text color',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.LABEL_CUSTOMIZATION
            .HEADING_TEXT_FONT_SIZE,
          dataType: SettingsItemDataType.TEXT,
          title: 'Heading text font size',
        },
      ],
    },
    {
      header: 'TEXT BOX CUSTOMIZATION',
      data: [
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TEXT_BOX_CUSTOMIZATION
            .TEXT_FONT_NAME,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text font name',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TEXT_BOX_CUSTOMIZATION
            .TEXT_COLOR,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text color',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TEXT_BOX_CUSTOMIZATION
            .TEXT_FONT_SIZE,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text font size',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TEXT_BOX_CUSTOMIZATION
            .BORDER_WIDTH,
          dataType: SettingsItemDataType.TEXT,
          title: 'Border width',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TEXT_BOX_CUSTOMIZATION
            .BORDER_COLOR,
          dataType: SettingsItemDataType.TEXT,
          title: 'Border color',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.TEXT_BOX_CUSTOMIZATION
            .CORNER_RADIUS,
          dataType: SettingsItemDataType.TEXT,
          title: 'Corner radius',
        },
      ],
    },
    {
      header: 'SUBMIT BUTTON CUSTOMIZATION',
      data: [
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.SUBMIT_BUTTON_CUSTOMIZATION
            .TEXT_FONT_NAME,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text font name',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.SUBMIT_BUTTON_CUSTOMIZATION
            .TEXT_COLOR,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text color',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.SUBMIT_BUTTON_CUSTOMIZATION
            .TEXT_FONT_SIZE,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text font size',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.SUBMIT_BUTTON_CUSTOMIZATION
            .BACKGROUND_COLOR,
          dataType: SettingsItemDataType.TEXT,
          title: 'Background color',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.SUBMIT_BUTTON_CUSTOMIZATION
            .CORNER_RADIUS,
          dataType: SettingsItemDataType.TEXT,
          title: 'Corner radius',
        },
      ],
    },
    {
      header: 'NEXT BUTTON CUSTOMIZATION',
      data: [
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.NEXT_BUTTON_CUSTOMIZATION
            .TEXT_FONT_NAME,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text font name',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.NEXT_BUTTON_CUSTOMIZATION
            .TEXT_COLOR,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text color',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.NEXT_BUTTON_CUSTOMIZATION
            .TEXT_FONT_SIZE,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text font size',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.NEXT_BUTTON_CUSTOMIZATION
            .BACKGROUND_COLOR,
          dataType: SettingsItemDataType.TEXT,
          title: 'Background color',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.NEXT_BUTTON_CUSTOMIZATION
            .CORNER_RADIUS,
          dataType: SettingsItemDataType.TEXT,
          title: 'Corner radius',
        },
      ],
    },
    {
      header: 'CONTINUE BUTTON CUSTOMIZATION',
      data: [
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.CONTINUE_BUTTON_CUSTOMIZATION
            .TEXT_FONT_NAME,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text font name',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.CONTINUE_BUTTON_CUSTOMIZATION
            .TEXT_COLOR,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text color',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.CONTINUE_BUTTON_CUSTOMIZATION
            .TEXT_FONT_SIZE,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text font size',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.CONTINUE_BUTTON_CUSTOMIZATION
            .BACKGROUND_COLOR,
          dataType: SettingsItemDataType.TEXT,
          title: 'Background color',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.CONTINUE_BUTTON_CUSTOMIZATION
            .CORNER_RADIUS,
          dataType: SettingsItemDataType.TEXT,
          title: 'Corner radius',
        },
      ],
    },
    {
      header: 'CANCEL BUTTON CUSTOMIZATION',
      data: [
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.CANCEL_BUTTON_CUSTOMIZATION
            .TEXT_FONT_NAME,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text font name',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.CANCEL_BUTTON_CUSTOMIZATION
            .TEXT_COLOR,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text color',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.CANCEL_BUTTON_CUSTOMIZATION
            .TEXT_FONT_SIZE,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text font size',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.CANCEL_BUTTON_CUSTOMIZATION
            .BACKGROUND_COLOR,
          dataType: SettingsItemDataType.TEXT,
          title: 'Background color',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.CANCEL_BUTTON_CUSTOMIZATION
            .CORNER_RADIUS,
          dataType: SettingsItemDataType.TEXT,
          title: 'Corner radius',
        },
      ],
    },
    {
      header: 'RESEND BUTTON CUSTOMIZATION',
      data: [
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.RESEND_BUTTON_CUSTOMIZATION
            .TEXT_FONT_NAME,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text font name',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.RESEND_BUTTON_CUSTOMIZATION
            .TEXT_COLOR,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text color',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.RESEND_BUTTON_CUSTOMIZATION
            .TEXT_FONT_SIZE,
          dataType: SettingsItemDataType.TEXT,
          title: 'Text font size',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.RESEND_BUTTON_CUSTOMIZATION
            .BACKGROUND_COLOR,
          dataType: SettingsItemDataType.TEXT,
          title: 'Background color',
        },
        {
          path: THREE_DS_TWO_KEYS.UI_CUSTOMIZATION.RESEND_BUTTON_CUSTOMIZATION
            .CORNER_RADIUS,
          dataType: SettingsItemDataType.TEXT,
          title: 'Corner radius',
        },
      ],
    }
  );

  return sections;
};

export default threeDSSDKUISections;
