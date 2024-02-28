import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity } from 'react-native';


const RegisterScreen = () => {

    const [fullName, setFullName] = React.useState('');
    const [userEmail, setEmail] = React.useState('');
    const [createdPassword, setPassword] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const [selectedImageUri, setSelectedImageUri] = useState(null);
    const [isRegistrationViewVisible, setIsRegistrationViewVisible] = React.useState(true);
    const [isVerificationViewVisible, setIsVerificationViewVisible] = React.useState(false);

    useEffect(() => {
      (async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access media library is required!');
        }
      })();
    }, []);

    const changeFullName = (inputText) => {
        setFullName(inputText);
    }
    const changeEmail = (inputText) => {
        setEmail(inputText);
    }
    const changePassword = (inputText) => {
        setPassword(inputText);
    }
    const changeOtp = (inputText) => {
        setOtp(inputText);
    }


    const RegisterAccount = () => {

      const backEndUrl = 'http://107.21.143.177:8080/public/sign-up';

      const registerData = new FormData();
      registerData.append('name', fullName);
      registerData.append('email', userEmail);
      registerData.append('userName', userEmail);
      registerData.append('password', createdPassword);

      if (selectedImageUri) {
        const imageUriParts = selectedImageUri.split('.');
        const imageType = imageUriParts[imageUriParts.length - 1];
        const imageName = `profileImage.${imageType}`;
        registerData.append('profileImage', {
          uri: selectedImageUri,
          name: imageName,
          type: `image/${imageType}`,
        });
      }
        
      console.log('Sending request to:', backEndUrl);
  

      try {
        fetch(backEndUrl, {
          method: 'POST',
          body: registerData,
          headers: {
            'Content-Type': 'multipart/form-data', // Important for sending FormData
          },
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error('Error getting location:', error);
      }
    
      setIsRegistrationViewVisible(false);
      setIsVerificationViewVisible(true);
    };
    
    const verifyAccount = () => {
        alert("verify")
        setIsRegistrationViewVisible(true);
        setIsVerificationViewVisible(false);
    }

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
    
      setSelectedImageUri(result.assets[0].uri);
    };

    return(
        <View style={styles.body}>
           <View style={styles.mainView}> 
           {isRegistrationViewVisible && (
            <>
            <Text style={styles.textOne}>Create your Account</Text>

            <Text style={styles.subText}>Full Name</Text>
            <TextInput
                style={styles.inputOne}
                onChangeText={changeFullName}
                value={fullName}
            />

            <Text style={styles.subText}>Email Id    </Text>
            <TextInput
                style={styles.inputOne}
                onChangeText={changeEmail}
                value={userEmail}
            />

            <Text style={styles.subText}>Password</Text>
            <TextInput
                style={styles.inputOne}
                onChangeText={changePassword}
                value={createdPassword}
            />

            <View style={styles.profileBtn}>
              <Button title="Profile Image" onPress={pickImage} />
            </View>

            <TouchableOpacity
                style={styles.registerBtn}
                onPress={RegisterAccount}
            >
                <Text style={styles.btnText}>Sign-Up</Text>
            </TouchableOpacity>
            </>
                )}
            </View> 


            {isVerificationViewVisible && (
            <>
            <View style={styles.verifyView}>
            
                <Text style={styles.textOne}>Verify your Email</Text>

                <TextInput 
                style={styles.otpInput}
                onChangeText={changeOtp}
                value={otp}
                >
                </TextInput>

                <TouchableOpacity
                style={styles.registerBtn}
                onPress={verifyAccount}
                >
                <Text style={styles.btnText}>Verify</Text>
                </TouchableOpacity>

            </View>
            </>
            )}

                <Image
                source={require('./../assets/timewaste.png')} 
                style={styles.image}
                />

        </View>
    );

}
export default RegisterScreen;

const styles= StyleSheet.create({
    body : {
        backgroundColor: '#1e272e',
        alignItems: 'center',
        flex:1
      },
      mainView:{
        backgroundColor: '#1e272e',
        alignItems: 'center',
        flex:1,
        width:'100%',
      },
      textOne:{
        color: '#dfe4ea',
        marginTop: '18%',
        marginBottom:'8%',
        fontSize: 30,
        fontWeight: 'bold',
      },
      inputOne:{
        borderColor: '#fff',
        marginTop: '2%',
        backgroundColor : '#fff',
        width: '70%',
        borderRadius:5,
        height: 35
      },
      subText:{
        color: '#ffff',
        marginTop: '5%',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: '-65%'
      },
      registerBtn:{
        backgroundColor: '#01a3a4',
        padding:10,
        paddingLeft:90,
        paddingRight:90,
        marginTop:'6%',
        borderRadius:4
      },
      btnText:{
        color: '#ffff',
        fontSize:16,
        fontWeight:'bold'
      },
      verifyView:{
        position: 'absolute',
        marginTop:'10%',
        backgroundColor: '#1e272e',
        alignItems: 'center',
        flex:1,
        width :'100%',
      },
      otpInput:{
        borderColor:'#ffff',
        marginTop: '5%',
        backgroundColor : '#fff',
        width: '50%',
        borderRadius:5,
        height: 35
      },
      profileBtn:{
        marginTop: '5%'
      },
      image: {
        width: 250, 
        height: 250,
        position : 'absolute',
        marginTop : 570
      },


    })