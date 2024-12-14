import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/style';
import { getPets } from '../services/petService';

export default function CommunityDetails({ route }) {
  const { community } = route.params;
  const [activeTab, setActiveTab] = useState('Pets');
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const bottomSheetRef = useRef();
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('other');
  const [refreshing, setRefreshing] = useState(false);
  const [mode, setMode] = useState('create');
  const [currentPet, setCurrentPet] = useState(null);

  useEffect(() => {
    getPets(community.id)
      .then(data => setPets(data))
      .catch(err => {
        console.error('Error fetching pets:', err);
        setError('Failed to fetch pets');
      });
    }, []);

  return (
    <View style={styles.container}>

      <View style={styles.topBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Pets' && styles.activeTab]}
          onPress={() => setActiveTab('Pets')}
        >
          <Text style={[styles.tabText, activeTab === 'Pets' && styles.activeTabText]}>Pets</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Users' && styles.activeTab]}
          onPress={() => setActiveTab('Users')}
        >
          <Text style={[styles.tabText, activeTab === 'Users' && styles.activeTabText]}>Users</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {activeTab === 'Pets' ? (
          community.pets.length > 0 ? (
            community.pets.map((pet, index) => (
              <Text key={index} style={styles.item}>
                {pet.name}
              </Text>
            ))
          ) : (
            <Text style={styles.placeholder}>No pets in this community.</Text>
          )
        ) : (
          community.users.length > 0 ? (
            community.users.map((user, index) => (
              <Text key={index} style={styles.item}>
                {user.first_name} {user.last_name}
              </Text>
            ))
          ) : (
            <Text style={styles.placeholder}>No users in this community.</Text>
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
  
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  type: {
    fontSize: 18,
    color: 'gray',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.yellow,
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: colors.navy,
  },
  tabText: {
    fontSize: 16,
    color: 'gray',
  },
  activeTabText: {
    color: colors.navy,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  item: {
    fontSize: 16,
    marginVertical: 5,
    color: 'black',
  },
  placeholder: {
    fontSize: 16,
    color: 'gray',
    fontStyle: 'italic',
  },
});
