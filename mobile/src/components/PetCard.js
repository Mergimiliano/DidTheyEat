import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash, faPen, faCat, faCrow, faDog, faDragon, faFish, faWorm } from '@fortawesome/free-solid-svg-icons';
import { cardStyle } from '../styles/cardStyle';
import { colors } from '../styles/style';

const petIcon = {
    dog: faDog,
    cat: faCat,
    fish: faFish,
    bird: faCrow,
    reptile: faWorm,
    other: faDragon,
  }

export default function PetCard({ pet, onUpdate, onDelete, onPress }) {
  return (
    <TouchableOpacity style={cardStyle.card} onPress={onPress}>
      <View style={cardStyle.iconContainer}>
        <FontAwesomeIcon
          icon={petIcon[pet.type.toLowerCase()] || faDragon}
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
          {pet.name}
        </Text>
        <Text style={cardStyle.content}>
          Fed at: {pet.fed_at || ''}
        </Text>
        <Text style={cardStyle.content}>
          Fed by: {pet.fed_by || 'None'}
        </Text>
      </View>

      <View style={cardStyle.iconActionsContainer}>
        <TouchableOpacity onPress={() => onUpdate(pet)} style={{marginBottom: 40}}>
          <FontAwesomeIcon icon={faPen} size={36} color={colors.offWhite} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(pet.id)}>
          <FontAwesomeIcon icon={faTrash} size={36} color={colors.offWhite} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

