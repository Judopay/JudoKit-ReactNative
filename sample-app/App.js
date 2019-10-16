// @flow

import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./screens/HomeScreen";

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
