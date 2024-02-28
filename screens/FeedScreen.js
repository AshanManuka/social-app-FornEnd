import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity } from 'react-native';


const FeedScreen = ({navigation}) => {

    return(
        <View><Text style={styles.textOne}>Hiiii</Text></View>
    );

}
export default FeedScreen;

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
    })