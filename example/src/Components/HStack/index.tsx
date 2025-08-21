import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

type HStackProps = ViewProps & {
  spacing?: number;
};

export function HStack({ children, spacing = 8, style, ...rest }: HStackProps) {
  return (
    <View style={[styles.container, style]} {...rest}>
      {React.Children.map(children, (child, index) => (
        <View
          style={{
            marginRight:
              index === React.Children.count(children) - 1 ? 0 : spacing,
          }}
        >
          {child}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
