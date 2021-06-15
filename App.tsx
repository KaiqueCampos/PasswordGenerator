import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold, useFonts } from '@expo-google-fonts/montserrat';
import Slider from '@react-native-community/slider';
import AppLoading from 'expo-app-loading';
import Clipboard from 'expo-clipboard';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


//Will be used to generate the passwords
let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ129384132914841294@#&!';

export default function App() {

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_500Medium,
  });

  const [password, setPassword] = useState('');
  const [size, setSize] = useState(5);
  const [copy, setCopy] = useState('notCopy')

  //depending the characters the user want, will create a password using the information by the charset
  function generatePass() {
    setCopy('notCopy')

    let pass = '';
    for (let i = 0, n = charset.length; i < size; i++) {
      pass += charset.charAt(Math.floor(Math.random() * n))
    }
    setPassword(pass)
  }

  //alow to copy the password
  function copyPass() {
    Clipboard.setString(password)
    setCopy('copy')
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  //displays the information in the screen
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('./assets/logo.png')}
      />

      <Text style={styles.legend}> {size} Characters </Text>

      <View style={styles.area}>
        <Slider
          style={{ height: 50, backgroundColor: '#44475a' }}
          minimumValue={5}
          maximumValue={15}
          maximumTrackTintColor='#191622'
          minimumTrackTintColor='#321B76'
          thumbTintColor={'#321B76'}
          value={size}
          onValueChange={(value) => setSize(Math.round(value))}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePass}>
        <Text style={styles.buttonText}>Generate Password</Text>
      </TouchableOpacity>


      {password !== '' && (
        <View style={copy === 'copy' ? styles.areaCopy : styles.area}>
          <Text nativeID='copy' style={styles.password} onLongPress={copyPass}>
            {copy === 'copy' ? "Password copied!" : password}
          </Text>
        </View>
      )}
    </View>
  )
}

//styles for the page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191622'
  },

  legend: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#6B42E1',
  },

  logo: {
    resizeMode: 'cover',
    height: 150,
    width: 150,
  },

  area: {
    overflow: 'hidden',
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: 'red',
    width: '80%',
    borderRadius: 7,
  },

  areaCopy: {
    overflow: 'hidden',
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#1AE452',
    width: '80%',
    borderRadius: 7,
  },

  button: {
    backgroundColor: '#6B42E1',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginTop: 10,
    marginBottom: 25,
  },

  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500',
  },

  password: {
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
    color: '#fff'
  }
})