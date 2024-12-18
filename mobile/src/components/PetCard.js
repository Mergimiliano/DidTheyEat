import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCat, faCrow, faDog, faDragon, faFish, faWorm, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { cardStyle } from '../styles/cardStyle';
import { colors } from '../styles/style';

const petIcon = {
  dog: faDog,
  cat: faCat,
  fish: faFish,
  bird: faCrow,
  reptile: faWorm,
  other: faDragon,
};

export default function PetCard({ pet, onUpdate, onDelete, onPress }) {
  const [modalVisible, setModalVisible] = useState(false);

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

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const cardBackgroundColor = pet.fed ? colors.green : colors.red;

  return (
    <>
      <TouchableOpacity style={[cardStyle.petCard, { backgroundColor: cardBackgroundColor }]} onPress={onPress}>
        <View>
          <View style={cardStyle.iconContainer}>
            <FontAwesomeIcon
              icon={petIcon[pet.type.toLowerCase()] || faDragon}
              size={80}
              style={{ color: colors.navy }}
            />
          </View>
          <View style={cardStyle.subContentContainer}>
            <Text style={cardStyle.subContent} numberOfLines={1} ellipsizeMode="tail">
                Every {pet.feed_every} h
            </Text>
          </View>
        </View>

        <View style={cardStyle.centerContainer}>
          <View style={cardStyle.titleContainer}>
            <Text
              style={{
                fontSize: 40,
                fontWeight: 'bold',
                color: colors.navy,
                textAlign: 'center',
                marginTop: -13,
                flexShrink: 1,
              }}
            numberOfLines={1}
            ellipsizeMode="tail"
            >
              {pet.name}
            </Text>
            <TouchableOpacity onPress={openModal} style={cardStyle.options}>
              <FontAwesomeIcon icon={faEllipsisV} size={36} color={colors.navy} />
            </TouchableOpacity>
          </View>
          <Text style={cardStyle.content}>Fed: {formatDate(pet.fed_at)}</Text>
          <Text style={cardStyle.content} numberOfLines={1} ellipsizeMode="tail">
            By: {pet.fed_by || 'None'}
          </Text>
        </View>
      </TouchableOpacity>

      <Modal transparent visible={modalVisible} animationType="fade" onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={cardStyle.overlay} />
        </TouchableWithoutFeedback>

        <View style={cardStyle.menuContainer}>
          <TouchableOpacity
            style={cardStyle.menuItem}
            onPress={() => {
              closeModal();
              onUpdate(pet);
            }}
          >
            <Text style={cardStyle.menuText}>Modify</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={cardStyle.menuItem}
            onPress={() => {
              closeModal();
              onDelete(pet.id);
            }}
          >
            <Text style={[cardStyle.menuText, cardStyle.deleteText]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}