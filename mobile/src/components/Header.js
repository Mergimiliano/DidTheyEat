import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../styles/style';

export default function Header({ navigation, route }) {
  const community = route.params?.community;

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesomeIcon icon={faArrowLeft} size={20} color={colors.offWhite} />
      </TouchableOpacity>
      <Text style={styles.title}>
        {community?.name || 'Community Details'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.navy,
    padding: 16,
    height: 60,
  },
  backButton: {
    marginRight: 12,
  },
  title: {
    color: colors.offWhite,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
