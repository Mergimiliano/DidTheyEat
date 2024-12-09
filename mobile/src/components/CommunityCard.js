import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, style } from '../styles/style';

export default function CommunityCard({ community }) {

  return (
    <View style={styles.card}>
      <Text style={style.subtitle}>{community.name}</Text>
      {community.users.map(user => (
        <Text key={user.id} style={style.subtitle}>{user.first_name}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 10,
    borderWidth: 1.5,
    borderRadius: 10,
    height:150,
    borderColor: colors.navy,
    backgroundColor: colors.yellow,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
