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

export default function CommunityCard({ community, onUpdate, onDelete, onPress }) {
  return (
    <TouchableOpacity style={cardStyle.card} onPress={onPress}>
      <View style={cardStyle.iconContainer}>
        <FontAwesomeIcon
          icon={communityIcon[community.type.toLowerCase()] || faTent}
          size={80}
          style={{ color: colors.navy }}
        />
      </View>

      <View style={cardStyle.contentContainer}>
        <Text
          style={[cardStyle.title, { textAlign: 'left' }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {community.name}
        </Text>
        <Text style={cardStyle.content}  numberOfLines={1}
          ellipsizeMode="tail">
          Members: {community.users.map(user => user.first_name).join(', ') || 'None'}
        </Text>
        <Text style={cardStyle.content} numberOfLines={1}
          ellipsizeMode="tail">
          Pets: {community.pets.map(pet => pet.name).join(', ') || 'None'}
        </Text>
      </View>

      <View style={cardStyle.iconActionsContainer}>
        <TouchableOpacity onPress={() => onUpdate(community)} style={{marginBottom: 40}}>
          <FontAwesomeIcon icon={faPen} size={36} color={colors.offWhite} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(community.id)}>
          <FontAwesomeIcon icon={faTrash} size={36} color={colors.offWhite} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

