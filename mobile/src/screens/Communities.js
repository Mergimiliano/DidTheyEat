import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import CommunityCard from '../components/CommunityCard';
import axiosInstance from '../utils/axiosInstance';
import { colors, style } from '../styles/style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faSortAlphaDown, faSortAlphaUp, faClock } from '@fortawesome/free-solid-svg-icons';

export default function Communities() {
  const [communities, setCommunities] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('recent');

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
    community.name.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => {
    if (sort === 'alphabetic') {
      return a.name.localeCompare(b.name);
    } else if (sort === 'recent') {
      return new Date(b.created_at) - new Date(a.created_at);
    }
    return 0;
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={style.topBar}>
        <Text style={style.textTitle}>Your Communities</Text>
          <View style={style.filters}>
            <View style={style.searchBar}>
              <FontAwesomeIcon icon={faSearch} size={16} color='gray' />
              <TextInput
                style={style.textForm}
                placeholder='Search'
                value={search}
                onChangeText={setSearch}
              />
          
          </View>
      </View>
    </View>

      {error ? (
        <Text>{error}</Text>
      ) : communities.length > 0 ? (
        <FlatList
        data={filteredCommunities}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <CommunityCard community={item} />}
        contentContainerStyle={{ paddingTop: 10 }}
        />
      ) : (
        <Text>Loading or no communities found</Text>
      )}
    </View>
  );
}
