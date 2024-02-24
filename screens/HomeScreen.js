import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

const HomeScreen = ({navigation}) => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const changeUsername = (inputText) => {
        setUsername(inputText);
    }
    const changePassword = (inputText) => {
        setPassword(inputText);
    }



    const checkCredential = () => {
        alert("Move");
    }



    return(
        <View style={styles.body}>
            <Text style={styles.textOne}>Social Image Platform</Text>

            <Image
                source={require('./../assets/mainPic.png')} 
                style={styles.image}
            />

            <View style={styles.subView}></View>
            <Text style={styles.textTwo}>Log-In</Text>
            <Text style={styles.subText}>Username</Text>
            <TextInput
                style={styles.inputOne}
                onChangeText={changeUsername}
                value={username}
            />
            <Text style={styles.subText}>Password</Text>
            <TextInput
                style={styles.inputOne}
                onChangeText={changePassword}
                value={password}
            />

            <TouchableOpacity
                style={styles.loginBtn}
                onPress={checkCredential}
            >
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.registerBtn}
                onPress={() => navigation.navigate('Register')}
            >
                <Text style={styles.btnTextTwo}>Register</Text>
            </TouchableOpacity>
            

            
            




        </View>
    );

}
export default HomeScreen;

const styles= StyleSheet.create({
    body : {
        backgroundColor: '#1e272e',
        alignItems: 'center',
        flex:1
      },
      textOne:{
        color: '#dfe4ea',
        marginTop: '18%',
        marginBottom:'8%',
        fontSize: 30,
        fontWeight: 'bold',
      },
      image: {
        width: 200, 
        height: 200,
        marginTop: '6%',
      },
      subView:{
        width: '90%',
        height:'42%',
        backgroundColor: '#485460', 
        marginLeft: '5%',
        position: 'absolute',
        marginTop: '105%',
        borderRadius: 15
      },
      textTwo:{
        color: '#ffff',
        marginTop: '17%',
        fontSize: 25,
        fontWeight: 'bold',
      },
      subText:{
        color: '#ffff',
        marginTop: '5%',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: '-45%'
      },
      inputOne:{
        borderColor: '#fff',
        marginTop: '2%',
        backgroundColor : '#fff',
        width: '60%',
        borderRadius:5,
        height: 35
      },
      loginBtn:{
        position:'absolute',
        backgroundColor:'#0a3d62',
        marginTop:'170%',
        marginLeft:'52%',
        width:'36%',
        borderRadius:4
      },
      btnText: {
        color: '#ffff',
        fontSize: 18,
        marginBottom:-30,
        marginTop:8,
        textAlign: 'center',
        fontWeight:'bold'
      },
      btnTextTwo: {
        color: '#ffff',
        fontSize: 16,
        marginBottom:-30,
        marginTop:83,
        textAlign: 'center',
        fontWeight:'bold'
      },
      
    
})