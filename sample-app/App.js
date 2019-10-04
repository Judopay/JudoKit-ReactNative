// @flow

import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
// import { useScreens } from "react-native-screens";
import HomeScreen from "./screens/HomeScreen";

// useScreens();

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

const AppContainer = createAppContainer(AppNavigator);

type Props = {};

export default class App extends React.Component<Props> {
  render() {
    return <AppContainer />;
  }
}
