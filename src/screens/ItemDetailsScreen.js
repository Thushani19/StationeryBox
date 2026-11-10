import React, { useLayoutEffect } from 'react';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';
import PrimaryButton from '../components/PrimaryButton';
import { useItems } from '../context/ItemsContext';
import { CATEGORIES } from '../data/sampleData';
// import { Platform } from 'react-native';

function Detail({ label, value }) {
  return <View style={styles.detail}><Text style={styles.detailLabel}>{label}</Text><Text style={styles.detailValue}>{value}</Text></View>;
}

export default function ItemDetailsScreen({ navigation, route }) {
  const { items, deleteItem } = useItems();
  const item = items.find((entry) => entry.id === route.params?.id);
  useLayoutEffect(() => {
    navigation.setOptions({ title: item ? item.name : 'Item Details' });
  }, [navigation, item]);

  if (!item) {
    return <Screen><Text style={styles.missing}>This item may have been deleted.</Text><PrimaryButton title="Back to items" onPress={() => navigation.goBack()} /></Screen>;
  }
  const cat = CATEGORIES.find((c) => c.name === item.category);

  const performDelete = () => {
    deleteItem(item.id);
    navigation.goBack();
  };

  const confirmDelete = () => {
      if(Platform.OS === 'web'){
        const confirmed = window.confirm('Are you sure you want to delete "${item.name}"?');
        
        if(confirmed){
          performDelete();
        }
      }
      else{
          Alert.alert('Delete item?','Are you sure you want to delete "${item.name}"?',
            [
              { 
                  text: 'Cancel',
                  style: 'cancel' 
              },

              { 
                  text: 'Delete',
                  style: 'destructive',
                onPress: performDelete
              }
            ]
          );
      }
  };

  return (
    <Screen>
      <View style={styles.hero}>
        <View style={[styles.icon, { backgroundColor: cat?.color || '#EDF1F5' }]}><Text style={styles.emoji}>{cat?.icon || '📦'}</Text></View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
      <View style={styles.panel}>
        <Detail label="QUANTITY" value={`${item.quantity} item(s)`} />
        <Detail label="PRICE PER ITEM" value={`Rs. ${Number(item.price).toFixed(2)}`} />
        <Detail label="TOTAL VALUE" value={`Rs. ${(Number(item.quantity) * Number(item.price)).toFixed(2)}`} />
        <Detail label="STOCK STATUS" value={Number(item.quantity) <= 3 ? 'Low stock – needs attention' : 'Available in stock'} />
        <View style={styles.description}>
          <Text style={styles.detailLabel}>DESCRIPTION</Text>
          <Text style={styles.descriptionText}>{item.description || 'No description added.'}</Text>
        </View>
      </View>
      <PrimaryButton title="✎  Edit Item" onPress={() => navigation.navigate('AddItem', { item })} />
      <PrimaryButton title="Delete Item" danger secondary onPress={confirmDelete} />
    </Screen>
  );
}
const styles = StyleSheet.create({
  hero: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 19, padding: 24, borderWidth: 1, borderColor: '#EDF0F5' },
  icon: { width: 76, height: 76, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 37 },
  name: { color: '#17233C', fontSize: 21, fontWeight: '900', marginTop: 13 },
  category: { color: '#7B879A', fontSize: 13, marginTop: 4 },
  panel: { backgroundColor: '#FFFFFF', borderRadius: 18, paddingHorizontal: 16, marginTop: 14, borderWidth: 1, borderColor: '#EDF0F5' },
  detail: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F0F2F6' },
  detailLabel: { color: '#8792A5', fontSize: 10, fontWeight: '900', letterSpacing: 0.6 },
  detailValue: { color: '#17233C', fontSize: 13, fontWeight: '800', maxWidth: '58%', textAlign: 'right' },
  description: { paddingVertical: 16 },
  descriptionText: { color: '#536178', fontSize: 13, lineHeight: 20, marginTop: 8 },
  missing: { color: '#536178', textAlign: 'center', marginTop: 30 }
});
