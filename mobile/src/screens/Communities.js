import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import CommunityCard from '../components/CommunityCard';
import axiosInstance from '../utils/axiosInstance';
import { colors, style } from '../styles/style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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

  const handleCreateCommunity = () => {
    console.log('Test');
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
          data={filteredCommunities}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <CommunityCard community={item} />}
        />
      ) : (
        <Text>Loading or no communities found</Text>
      )}

      <TouchableOpacity
        style={style.createButton}
        onPress={handleCreateCommunity}
      >
        <Text style={style.createButtonText}>Create New Community</Text>
      </TouchableOpacity>
    </View>
  );
}