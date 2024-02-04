import {
  SettingsData,
  SettingsItem,
  SettingsItemDataType,
} from '../TypeDefinitions';
import { SectionListData } from 'react-native';
import _ from 'lodash';

const primaryAccountDetailsSection = (
  data: SettingsData
): SectionListData<SettingsItem> => {
  const isEnabledPath = 'primaryAccountDetails.isEnabled';
  const namePath = 'primaryAccountDetails.name';
  const accountNumberPath = 'primaryAccountDetails.accountNumber';
  const dateOfBirthPath = 'primaryAccountDetails.dateOfBirth';
  const postCodePath = 'primaryAccountDetails.postCode';

  const isEnabled = _.get(data, isEnabledPath);

  return {
    header: 'PRIMARY ACCOUNT DETAILS',
    data: [
      {
        path: isEnabledPath,
        dataType: SettingsItemDataType.BOOLEAN,
        title: 'Enable primary account details',
        value: isEnabled,
      },
      ...(isEnabled
        ? [
            {
              path: namePath,
              dataType: SettingsItemDataType.TEXT,
              title: 'Name',
              value: _.get(data, namePath),
            },
            {
              path: accountNumberPath,
              dataType: SettingsItemDataType.TEXT,
              title: 'Account number',
              value: _.get(data, accountNumberPath),
            },
            {
              path: dateOfBirthPath,
              dataType: SettingsItemDataType.TEXT,
              title: 'Date of birth',
              value: _.get(data, dateOfBirthPath),
            },
            {
              path: postCodePath,
              dataType: SettingsItemDataType.TEXT,
              title: 'Post code',
              value: _.get(data, postCodePath),
            },
          ]
        : []),
    ],
  };
};

export default primaryAccountDetailsSection;
