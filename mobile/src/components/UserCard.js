import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { cardStyle } from '../styles/cardStyle';
import { colors } from '../styles/style';

export default function UserCard({ user, handleRemoveUser }) {
  return (
    <View style={cardStyle.card}>
      <View style={cardStyle.iconContainer}>
        <FontAwesomeIcon
          icon={faUser}
          size={80}
          style={{ color: colors.navy }}
        />
      </View>

      <View style={cardStyle.contentContainer}>
        <Text
          style={{ textAlign: 'center',     fontSize: 40,
            fontWeight: 'bold',
            color: colors.navy }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {user.first_name}
        </Text>
        <Text
          style={{ textAlign: 'center',     fontSize: 40,
            fontWeight: 'bold',
            color: colors.navy }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {user.last_name}
        </Text>
      </View>

      <View>
        <TouchableOpacity onPress={() => handleRemoveUser(user)} style={{marginBottom: 40}}>
          <FontAwesomeIcon icon={faXmark} size={60} color={colors.offWhite} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

