import React, { useState } from 'react';
import {BASE_URL} from '@env';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';
import Button from '../components/Button';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { style } from '../styles/style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { colors } from '../styles/style';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, first_name: firstName, last_name: lastName }),
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate('Login');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background-form.png')}
      resizeMode="cover"
      style={[style.background, { flex: 1 }]}>
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

       <View style={style.formContainer}>
        <FontAwesomeIcon icon={faUser} style={style.icon} />
        <TextInput
          placeholderTextColor={colors.navy}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={style.formText}
        />
        </View>

        <View style={style.formContainer}>
        <FontAwesomeIcon icon={faUser} style={style.icon} />
          <TextInput
            placeholderTextColor={colors.navy}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            style={style.formText}
          />
          </View>

        <View style={style.formContainer}>
        <FontAwesomeIcon icon={faEnvelope} style={style.icon} />
          <TextInput
            placeholderTextColor={colors.navy}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={style.formText}
          />
        </View>

        <View style={style.formContainer}>
        <FontAwesomeIcon icon={faLock} style={style.icon} />  
          <TextInput
            placeholderTextColor={colors.navy}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={style.formText}
          />
        </View>

      <Button title="Register" onPress={handleRegister} color={colors.yellow}/>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={style.link}>Already have an account? Login</Text>
      </TouchableOpacity>
      </SafeAreaView>
  </ImageBackground>
  );
}
