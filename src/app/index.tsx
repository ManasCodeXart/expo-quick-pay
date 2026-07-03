import { useState } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import QuickPayCard from '../components/QuickPayCard';
import type { Contact } from '../constants/types';

const DEMO_CONTACTS: Contact[] = [
  { id: '1', avatar: require('../../assets/images/manas2.png'), handle: '@ProyaX' },
  { id: '2', avatar: require('../../assets/images/billy.png'), handle: '@RahultDev' },
  { id: '3', avatar: require('../../assets/images/boy.png'), handle: '@ManasCodeX' },
  { id: '4', avatar: require('../../assets/images/girl2.png'), handle: '@Arjunp' },
  { id: '5', avatar: require('../../assets/images/madara.png'), handle: '@Snehax' },
  { id: '6', avatar: require('../../assets/images/solara.png'), handle: '@rayueik' },
  { id: '7', avatar: require('../../assets/images/dheeraj.png'), handle: '@mahivhy' },
  { id: '8', avatar: require('../../assets/images/girl3.png'), handle: '@vivi_14x' },
  { id: '9', avatar: require('../../assets/images/avatar.png'), handle: '@morniSay' },
];

export default function Index() {
  const [cardVisible, setCardVisible] = useState(false);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.screenTitle}>Quick Pay</Text>

      <TouchableOpacity
        style={styles.triggerBtn}
        activeOpacity={0.8}
        onPress={() => setCardVisible(true)}
      >
        <Text style={styles.triggerText}>Send Money</Text>
      </TouchableOpacity>

      <QuickPayCard
        visible={cardVisible}
        onClose={() => setCardVisible(false)}
        contacts={DEMO_CONTACTS}
        onConfirm={async (amount, contact) => {
          await new Promise((resolve) => setTimeout(resolve, 2500));
          console.log(`Sent $${amount} to ${contact.handle}`);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  screenTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  triggerBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 50,
  },
  triggerText: {
    color: '#111',
    fontSize: 16,
    fontWeight: '600',
  },
});