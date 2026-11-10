import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import Screen from '../components/Screen';
import ItemCard from '../components/ItemCard';
import EmptyState from '../components/EmptyState';
import { useItems } from '../context/ItemsContext';

export default function LowStockScreen({ navigation }) {
  const { items } = useItems();
  const [query, setQuery] = useState('');
  const lowItems = useMemo(() => items.filter((item) => Number(item.quantity) <= 3 && item.name.toLowerCase().includes(query.trim().toLowerCase())), [items, query]);
  return (
    <Screen>
      <Text style={styles.intro}>Items with 3 or fewer units are shown here. Add stock or update their quantities when needed.</Text>
      <TextInput value={query} onChangeText={setQuery} placeholder="🔍  Search low-stock items..." placeholderTextColor="#9AA5B5" style={styles.search} />
      <Text style={styles.count}>{lowItems.length} low-stock item(s)</Text>
      {lowItems.length ? lowItems.map((item) => (
        <ItemCard key={item.id} item={item} onPress={() => navigation.navigate('ItemDetails', { id: item.id })} />
      )) : <EmptyState title="All stocked up!" message="No low-stock items match your search." />}
    </Screen>
  );
}
const styles = StyleSheet.create({
  intro: { color: '#748198', fontSize: 13, lineHeight: 19, marginBottom: 14 },
  search: { backgroundColor: '#FFFFFF', borderRadius: 13, borderWidth: 1, borderColor: '#E7EBF2', paddingHorizontal: 14, paddingVertical: 13, color: '#17233C', fontSize: 14 },
  count: { color: '#17233C', fontSize: 13, fontWeight: '900', marginTop: 19, marginBottom: 12 }
});
