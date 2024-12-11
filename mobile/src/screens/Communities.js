import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import CommunityCard from '../components/CommunityCard';
import axiosInstance from '../utils/axiosInstance';
import { colors, style } from '../styles/style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { cardStyle } from '../styles/cardStyle';

const CreateCommunityCard = ({ onPress }) => {
  return (
    <TouchableOpacity style={cardStyle.cardCreate} onPress={onPress}>
        <FontAwesomeIcon icon={faPlus} size={80} style={{color: colors.navy}} />
      <Text style={style.subtitle}>Create new</Text>
    </TouchableOpacity>
  );
};

export default function Communities() {
  const [communities, setCommunities] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axiosInstance.get('/communities/')
      .then(response => {
        setCommunities(response.data);
      })
      .catch(err => {
        console.error('Error fetching communities:', err);
        setError('Failed to fetch communities');
      });
  }, []);

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(search.toLowerCase()));

  const data = [
    ...filteredCommunities,
    { id: 'create' },
  ];

  const handleCreateCommunity = () => {
    console.log('Test');
  };

  const renderItem = ({ item }) => {
    if (item.id === 'create') {
      return <CreateCommunityCard onPress={handleCreateCommunity} />;
    }
    return <CommunityCard community={item} />;
  };

  return (
    <View style={{ flex: 1}}>
      <View style={style.searchBar}>
        <FontAwesomeIcon icon={faSearch} size={16} color={colors.offWhite} />
           <TextInput
            placeholderTextColor={colors.offWhite}
            style={style.searchText}
            placeholder='Search'
            value={search}
            onChangeText={setSearch}
          />
        </View>

      {error ? (
        <Text>{error}</Text>
      ) : communities.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem} />
      ) : (
        <Text>Loading or no communities found</Text>
      )}

    </View>

  );
}