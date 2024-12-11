import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBuilding, faHouse, faTent, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../styles/style';

const communityIcon = {
  home: faHouse,
  work: faBuilding,
  other: faTent,
};

export default function CommunityCard({ community }) {

  return (
    <View style={styles.card}>

      <View style={styles.iconContainer}>
        <FontAwesomeIcon
          icon={communityIcon[community.type] || faTent}
          size={80} // Slightly smaller icon to match the container
          style={{color: colors.navy}}
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{community.name}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => onUpdate(community.id)}>
              <FontAwesomeIcon icon={faPen} size={24} style={styles.actionIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(community.id)}>
              <FontAwesomeIcon icon={faTrash} size={24} style={styles.actionIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentRow}>
          <Text style={styles.content}>Members: {community.users.map(user => user.first_name).join(', ')}</Text>
          <Text style={styles.content}>Pets: {community.pets.map(pet => pet.name).join(', ')}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 150,
    flexDirection: 'row',
    padding: 15,
    margin: 10,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: colors.navy,
    backgroundColor: colors.yellow,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.navy,
    borderRadius: 10,
    padding: 15,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'satoshi',
    color: colors.navy,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginLeft: 15,
    color: colors.offWhite,
  },
  contentRow: {
    marginTop: 5,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  content: {
    fontSize: 16,
    color: colors.navy,
    fontWeight: 600,
    marginRight: 10,
  },
});
