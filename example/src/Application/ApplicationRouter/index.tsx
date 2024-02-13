import { NavigationContainer, Theme } from '@react-navigation/native';
import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import SettingsMainScreen from './Screens/SettingsMainScreen';
import SettingsButton from '../../Components/SettingsButton';
import ResultScreen from './Screens/ResultScreen';
import SettingsThreeDSUIScreen from './Screens/SettingsThreeDSUIScreen';
import BackButton from '../../Components/BackButton';
import SettingsSingleSelectionScreen from './Screens/SettingsSingleSelectionScreen';
import { RootStackParamList, Screen } from '../../Data/TypeDefinitions';
import TokenPaymentsScreen from './Screens/TokenPaymentsScreen';
import GetTransactionDetailsScreen from './Screens/GetTransactionDetailsScreen';
import SettingsApplePayScreen from './Screens/SettingsApplePay';

const Stack = createStackNavigator<RootStackParamList>();

interface ApplicationRouterProps {
  theme?: Theme;
}

const headerLeft = () => <BackButton />;
const headerRight = () => <SettingsButton />;

const ApplicationRouter: FC<ApplicationRouterProps> = ({ theme }) => {
  const options = (title: string) => ({
    headerLeft,
    title,
  });
  const homeScreenOptions = {
    headerRight,
    title: '[ReactNative] Features',
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName={Screen.HOME}>
        <Stack.Screen
          name={Screen.HOME}
          component={HomeScreen}
          options={homeScreenOptions}
        />
        <Stack.Screen
          name={Screen.SETTINGS}
          component={SettingsMainScreen}
          options={options('Settings')}
        />
        <Stack.Screen
          name={Screen.THREE_DS_UI_SETTINGS}
          component={SettingsThreeDSUIScreen}
          options={options('UI settings')}
        />
        <Stack.Screen
          name={Screen.APPLE_PAY_SETTINGS}
          component={SettingsApplePayScreen}
          options={options('Apple Pay')}
        />
        <Stack.Screen
          name={Screen.RESULT}
          component={ResultScreen}
          options={options('Result')}
        />
        <Stack.Screen
          name={Screen.TOKEN_PAYMENTS}
          component={TokenPaymentsScreen}
          options={options('Token payments')}
        />
        {/* TODO: uncomment when implementation is in place */}
        {/*<Stack.Screen name={Screen.NO_UI_PAYMENTS} component={NoUiPaymentsScreen} options={options("No UI payments")}/>*/}
        <Stack.Screen
          name={Screen.GET_TRANSACTION_DETAILS}
          component={GetTransactionDetailsScreen}
          options={options('Transaction details')}
        />
        <Stack.Screen
          name={Screen.SINGLE_SELECTION}
          component={SettingsSingleSelectionScreen}
          options={({ route }) => options(route?.params?.name)}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationRouter;
