import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import Screen from '../components/Screen';
import PrimaryButton from '../components/PrimaryButton';
import { useItems } from '../context/ItemsContext';
import { CATEGORIES } from '../data/sampleData';

function Field({ label, value, onChangeText, placeholder, keyboardType = 'default', multiline = false }) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A0AABC"
        keyboardType={keyboardType}
        multiline={multiline}
        style={[styles.input, multiline && styles.multiline]}
      />
    </View>
  );
}

export default function AddItemScreen({ navigation, route }) {
  const editing = route.params?.item;
  const { addItem, updateItem } = useItems();
  const [name, setName] = useState(editing?.name || '');
  const [category, setCategory] = useState(editing?.category || 'Pens');
  const [quantity, setQuantity] = useState(editing ? String(editing.quantity) : '');
  const [price, setPrice] = useState(editing ? String(editing.price) : '');
  const [description, setDescription] = useState(editing?.description || '');

  useEffect(() => {
    navigation.setOptions({ title: editing ? 'Edit Item' : 'Add New Item' });
  }, [navigation, editing]);

  const save = () => {
    if (!name.trim() || quantity.trim() === '' || price.trim() === '') {
      Alert.alert('Required fields', 'Please enter item name, quantity and price.');
      return;
    }
    const qty = Number(quantity);
    const cost = Number(price);
    if (!Number.isInteger(qty) || qty < 0 || !Number.isFinite(cost) || cost < 0) {
      Alert.alert('Invalid values', 'Quantity must be a whole number (0 or more), and price must be 0 or more.');
      return;
    }
    const data = { id: editing?.id, name: name.trim(), category, quantity: qty, price: cost, description: description.trim() };
    if (editing) updateItem(data); else addItem(data);
    navigation.goBack();
  };

  return (
    <Screen>
      <View style={styles.note}><Text style={styles.noteText}>Add details about a stationery item. Your information is saved on this device.</Text></View>
      <Field label="ITEM NAME *" value={name} onChangeText={setName} placeholder="e.g. Black Gel Pen" />
      <Text style={styles.label}>CATEGORY *</Text>
      <View style={styles.categories}>
        {CATEGORIES.map((cat) => (
          <Pressable key={cat.name} onPress={() => setCategory(cat.name)} style={[styles.category, category === cat.name && styles.categoryActive]}>
            <Text style={styles.catIcon}>{cat.icon}</Text>
            <Text style={[styles.catText, category === cat.name && styles.catTextActive]}>{cat.name}</Text>
          </Pressable>
        ))}
      </View>
      <Field label="QUANTITY *" value={quantity} onChangeText={setQuantity} placeholder="e.g. 10" keyboardType="number-pad" />
      <Field label="PRICE (LKR) *" value={price} onChangeText={setPrice} placeholder="e.g. 150" keyboardType="decimal-pad" />
      <Field label="DESCRIPTION" value={description} onChangeText={setDescription} placeholder="Add a short description..." multiline />
      <PrimaryButton title={editing ? 'Save Changes' : 'Save Item'} onPress={save} />
      <PrimaryButton title="Cancel" secondary onPress={() => navigation.goBack()} />
      <Text style={styles.required}>* Required fields</Text>
    </Screen>
  );
}
const styles = StyleSheet.create({
  note: { backgroundColor: '#EAF0FF', borderRadius: 13, padding: 13, marginBottom: 18 },
  noteText: { color: '#35519E', fontSize: 12, lineHeight: 18 },
  fieldWrap: { marginBottom: 15 },
  label: { color: '#64728A', fontSize: 10, fontWeight: '900', letterSpacing: 1, marginBottom: 8 },
  input: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#E5EAF2', paddingHorizontal: 13, paddingVertical: 13, fontSize: 14, color: '#17233C' },
  multiline: { minHeight: 85, textAlignVertical: 'top' },
  categories: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 17 },
  category: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 9, borderRadius: 11, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5EAF2' },
  categoryActive: { backgroundColor: '#EAF0FF', borderColor: '#3157D5' },
  catIcon: { fontSize: 14, marginRight: 5 },
  catText: { color: '#64728A', fontSize: 11, fontWeight: '700' },
  catTextActive: { color: '#3157D5' },
  required: { color: '#9AA5B5', fontSize: 11, textAlign: 'center', marginTop: 12 }
});
