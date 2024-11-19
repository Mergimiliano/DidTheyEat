import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import CommunityCard from '../components/CommunityCard';
import axiosInstance from '../utils/axiosInstance';

export default function Communities() {
  const [communities, setCommunities] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <View style={{ flex: 1 }}>
      {error ? (
        <Text>{error}</Text>
      ) : communities.length > 0 ? (
        <FlatList
          data={communities}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <CommunityCard community={item} />}
        />
      ) : (
        <Text>Loading or no communities found</Text>
      )}
    </View>
  );
}
