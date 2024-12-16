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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

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
          style={{ fontSize: 40,
            fontWeight: 'bold',
            color: colors.navy,
            textAlign: 'center',
          marginTop: -13}}
        >
          {pet.name}
        </Text>
        <Text style={cardStyle.content}>
          Fed: {formatDate(pet.fed_at)}
        </Text>
        <Text style={cardStyle.content}>
          By: {pet.fed_by || 'None'}
        </Text>
        <Text style={cardStyle.content}>
          Feed it every {pet.feed_every} h
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

