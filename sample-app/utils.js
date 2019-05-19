// @flow

import { Alert } from "react-native";

export const showMessage = async function(
  title: string,
  message: string,
  onPress: () => void = () => {}
) {
  await Alert.alert(
    title,
    message,
    [
      {
        text: "OK",
        onPress: onPress()
      }
    ],
    { cancelable: false }
  );
};
