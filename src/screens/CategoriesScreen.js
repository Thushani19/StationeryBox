import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';
import { CATEGORIES } from '../data/sampleData';
import { useItems } from '../context/ItemsContext';

export default function CategoriesScreen({ navigation }) {
  const { items } = useItems();
  return (
    <Screen>
      <Text style={styles.intro}>Browse your collection by stationery type.</Text>
      {CATEGORIES.map((cat) => {
        const count = items.filter((item) => item.category === cat.name).length;
        const quantity = items.filter((item) => item.category === cat.name).reduce((sum, item) => sum + Number(item.quantity || 0), 0);
        return (
          <Pressable key={cat.name} style={styles.card} onPress={() => navigation.navigate('AllItems', { category: cat.name })}>
            <View style={[styles.icon, { backgroundColor: cat.color }]}><Text style={styles.emoji}>{cat.icon}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{cat.name}</Text>
              <Text style={styles.sub}>{count} different item(s) · {quantity} total quantity</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        );
      })}
    </Screen>
  );
}
const styles = StyleSheet.create({
  intro: { color: '#748198', fontSize: 13, marginBottom: 15 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#EDF0F5' },
  icon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  emoji: { fontSize: 23 },
  name: { color: '#17233C', fontSize: 14, fontWeight: '900' },
  sub: { color: '#8792A5', fontSize: 11, marginTop: 5 },
  arrow: { color: '#A0AABC', fontSize: 25 }
});
