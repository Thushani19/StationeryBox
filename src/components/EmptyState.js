import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function EmptyState({ title = 'No items found', message = 'Try changing your search or add a new item.' }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.icon}>📭</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 28, alignItems: 'center', marginTop: 10 },
  icon: { fontSize: 34, marginBottom: 10 },
  title: { fontSize: 16, color: '#17233C', fontWeight: '800' },
  message: { fontSize: 13, color: '#7A879B', textAlign: 'center', marginTop: 6, lineHeight: 19 }
});
