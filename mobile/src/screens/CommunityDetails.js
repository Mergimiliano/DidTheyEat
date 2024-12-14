import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CommunityDetails({ route }) {
  const { community } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{community.name}</Text>
      <Text style={styles.type}>Type: {community.type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  type: { fontSize: 18, color: 'gray' },
});
