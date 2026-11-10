import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Screen from '../components/Screen';
import ItemCard from '../components/ItemCard';
import EmptyState from '../components/EmptyState';
import { useItems } from '../context/ItemsContext';
import { CATEGORIES } from '../data/sampleData';

export default function AllItemsScreen({ navigation, route }) {
  const { items } = useItems();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(route.params?.category || 'All');
  const filtered = useMemo(() => items.filter((item) => {
    const matchesText = item.name.toLowerCase().includes(query.trim().toLowerCase());
    const matchesCategory = category === 'All' || item.category === category;
    return matchesText && matchesCategory;
  }), [items, query, category]);

  return (
    <Screen>
      <Text style={styles.intro}>Find and manage everything in your stationery collection.</Text>
      <TextInput value={query} onChangeText={setQuery} placeholder="🔍  Search item name..." placeholderTextColor="#9AA5B5" style={styles.search} />
      <Text style={styles.label}>FILTER BY CATEGORY</Text>
      <View style={styles.filters}>
        {['All', ...CATEGORIES.map((c) => c.name)].map((name) => (
          <Pressable key={name} onPress={() => setCategory(name)} style={[styles.chip, category === name && styles.chipActive]}>
            <Text style={[styles.chipText, category === name && styles.chipTextActive]}>{name}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.resultRow}>
        <Text style={styles.result}>{filtered.length} item(s) found</Text>
        <Pressable onPress={() => navigation.navigate('AddItem')}><Text style={styles.add}>＋ Add item</Text></Pressable>
      </View>
      {filtered.length ? filtered.map((item) => (
        <ItemCard key={item.id} item={item} onPress={() => navigation.navigate('ItemDetails', { id: item.id })} />
      )) : <EmptyState title="No matching items" message="Try another keyword or category, or add a new item." />}
    </Screen>
  );
}
const styles = StyleSheet.create({
  intro: { color: '#748198', fontSize: 13, lineHeight: 19, marginBottom: 13 },
  search: { backgroundColor: '#FFFFFF', borderRadius: 13, borderWidth: 1, borderColor: '#E7EBF2', paddingHorizontal: 14, paddingVertical: 13, color: '#17233C', fontSize: 14 },
  label: { color: '#8A96A9', fontSize: 10, fontWeight: '900', letterSpacing: 1, marginTop: 18, marginBottom: 9 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  chip: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E7EBF2', paddingHorizontal: 11, paddingVertical: 8, borderRadius: 20 },
  chipActive: { backgroundColor: '#3157D5', borderColor: '#3157D5' },
  chipText: { color: '#64728A', fontSize: 11, fontWeight: '700' },
  chipTextActive: { color: '#FFFFFF' },
  resultRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 21, marginBottom: 12 },
  result: { color: '#17233C', fontSize: 13, fontWeight: '800' },
  add: { color: '#3157D5', fontWeight: '900', fontSize: 12 }
});
