import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Screen from '../components/Screen';
import ItemCard from '../components/ItemCard';
import { useItems } from '../context/ItemsContext';
import { CATEGORIES } from '../data/sampleData';

function Stat({ label, value, tint, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.stat, { backgroundColor: tint }]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Pressable>
  );
}

export default function HomeScreen({ navigation }) {
  const { items, ready } = useItems();
  const lowItems = items.filter((item) => Number(item.quantity) <= 3);
  const totalQty = items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const recent = items.slice(0, 3);

  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>YOUR PERSONAL INVENTORY</Text>
        <Text style={styles.heroTitle}>Keep your stationery{'\n'}in one place.</Text>
        <Text style={styles.heroSub}>Organise, track and find your everyday essentials.</Text>
        <Pressable style={styles.heroButton} onPress={() => navigation.navigate('AddItem')}>
          <Text style={styles.heroButtonText}>＋  Add new item</Text>
        </Pressable>
      </View>

      <View style={styles.headingRow}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.live}>{ready ? '● Saved locally' : '● Loading...'}</Text>
      </View>
      <View style={styles.stats}>
        <Stat label="Different items" value={items.length} tint="#EAF0FF" onPress={() => navigation.navigate('AllItems')} />
        <Stat label="Total quantity" value={totalQty} tint="#E9F8F1" onPress={() => navigation.navigate('AllItems')} />
        <Stat label="Low stock" value={lowItems.length} tint="#FFF1E9" onPress={() => navigation.navigate('LowStock')} />
      </View>

      <View style={styles.headingRow}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <Pressable onPress={() => navigation.navigate('Categories')}><Text style={styles.link}>See all ›</Text></Pressable>
      </View>
      <View style={styles.categoryGrid}>
        {CATEGORIES.slice(0, 4).map((cat) => {
          const count = items.filter((i) => i.category === cat.name).length;
          return (
            <Pressable key={cat.name} style={styles.categoryCard} onPress={() => navigation.navigate('AllItems', { category: cat.name })}>
              <Text style={styles.categoryIcon}>{cat.icon}</Text>
              <Text style={styles.categoryName}>{cat.name}</Text>
              <Text style={styles.categoryCount}>{count} items</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.headingRow}>
        <Text style={styles.sectionTitle}>Recently added</Text>
        <Pressable onPress={() => navigation.navigate('AllItems')}><Text style={styles.link}>View all ›</Text></Pressable>
      </View>
      {recent.length ? recent.map((item) => (
        <ItemCard key={item.id} item={item} onPress={() => navigation.navigate('ItemDetails', { id: item.id })} />
      )) : <Text style={styles.empty}>No items yet. Add your first stationery item.</Text>}

      <Pressable style={styles.lowBanner} onPress={() => navigation.navigate('LowStock')}>
        <Text style={styles.lowBannerIcon}>⚠️</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.lowBannerTitle}>Check low stock</Text>
          <Text style={styles.lowBannerText}>{lowItems.length} item(s) need your attention</Text>
        </View>
        <Text style={styles.bannerArrow}>›</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: '#203D9A', borderRadius: 22, padding: 21, marginBottom: 22 },
  eyebrow: { color: '#BFCBFF', fontSize: 10, fontWeight: '800', letterSpacing: 1.3 },
  heroTitle: { color: '#FFFFFF', fontSize: 25, fontWeight: '900', lineHeight: 31, marginTop: 10 },
  heroSub: { color: '#D8E0FF', fontSize: 13, lineHeight: 19, marginTop: 8, maxWidth: 260 },
  heroButton: { backgroundColor: '#FFFFFF', alignSelf: 'flex-start', paddingHorizontal: 15, paddingVertical: 11, borderRadius: 11, marginTop: 17 },
  heroButtonText: { color: '#203D9A', fontWeight: '800', fontSize: 13 },
  headingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11, marginTop: 4 },
  sectionTitle: { color: '#17233C', fontSize: 17, fontWeight: '900' },
  live: { color: '#16845B', fontSize: 10, fontWeight: '700' },
  stats: { flexDirection: 'row', gap: 9, marginBottom: 22 },
  stat: { flex: 1, minHeight: 85, borderRadius: 15, padding: 12, justifyContent: 'center' },
  statValue: { color: '#17233C', fontSize: 23, fontWeight: '900' },
  statLabel: { color: '#64728A', fontSize: 10, marginTop: 4, fontWeight: '700' },
  link: { color: '#3157D5', fontSize: 12, fontWeight: '800' },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9, marginBottom: 21 },
  categoryCard: { width: '48%', backgroundColor: '#FFFFFF', borderRadius: 15, padding: 13, borderWidth: 1, borderColor: '#EDF0F5' },
  categoryIcon: { fontSize: 22 },
  categoryName: { color: '#17233C', fontWeight: '800', marginTop: 7, fontSize: 13 },
  categoryCount: { color: '#8792A5', fontSize: 11, marginTop: 3 },
  empty: { color: '#8792A5', padding: 18, backgroundColor: '#FFFFFF', borderRadius: 14 },
  lowBanner: { backgroundColor: '#FFF1E9', borderRadius: 15, padding: 14, flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  lowBannerIcon: { fontSize: 23, marginRight: 11 },
  lowBannerTitle: { color: '#8B472B', fontWeight: '900', fontSize: 13 },
  lowBannerText: { color: '#A66B50', fontSize: 11, marginTop: 3 },
  bannerArrow: { color: '#A66B50', fontSize: 26 }
});
