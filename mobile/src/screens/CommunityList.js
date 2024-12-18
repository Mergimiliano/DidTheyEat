import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import CommunityCard from '../components/CommunityCard';
import { colors, style } from '../styles/style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { cardStyle } from '../styles/cardStyle';
import BottomSheet from '@devvie/bottom-sheet';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker';
import Button from '../components/Button';
import { getCommunities, createCommunity, updateCommunity, deleteCommunity } from '../services/communityService';
import { faHouse, faBuilding, faTent } from '@fortawesome/free-solid-svg-icons';
import { ActivityIndicator } from 'react-native';

const CreateCommunityCard = ({ onPress }) => {
  return (
    <TouchableOpacity style={cardStyle.communityCardCreate} onPress={onPress}>
        <FontAwesomeIcon icon={faPlus} size={80} style={{color: colors.navy}} />
      <Text style={style.subtitle}>Create new</Text>
    </TouchableOpacity>
  );
};

const communityIcon = {
  home: faHouse,
  work: faBuilding,
  other: faTent,
};

export default function CommunityList({ navigation }) {
  const [communities, setCommunities] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const bottomSheetRef = useRef();
  const [communityName, setCommunityName] = useState('');
  const [communityType, setCommunityType] = useState('other');
  const [refreshing, setRefreshing] = useState(false);
  const [mode, setMode] = useState('create');
  const [currentCommunity, setCurrentCommunity] = useState(null);

  useEffect(() => {
    getCommunities()
      .then(data => setCommunities(data))
      .catch(err => {
        console.error('Error fetching communities:', err);
        setError('Failed to fetch communities');
      });
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getCommunities()
      .then(data => {
        setCommunities(data);
        setRefreshing(false);
      })
      .catch(err => {
        console.error('Error refreshing communities:', err);
        setError('Failed to refresh communities');
        setRefreshing(false);
      });
  };

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(search.toLowerCase())
  );

  const data = [
    ...filteredCommunities,
    { id: 'create' },
  ];

  const handleOpenEditBottomSheet = (community) => {
    setMode('update');
    setCurrentCommunity(community);
    setCommunityName(community.name);
    setCommunityType(community.type);
    bottomSheetRef.current?.open();
  };

  const handleSubmit = () => {
    const newCommunity = {
      name: communityName,
      type: communityType,
    };

    if (mode === 'create') {
      createCommunity(newCommunity)
        .then(() => {
          onRefresh();
          bottomSheetRef.current?.close();
        })
        .catch(err => {
          console.error('Error creating community:', err);
          Alert.alert('Error', 'Failed to create community');
        });
    } else if (mode === 'update' && currentCommunity) {
      updateCommunity(currentCommunity.id, newCommunity)
        .then(() => {
          onRefresh();
          bottomSheetRef.current?.close();
        })
        .catch(err => {
          console.error('Error updating community:', err);
          Alert.alert('Error', 'Failed to update community');
        });
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this community?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteCommunity(id)
              .then(() => {
                onRefresh();
              })
              .catch(err => {
                console.error('Error deleting community:', err);
                Alert.alert('Error', 'Failed to delete the community.');
              });
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => {
    if (item.id === 'create') {
      return (
        <CreateCommunityCard
          onPress={() => {
            setMode('create');
            setCommunityName('');
            setCommunityType('other');
            bottomSheetRef.current?.open();
          }}
        />
      );
    }
    return (
      <CommunityCard
        community={item}
        onPress={() => navigation.navigate('CommunityDetails', { communityId: item.id, communityName: item.name })}
        onUpdate={handleOpenEditBottomSheet}
        onDelete={handleDelete}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
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

      {error ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.yellow} />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}

      <BottomSheet
        ref={bottomSheetRef}
        height={hp('60%')}
        closeOnDragDown
        closeOnPressMask
        style={style.bottomSheet}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={style.subtitle}>Community Name:</Text>
          <View style={style.formContainer}>
            <TextInput
              value={communityName}
              onChangeText={setCommunityName}
              style={style.formText}
            />
          </View>

          <Text style={style.subtitle}>Type:</Text>
          <View style={style.formContainer}>
            <Picker
              selectedValue={communityType}
              onValueChange={(itemValue) => setCommunityType(itemValue)}
              style={{
                flex: 1,
                color: colors.navy,
                width: '100%',
                height: '100%',
              }}
              dropdownIconColor={colors.navy}
            >
              <Picker.Item label="Other" value="other" />
              <Picker.Item label="Home" value="home" />
              <Picker.Item label="Work" value="work" />
            </Picker>
          </View>
          <View style={[cardStyle.iconContainer, { marginBottom: 10 }]}>
            <FontAwesomeIcon
              icon={communityIcon[communityType.toLowerCase()] || faTent}
              size={80}
              style={{ color: colors.navy }}
            />
          </View>
          <Button
            title={mode === 'create' ? 'Create' : 'Update'}
            onPress={handleSubmit}
            color={colors.green}
            disabled={!communityName.trim()}
          />
        </View>
      </BottomSheet>
    </View>
  );
}
