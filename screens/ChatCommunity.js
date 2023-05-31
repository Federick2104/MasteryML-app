import React, {useEffect, useState, useLayoutEffect, useCallback} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput, ImageBackground, Platform, Keyboard } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { auth, database } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import { AntDesign } from '@expo/vector-icons'


const ChatCommunity = () => {
  const [messages, setMessages] = useState([])
  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(auth)
    .catch((error) =>  console.log(error));
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{marginRight: 10}} onPress={handleSignOut}>
          <AntDesign name="logout" size={24} color="black" style={{marginRight: 10}} />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'chats')
    const q = query(collectionRef, orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log('Total users: ', querySnapshot.size);
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      )
    })
    return () => unsubscribe()
  }, [])
  
  const onSend = useCallback((messages = []) => {

    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

    const { _id, createdAt, text, user } = messages[0]

    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user
    })
  }, [])



  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.email,
        avatar: 'https://i.pravatar.cc/300',
      }}
      messagesContainerStyle={{
        backgroundColor: 'white',

      }}

    />
  )
}

export default ChatCommunity

const styles = StyleSheet.create({})