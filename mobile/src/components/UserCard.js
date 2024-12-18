import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { cardStyle } from '../styles/cardStyle';
import { colors } from '../styles/style';

export default function UserCard({ user, onRemove }) {
  return (
    <View style={cardStyle.communityCard}>
      <View style={cardStyle.iconContainer}>
        <FontAwesomeIcon
          icon={faUser}
          size={80}
          style={{ color: colors.navy }}
        />
      </View>

      <View style={cardStyle.centerContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: colors.navy,
              flex: 1,
              marginRight: 10,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {user.first_name}
          </Text>

          <TouchableOpacity onPress={() => onRemove(user.email)}>
            <FontAwesomeIcon icon={faXmark} size={36} color={colors.navy} />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: colors.navy,
            marginTop: 5,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {user.last_name}
        </Text>
      </View>
    </View>
  );
}
