import React, { useEffect, useState, useRef } from 'react';
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
import { getCommunities } from '../services/communityService';
import { createCommunity } from '../services/communityService';
import { faHouse, faBuilding, faTent } from '@fortawesome/free-solid-svg-icons';

const CreateCommunityCard = ({ onPress }) => {
  return (
    <TouchableOpacity style={cardStyle.cardCreate} onPress={onPress}>
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

export default function Communities() {
  const [communities, setCommunities] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const bottomSheetRef = useRef();
  const [communityName, setCommunityName] = useState('');
  const [communityType, setCommunityType] = useState('Other');

  useEffect(() => {
  getCommunities()
    .then(data => setCommunities(data))
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

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.open();
  };

  const handleCreate = () => {
    const createdCommunity = {
      name: communityName,
      type: communityType,
    };

    createCommunity(createdCommunity)
    .then(() => {
      Alert.alert('Community created successfully!');
      getCommunities()
      .then( data => {
        setCommunities(data);
        setCommunityName('');
        setCommunityType('Other');
        bottomSheetRef.current.close();
      })
      .catch(err => {
        console.error('Error fetching communities:', err);
        setError('Failed to fetch updated communities');
      });
    })
    .catch(err => {
      console.error('Error creating community:', err);
      setError('Failed to create community');
      Alert.alert('Error', 'There was an error creating the community');
    });
  };


  const renderItem = ({ item }) => {
    if (item.id === 'create') {
      return <CreateCommunityCard onPress={handleOpenBottomSheet} />;
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
          renderItem={renderItem}
          showsVerticalScrollIndicator={false} />
      ) : (
        <Text>Loading or no communities found</Text>
      )}

    <BottomSheet
      ref={bottomSheetRef}
      height={hp('50%')}
      closeOnDragDown
      closeOnPressMask
      style={style.bottomSheet}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={style.subtitle}>
          Community Name:
        </Text>
        <View style={style.formContainer}>
          <TextInput
            value={communityName}
            onChangeText={setCommunityName}
            style={style.formText}
          />
        </View>

        <Text style={style.subtitle}>
          Type:
        </Text>
        <View style={style.formContainer}>
          <Picker
            selectedValue={communityType}
            onValueChange={(itemValue) => setCommunityType(itemValue)}
            style={{
              flex: 1,
              color: colors.navy,
              width: '100%',
              height: '100%'
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
              style={{color: colors.navy}}
            />
          </View>
          <Button title="Create" onPress={handleCreate} color={colors.green} />
      </View>
    </BottomSheet>

    </View>

  );
}