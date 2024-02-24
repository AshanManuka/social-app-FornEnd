import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';


const RegisterScreen = () => {

    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const [isRegistrationViewVisible, setIsRegistrationViewVisible] = React.useState(true);
    const [isVerificationViewVisible, setIsVerificationViewVisible] = React.useState(false);

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
        alert("register")
        setIsRegistrationViewVisible(false);
        setIsVerificationViewVisible(true);
    }
    const verifyAccount = () => {
        alert("verify")
        setIsRegistrationViewVisible(true);
        setIsVerificationViewVisible(false);
    }

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
                value={email}
            />

            <Text style={styles.subText}>Password</Text>
            <TextInput
                style={styles.inputOne}
                onChangeText={changePassword}
                value={password}
            />

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
      image: {
        width: 300, 
        height: 300,
        position : 'absolute',
        marginTop : 520
      },


    })