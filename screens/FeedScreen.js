import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View, Image, ScrollView, Button, TextInput, TouchableOpacity } from 'react-native';



const FeedScreen = ({navigation, route}) => {

    const [uId, setUserId] = React.useState('');
    const [uEmail, setUserEmail] = React.useState('');
    const [uploadedTitle, setuploadedTitle] = useState('');
    const [uploadedDescription, setuploadedDescription] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [images, setImages] = useState([]);
    const [selectedImageUri, setSelectedImageUri] = useState(null);


  useEffect(() => {
      if (route.params && route.params.userId && route.params.userEmail) {
          setUserId(route.params.userId);
          setUserEmail(route.params.userEmail);
      }


      const fetchData = async () => {
      try {
        const tempImage = [];
        const data = await fetchTodayImages();
          for (let index = 0; index < 10; index++) {
            const element = {
              'id' : data.body[index].id,
              'title' : data.body[index].title,
              'description' : data.body[index].description,
              'picture' : data.body[index].picture,
              'likeCount' : data.body[index].likeCount,
            }
            tempImage.push(element);
            console.log(data.body[index].id)
          }
          setImages(tempImage);
      } catch (error) {
        // Handle error
      }
    };

    fetchData(); 
    getUserDetail(2);
      

  }, [route.params]);

  const getUserDetail = async (userId) => {
        const imageId = 1;
        const backEndUrl = `http://107.21.143.177:8080/user/my-single-image?userId=${userId}&imageId=${imageId}`;

        fetch(backEndUrl)
        .then(response => {
        if (response.ok) {
          return response.url;
        } else {
          throw new Error('Failed to fetch image');
        }
      })
      .then(url => setImageUri(url))
      .catch(error => console.error('Error fetching image:', error));
  };

  const fetchTodayImages = async () => {
    try {
      const response = await fetch('http://107.21.143.177:8080/user/today-images');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching today images', error);
      throw error;
    }
  };


    const openSearchView = () =>{
      //getFeedImages();
    }

    const openSaveList = () =>{
      alert("Open search")
    }

    const liketoBtn = () =>{
      alert("liked")
    }

    const changeTitle = (inputText) =>{
      setuploadedTitle(inputText);
    }

    const changeDescription = (inputText) =>{
      setuploadedDescription(inputText);
    }

    const pickImage = async () => {

      // (async () => {
      //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      //   if (status !== 'granted') {
      //     alert('Permission to access media library is required!');
      //   }
      // })();


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
          <View style={styles.titleBar}>

            <TouchableOpacity 
            onPress={openSearchView}>
              <Image source={require('./../assets/search.png')} style={styles.iconOne} />
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={openSaveList}
            style={styles.btnTwo}>
              <Image source={require('./../assets/instalike.png')} style={styles.iconTwo} />
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={openSaveList}
            style={styles.btnThree}>
              <Image source={require('./../assets/upload.png')} style={styles.iconTwo} />
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={openSaveList}
            style={styles.btnFour}>
              <Image source={require('./../assets/update.png')} style={styles.iconTwo} />
            </TouchableOpacity>



            {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
            <Text>Loading...</Text>
            )}

          </View>

          <ScrollView style={styles.feedView}>
            {images.map(image => (
              <View key={image.id} style={styles.imageView}>
              <Image source={{ uri: `data:image/png;base64,${image.picture}` }} style={styles.todayImages} />
              <TouchableOpacity 
                onPress={liketoBtn}
                style={styles.likeBtn}>
                <Image source={require('./../assets/likelogo.png')} style={styles.iconTwo} />
                <Text style={styles.likeCount}>{image.likeCount}</Text>
              </TouchableOpacity>
              <Text style={styles.imageTitle}>{image.title}</Text>
              <Text style={styles.imageDesc}>{image.description}</Text>
              
              
            </View>
            ))}

          </ScrollView>

          <View style={styles.uploadView}>

          <Text style={styles.textOne}>Upload Your</Text>

          <Text style={styles.subText}>Title</Text>
            <TextInput
                style={styles.inputOne}
                onChangeText={changeTitle}
                value={uploadedTitle}
            />

            <Text style={styles.subText}>Description</Text>
            <TextInput
                style={styles.inputOne}
                onChangeText={changeDescription}
                value={uploadedDescription}
            />


             <View style={styles.profileBtn}>
              <Button title="Profile Image" onPress={pickImage} />
            </View>           



          </View>



            

        </View>
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
        marginTop: '10%',
        marginLeft:'25%',
        marginBottom:'8%',
        fontSize: 30,
        fontWeight: 'bold',
      },
      titleBar:{
        backgroundColor: '#2f3640',
        width: '98%',
        height:'7%',
        marginTop:'12%',
        borderRadius:3
      },
      image: {
        position: 'absolute',
        width: '0.1%',
        height: '95%',
        marginLeft: '80%',
        marginTop:'0.5%',
        borderRadius:35
      },
      iconOne:{
        width: 40, 
        height: 40,
        borderRadius: 45,
        marginTop:'2.5%',
        marginLeft: '5%'
      },
      btnTwo:{
        position: 'absolute',
        marginTop:'2.5%',
        marginLeft: '20%'
      },
      iconTwo:{
        width: 40, 
        height: 40,
        borderRadius: 5,
        marginTop:'2.5%',
        marginLeft: '5%'
      },
      btnThree:{
        position: 'absolute',
        marginTop:'2.5%',
        marginLeft: '35%'
      },
      btnFour:{
        position: 'absolute',
        marginTop:'2.5%',
        marginLeft: '50%'
      },
      feedView: {
        
      },
      todayImages: {
        width: 380,
        height: 320,
        borderRadius: 5,
        marginTop: '5%',
        marginLeft: '3%'
      },
      imageTitle:{
        color: '#fff',
        fontSize: 20,
        fontWeight:'bold',
        marginLeft: '3%'
      },
      imageDesc:{
        color: '#fff',
        fontSize: 13 ,
        width: '80%',
        marginTop: '2%',
        marginLeft: '3%'
      },
      imageView:{
        marginTop:'6%'
      },
      likeBtn:{
        position: 'absolute',
        marginLeft: '75%',
        marginTop:'75%'
      },
      likeCount:{
        marginTop: '-35%',
        marginLeft: '-22%' ,
        color: '#fff',
        fontSize:20,
      },
      uploadView:{
        position : 'absolute',
        width: '90%',
        height:'70%',
        backgroundColor :'#2d3436',
        marginTop:'40%',
        borderRadius :10
      },
      inputOne:{
        borderColor: '#fff',
        marginTop: '2%',
        backgroundColor : '#fff',
        width: '70%',
        marginLeft: '15%',
        borderRadius:5,
        height: 35
      },
      subText:{
        color: '#ffff',
        marginTop: '5%',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: '5%'
      },
      profileBtn:{
        marginTop: '10%',
        width: '60%',
        marginLeft: '20%'
      },

    })