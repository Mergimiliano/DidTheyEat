import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  ActivityIndicator,
  Modal
} from 'react-native';
import { colors } from '../styles/style';
import { createPet, updatePet, deletePet, feedPet } from '../services/petService';
import { faCat, faCrow, faDog, faDragon, faFish, faWorm, faPlus, faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { style } from '../styles/style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import PetCard from '../components/PetCard';
import TopBar from '../components/TopBar';
import BottomSheet from '@devvie/bottom-sheet';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker';
import Button from '../components/Button';
import { getCommunity, inviteUser, removeUser } from '../services/communityService';
import UserCard from '../components/UserCard';
import { cardStyle } from '../styles/cardStyle';

const petIcon = {
  dog: faDog,
  cat: faCat,
  fish: faFish,
  bird: faCrow,
  reptile: faWorm,
  other: faDragon,
};

const CreatePetCard = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={cardStyle.cardCreate}>
    <FontAwesomeIcon icon={faPlus} size={80} style={{ color: colors.navy }} />
    <Text style={style.subtitle}>Create new</Text>
  </TouchableOpacity>
);

const AddUserCard = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={cardStyle.cardCreate}>
    <FontAwesomeIcon icon={faUserPlus} size={80} style={{ color: colors.navy, marginLeft:24}} />
    <Text style={style.subtitle}>Invite</Text>
  </TouchableOpacity>
);

export default function CommunityDetails({ route }) {
  const { communityId } = route.params;
  const [community, setCommunity] = useState(null);
  const [activeTab, setActiveTab] = useState('Pets');
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const bottomSheetRef = useRef();
  const [mode, setMode] = useState('create');
  const [currentPet, setCurrentPet] = useState(null);
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('other');
  const [petFeedEvery, setPetFeedEvery] = useState('8');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchCommunityDetails();
  }, []);

  const fetchCommunityDetails = () => {
    setRefreshing(true);
    getCommunity(communityId)
      .then((data) => {
        setCommunity(data);
        setRefreshing(false);
      })
      .catch((err) => {
        console.error('Error fetching community details:', err);
        Alert.alert('Error', 'Failed to load community details');
        setRefreshing(false);
      });
  };

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    setSearch('');
  };

  const handleOpenEditBottomSheet = (pet) => {
    setMode('update');
    setCurrentPet(pet);
    setPetName(pet.name);
    setPetType(pet.type);
    setPetFeedEvery(pet.feedEvery);
    bottomSheetRef.current?.open();
  };

  const handleSubmit = () => {
    const newPet = {
      name: petName,
      type: petType,
      feed_every: petFeedEvery,
    };

    if (mode === 'create') {
      createPet(communityId, newPet)
        .then(() => {
          fetchCommunityDetails();
          bottomSheetRef.current?.close();
        })
        .catch((err) => {
          console.error('Error creating pet:', err);
          Alert.alert('Error', 'Failed to create pet');
        });
    } else if (mode === 'update' && currentPet) {
      updatePet(currentPet.id, newPet)
        .then(() => {
          fetchCommunityDetails();
          bottomSheetRef.current?.close();
        })
        .catch((err) => {
          console.error('Error updating pet:', err);
          Alert.alert('Error', 'Failed to update pet');
        });
    }
  };

  const handleDelete = (id) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this pet?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deletePet(id)
            .then(() => {
              fetchCommunityDetails();
            })
            .catch((err) => {
              console.error('Error deleting pet:', err);
              Alert.alert('Error', 'Failed to delete the pet');
            });
        },
      },
    ]);
  };

  const handleRemoveUser = (email) => {
    Alert.alert(
      'Confirm Remove',
      `Are you sure you want to remove ${email}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            removeUser(communityId, email)
              .then(() => {
                fetchCommunityDetails();
              })
              .catch((err) => {
                console.error('Error removing user:', err);
                Alert.alert('Error', 'Failed to remove user');
              });
          },
        },
      ]
    );
  };

  const handleInviteUser = (email) => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    inviteUser(communityId, email)
      .then(() => {
        fetchCommunityDetails();
        setIsModalVisible(false);
        setEmail('');
      })
      .catch((err) => {
        console.error('Error inviting user:', err);
        Alert.alert('Error', 'Failed to invite user');
      });
  };

  const handleFeedPet = (petId) => {
    feedPet(petId)
    .then(() => {
      fetchCommunityDetails();
    })
    .catch((err) => {
      console.error('Error feeding the pet:', err);
      Alert.alert('Error', 'Failed to feed the pet');
    });
  };

  const filteredPets = community?.pets?.filter((pet) =>
    pet.name?.toLowerCase().includes(search.toLowerCase()) || false
  ) || [];

  const filteredUsers = community?.users?.filter((user) =>
    user.first_name?.toLowerCase().includes(search.toLowerCase()) || false
  ) || [];

  const petsData = [
    ...filteredPets,
    { id: 'create' },
  ];

  const usersData = [
    ...filteredUsers,
    { id: 'create' },
  ];

  const renderPet =  ({ item }) => {
    if (item.id === 'create') {
      return (
        <CreatePetCard
          onPress={() => {
            setMode('create');
            setPetName('');
            setPetType('other');
            bottomSheetRef.current?.open();
          }}
        />
      );
    }
    return (
      <PetCard
        pet={item}
        onPress={() => handleFeedPet(item.id)}
        onUpdate={handleOpenEditBottomSheet}
        onDelete={handleDelete}
      />
    );
  };

  const renderUser =  ({ item }) => {
    if (item.id === 'create') {
      return (
        <AddUserCard
        onPress={() => setIsModalVisible(true)}
        />
      );
    }
    return (
      <UserCard
        user={item}
        onRemove={handleRemoveUser}
      />
    );
  };


  return (
    <View style={{ flex: 1 }}>
      <TopBar
        tabs={['Pets', 'Users']}
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />

      <View style={style.searchBar}>
        <FontAwesomeIcon icon={faSearch} size={16} color={colors.offWhite} />
        <TextInput
          placeholderTextColor={colors.offWhite}
          style={style.searchText}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {refreshing ? (
        <ActivityIndicator size="large" color={colors.yellow} />
      ) : activeTab === 'Pets' ? (
        <>
          <FlatList
            data={petsData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPet}
            refreshing={refreshing}
            onRefresh={fetchCommunityDetails}
          />
        </>
      ) : (
        <FlatList
          data={usersData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUser}
          refreshing={refreshing}
          onRefresh={fetchCommunityDetails}
        />
      )}

      <BottomSheet
      ref={bottomSheetRef}
      height={hp('63%')}
      closeOnDragDown
      closeOnPressMask
      style={style.bottomSheet}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={style.subtitle}>Pet Name:</Text>
          <View style={style.formContainer}>
            <TextInput
              value={petName}
              onChangeText={setPetName}
              style={style.formText}
            />
          </View>
          <Text style={style.subtitle}>Type:</Text>
          <View style={style.formContainer}>
            <Picker
              selectedValue={petType}
              onValueChange={(itemValue) => setPetType(itemValue)}
              style={{
                flex: 1,
                color: colors.navy,
                width: '100%',
                height: '100%',
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

          <Text style={style.subtitle}>Feed every H:</Text>
          <View style={style.formContainer}>
            <TextInput
              value={petFeedEvery}
              onChangeText={setPetFeedEvery}
              style={style.formText}
              keyboardType='numeric'
            />
          </View>

          <View style={[cardStyle.iconContainer, { marginBottom: 10 }]}>
          <FontAwesomeIcon
            icon={petIcon[petType.toLowerCase()] || faDragon}
            size={80}
            style={{ color: colors.navy }}
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

      <Modal
        transparent
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={style.modalContainer}>
          <View style={style.modalContent}>
            <Text style={style.modalTitle}>Invite User</Text>
            <TextInput
              placeholder="Enter email"
              placeholderTextColor={colors.gray}
              style={style.textInput}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={style.modalActions}>
              <TouchableOpacity
                style={style.cancelButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={style.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={style.submitButton}
                onPress={() => handleInviteUser(email)}
                >
                <Text style={style.submitText}>Invite</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}
