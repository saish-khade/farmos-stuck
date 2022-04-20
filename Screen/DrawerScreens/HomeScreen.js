import React, {useState, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/core'
import { auth } from '../../firebase'
// import "firebase/firestore";
import firebase from '@firebase/app';
// require("firebase/firestore")

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  Platform,
  Alert,
  Button,
  TouchableOpacity,
} from "react-native";
import { crop } from "../../assets/crop.jpg";
// import Emoji from 'react-native-emoji';
import ProfileScreen from "../ProfileScreen";
// impo
import {
  InputField,
  SubmitBtn,
  SubmitBtnText,
} from '../../styles/AddPost';

const HomeScreen = ({navigation}) => {
  const gotoProfile = () => {
    navigation.replace('ProfileScreen');
  }

  //const {user, logout} = useContext(auth);

  
  const [post, setPost] = useState(null);

  const submitPost = async () => {
   

    firebase.firestore()
    .collection('posts')
    .set({
      userId: 'bvjZgH93aXRewszx8ETZfysEtkN2',
      post: post,
      postTime: firestore.Timestamp.fromDate(new Date()),
      
    })
    .then(() => {
      console.log('Post Added!');
      Alert.alert(
        'Post published!',
        'Your post has been published Successfully!',
      );
      setPost(null);
    })
    .catch((error) => {
      console.log('Something went wrong with added post to firestore.', error);
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            // borderColor: "#000",
            borderBottomWidth: 1,
            borderBottomColor: "#000",
            paddingBottom: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Image
              source={require("../../assets/crop.jpg")}
              style={styles.image}
              resizeMode="cover"
            />

            <TextInput
              style={styles.input}
              multiline
              editable
              maxLength={100}
              value={post}
              placeholder="Write Your Post"
              onChangeText={(content) => setPost(content)}
            />
          </View>

          <View
            style={{
              width: "50%",
              marginLeft: "auto",
            }}
          >
            <SubmitBtn onPress={submitPost} color="#2DD0F3">
              <SubmitBtnText>Post</SubmitBtnText>
            </SubmitBtn>
          </View>
        </View>

        <View>
          <View className="post" style={styles.post}>
            <View className="postHeader" style={styles.postHeader}>
              <Image
                source={require("../../assets/crop.jpg")}
                style={styles.image}
                resizeMode="cover"
              />
              <View>
                <Text style={styles.postHeaderText} onPress={gotoProfile}>Raju Farmer</Text>
                <Text style={styles.postHeaderTextSub}>
                  Mumbai, Maharashtra
                </Text>
              </View>
            </View>

            <View style={styles.postBody}>
              <Text style={styles.postBodyText}>
                Fertilizing Crops!!!
              </Text>
              <Image
                source={require("../../assets/farmer.jpg")}
                style={{width:"100%",alignItems:'center',
                  height: 200,
                  overflow: "hidden",
                  marginVertical: 5,}}
                resizeMode="cover"
              />
            </View>

            <View style={styles.postFooter}>
              <TouchableOpacity style={styles.likebtn} activeOpacity={0.5}>
                <Text style={{ textAlign: "center" }}> 5 Likes</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.likebtn} activeOpacity={0.5}>
                <Text style={{ textAlign: "center" }}> 5 Dislikes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 1,
    overflow: "hidden",
    marginVertical: 5,
  },
  input: {
    height: 40,
    width: "78%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  postHeader: {
    display: "flex",
    flexDirection: "row",
  },
  postHeaderText: {
    marginTop: 10,
    fontSize: 20,
    marginLeft: 10,
  },
  postHeaderTextSub: {
    marginLeft: 10,
  },
  postBody: {
    padding: 5,
  },
  postBodyText: {
    fontSize: 15,
  },
  postFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  likebtn: {
    backgroundColor: "#ccc",
    padding: 20,
    margin: 10,
    width: "50%",
    textAlign: "center",
  },
  post: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
  },
});

export default HomeScreen;