import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBuilding, faHouse, faTent, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { cardStyle } from '../styles/cardStyle';
import { colors } from '../styles/style';

const communityIcon = {
  home: faHouse,
  work: faBuilding,
  other: faTent,
};

export default function CommunityCard({ community, onUpdate, onDelete, onPress }) {
  const [modalVisible, setModalVisible] = useState(false);

const openModal = () => setModalVisible(true);
const closeModal = () => setModalVisible(false);

  return (
    <>
    <TouchableOpacity style={cardStyle.communityCard} onPress={onPress}>
      <View style={cardStyle.iconContainer}>
        <FontAwesomeIcon
          icon={communityIcon[community.type.toLowerCase()] || faTent}
          size={80}
          style={{ color: colors.navy }}
        />
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
            {community.name}
          </Text>
          <TouchableOpacity onPress={openModal} style={cardStyle.options}>
              <FontAwesomeIcon icon={faEllipsisV} size={36} color={colors.navy} />
            </TouchableOpacity>
          </View>
          <Text style={cardStyle.content}  numberOfLines={1}
            ellipsizeMode="tail">
            Members: {community.users.map(user => user.first_name).join(', ') || 'None'}
          </Text>
          <Text style={cardStyle.content} numberOfLines={1}
            ellipsizeMode="tail">
            Pets: {community.pets.map(pet => pet.name).join(', ') || 'None'}
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
            onUpdate(community);
          }}
        >
          <Text style={cardStyle.menuText}>Modify</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={cardStyle.menuItem}
          onPress={() => {
            closeModal();
            onDelete(community.id);
          }}
        >
          <Text style={[cardStyle.menuText, cardStyle.deleteText]}>Delete</Text>
        </TouchableOpacity>
      </View>
      </Modal>
    </>
  );
}

