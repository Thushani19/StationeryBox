import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function PrimaryButton({ title, onPress, secondary = false, danger = false }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [
      styles.button,
      secondary && styles.secondary,
      danger && styles.danger,
      pressed && { opacity: 0.82 }
    ]}>
      <Text style={[styles.text, secondary && styles.secondaryText]}>{title}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: { backgroundColor: '#3157D5', borderRadius: 13, paddingVertical: 14, alignItems: 'center', marginTop: 10 },
  secondary: { backgroundColor: '#EAF0FF' },
  danger: { backgroundColor: '#FFF0EE' },
  text: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
  secondaryText: { color: '#3157D5' }
});
