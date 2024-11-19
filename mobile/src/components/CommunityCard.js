import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CommunityCard({ community }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{community.name}</Text>
      {/* Add more details as needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
