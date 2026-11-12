import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CATEGORIES } from '../data/sampleData';

export default function ItemCard({ item, onPress }) {
  const category = CATEGORIES.find((c) => c.name === item.category);
  const low = Number(item.quantity) <= 3;
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && { opacity: 0.82 }]}>
      <View style={[styles.icon, { backgroundColor: category?.color || '#EDF1F5' }]}>
        <Text style={styles.iconText}>{category?.icon || '📦'}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.meta}>Qty: {item.quantity}  •  Rs. {Number(item.price).toFixed(2)}</Text>
      </View>
      <View style={styles.right}>
        {low ? <Text style={styles.low}>Low</Text> : <Text style={styles.stock}>In stock</Text>}
        <Text style={styles.arrow}>›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 13, marginBottom: 10, borderWidth: 1, borderColor: '#EDF0F5' },
  icon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  iconText: { fontSize: 23 },
  info: { flex: 1, marginLeft: 12 },
  name: { color: '#17233C', fontWeight: '800', fontSize: 15 },
  category: { color: '#718096', fontSize: 12, marginTop: 3 },
  meta: { color: '#48566E', fontSize: 12, marginTop: 6 },
  right: { alignItems: 'flex-end', justifyContent: 'center', marginLeft: 5 },
  low: { color: '#C45B32', backgroundColor: '#FFF0E9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, fontSize: 10, fontWeight: '800' },
  stock: { color: '#16845B', backgroundColor: '#E8F8F1', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, fontSize: 10, fontWeight: '800' },
  arrow: { color: '#A0AABC', fontSize: 25, marginTop: 2, lineHeight: 25 }
});
