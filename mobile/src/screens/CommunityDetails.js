import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import { colors } from '../styles/style';
import { createPet, getPets, updatePet } from '../services/petService';
import { faCat, faCrow, faDog, faDragon, faFish, faWorm, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { style, cardStyle } from '../styles/style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import PetCard from '../components/PetCard';
import BottomSheet from '@devvie/bottom-sheet';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker';
import Button from '../components/Button';

const petIcon = {
  dog: faDog,
  cat: faCat,
  fish: faFish,
  bird: faCrow,
  reptile: faWorm,
  other: faDragon,
}

const CreatePetCard = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
        <FontAwesomeIcon icon={faPlus} size={80} style={{color: colors.navy}} />
      <Text style={style.subtitle}>Create new</Text>
    </TouchableOpacity>
  );
};

export default function CommunityDetails({ route }) {
  const { community } = route.params;
  const [activeTab, setActiveTab] = useState('Pets');
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const bottomSheetRef = useRef();
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('other');
  const [petFeedEvery,setPetFeedEvery] = useState('8');
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

    const onRefresh = () => {
      setRefreshing(true);
      getPets(community.id)
        .then(data => {
          setPets(data);
          setRefreshing(false);
        })
        .catch(err => {
          console.error('Error refreshing pets:', err);
          setError('Failed to refresh pets');
          setRefreshing(false);
        });
    };

    const filteredPets = pets.filter(pet =>
      pet.name.toLowerCase().includes(search.toLowerCase()));
  
    const data = [
      ...filteredPets,
      { id: 'create' },
    ];

    const handleOpenEditBottomSheet = (pet) => {
      setMode('update');
      setCurrentPet(pet);
      setPetName(pet.name);
      setPetType(pet.type);
      setPetFeedEvery(pet.feedEvery),
      bottomSheetRef.current?.open();
    };
  
    const handleSubmit = () => {
      const newPet = {
        name: petName,
        type: petType,
        feed_every: petFeedEvery,
      };
  
      if (mode === 'create') {
        createPet(newPet)
          .then(() => {
            onRefresh();
            bottomSheetRef.current?.close();
          })
          .catch(err => {
            console.error('Error creating pet:', err);
            Alert.alert('Error', 'Failed to create pet');
          });
      } else if (mode === 'update' && currentPet) {
        updatePet(currentPet.id, newPet)
          .then(() => {
            onRefresh();
            bottomSheetRef.current?.close();
          })
          .catch(err => {
            console.error('Error updating pet:', err);
            Alert.alert('Error', 'Failed to update pet');
          });
      }
    };
  
    const handleDelete = (id) => {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this pet?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              deletePet(id)
                .then(() => {
                  onRefresh();
                })
                .catch(err => {
                  console.error('Error deleting pet:', err);
                  Alert.alert('Error', 'Failed to delete the pet');
                });
            },
          },
        ]
      );
    };

    const handlePress = () => {
      console.log('test')
    }
  
    const renderItem = useCallback(({ item }) => {
      if (item.id === 'create') {
        return <CreatePetCard onPress={() => {
          setMode('create');
          setPetName('');
          setPetType('other');
          setPetFeedEvery('8');
          bottomSheetRef.current?.open();
        }} />;
      }
      return (
        <PetCard
          pet={item}
          onPress={handlePress}
          onUpdate={handleOpenEditBottomSheet}
          onDelete={handleDelete}
        />
      );
    }, []);  

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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.yellow} />
      </View>
      ) : pets.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
          />
      ) : (
        <Text></Text>
      )}

    <BottomSheet
      ref={bottomSheetRef}
      height={hp('60%')}
      closeOnDragDown
      closeOnPressMask
      style={style.bottomSheet}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={style.subtitle}>
          Pet Name:
        </Text>
        <View style={style.formContainer}>
          <TextInput
            value={petName}
            onChangeText={setPetName}
            style={style.formText}
          />
        </View>

        <Text style={style.subtitle}>
          Type:
        </Text>
        <View style={style.formContainer}>
          <Picker
            selectedValue={petType}
            onValueChange={(itemValue) => setPetType(itemValue)}
            style={{
              flex: 1,
              color: colors.navy,
              width: '100%',
              height: '100%'
            }}
            dropdownIconColor={colors.navy}
          >
            <Picker.Item label="Other" value="other" />
            <Picker.Item label="Dog" value="dog" />
            <Picker.Item label="Cat" value="cat" />
            <Picker.Item label="Fish" value="fish" />
            <Picker.Item label="Bird" value="bird" />
            <Picker.Item label="Reptile" value="reptile" />
          </Picker>
          </View>
          <View style={ { marginBottom: 10 }}>
            <FontAwesomeIcon
              icon={petIcon[petType.toLowerCase()] || faDragon}
              size={80}
              style={{color: colors.navy}}
            />
          </View>
          <Button
            title={mode === 'create' ? 'Create' : 'Update'}
            onPress={handleSubmit}
            color={colors.green}
            disabled={!petName.trim()}
          />
      </View>
    </BottomSheet>

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
