import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBuilding, faHouse, faTent, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { cardStyle } from '../styles/cardStyle';
import { colors } from '../styles/style';

const communityIcon = {
  home: faHouse,
  work: faBuilding,
  other: faTent,
};

export default function CommunityCard({ community }) {

  return (
    <View style={cardStyle.card}>

      <View style={cardStyle.iconContainer}>
        <FontAwesomeIcon
          icon={communityIcon[community.type] || faTent}
          size={80}
          style={{color: colors.navy}}
        />
      </View>

      <View style={cardStyle.contentContainer}>
        <View style={cardStyle.header}>
          <Text style={cardStyle.title} numberOfLines={1} ellipsizeMode='tail'>{community.name}</Text>
          <View style={cardStyle.actions}>
            <TouchableOpacity onPress={() => onUpdate(community.id)}>
              <FontAwesomeIcon icon={faPen} size={24} style={cardStyle.actionIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(community.id)}>
              <FontAwesomeIcon icon={faTrash} size={24} style={cardStyle.actionIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={cardStyle.contentRow}>
          <Text style={cardStyle.content}>Members: {community.users.map(user => user.first_name).join(', ')}</Text>
          <Text style={cardStyle.content}>Pets: {community.pets.map(pet => pet.name).join(', ')}</Text>
        </View>
      </View>
    </View>
  );
}
