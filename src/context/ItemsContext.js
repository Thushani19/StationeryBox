import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SAMPLE_ITEMS } from '../data/sampleData';

const STORAGE_KEY = '@stationerybox/items';
const ItemsContext = createContext(null);

export function ItemsProvider({ children }) {
  const [items, setItems] = useState(SAMPLE_ITEMS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && mounted) setItems(parsed);
        }
      } catch (error) {
        console.warn('Could not load saved stationery items:', error);
      } finally {
        if (mounted) setReady(true);
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (ready) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items)).catch((error) => {
        console.warn('Could not save stationery items:', error);
      });
    }
  }, [items, ready]);

  const addItem = (item) => setItems((current) => [{ ...item, id: `item-${Date.now()}` }, ...current]);
  const updateItem = (updated) => setItems((current) => current.map((item) => item.id === updated.id ? updated : item));
  const deleteItem = (id) => setItems((current) => current.filter((item) => item.id !== id));

  const value = useMemo(() => ({ items, ready, addItem, updateItem, deleteItem }), [items, ready]);
  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>;
}

export function useItems() {
  const context = useContext(ItemsContext);
  if (!context) throw new Error('useItems must be used inside ItemsProvider');
  return context;
}
