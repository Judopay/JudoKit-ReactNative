import React, { FC } from 'react';
import { TextInput as DefaultTextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';

export interface TextInputProps {
  editable?: boolean;
  placeholder?: string;
  value?: string;
  onChangeText?: (newValue: string) => void;
  testID?: string;
  padding?: number;
  marginTop?: number;
  marginBottom?: number;
}

const TextInput: FC<TextInputProps> = ({
  editable,
  onChangeText,
  value,
  placeholder,
  padding = 12,
  marginTop = 24,
  marginBottom = 0,
  testID,
}) => {
  const {
    colors: { border, card, text },
  } = useTheme();

  return (
    <DefaultTextInput
      style={{
        width: '100%',
        fontSize: 16,
        fontWeight: 'normal',
        color: text,
        borderColor: border,
        backgroundColor: card,
        borderWidth: 1,
        borderRadius: 4,
        padding,
        marginTop,
        marginBottom,
      }}
      placeholderTextColor="#6e6e6e"
      contextMenuHidden={editable}
      selectTextOnFocus={editable}
      editable={editable}
      placeholder={placeholder}
      clearButtonMode="always"
      value={value}
      onChangeText={onChangeText}
      testID={testID}
    />
  );
};

export default TextInput;
