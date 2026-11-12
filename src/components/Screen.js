import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function Screen({ children, scroll = true, style }) {
  if (!scroll) return <View style={[styles.container, style]}>{children}</View>;
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FB' },
  content: { padding: 18, paddingBottom: 36 },
});
