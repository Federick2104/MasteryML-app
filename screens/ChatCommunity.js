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
    // Quando questo effetto viene eseguito, aggiorna le opzioni dell'intestazione del componente di navigazione.
    navigation.setOptions({
      // Imposta le opzioni dell'intestazione del componente di navigazione.
      headerRight: () => (
        // Componente personalizzato da visualizzare sul lato destro dell'intestazione.
        <TouchableOpacity style={{marginRight: 10}} onPress={handleSignOut}>
          <AntDesign name="logout" size={24} color="black" style={{marginRight: 10}} />
        </TouchableOpacity>
      )
    })
  }, [navigation])
  
  useLayoutEffect(() => {
    // Quando questo effetto viene eseguito, configura un ascoltatore in tempo reale per la collezione 'chats'.
    const collectionRef = collection(database, 'chats')
    // Ottieni un riferimento alla collezione 'chats' nel database.
  
    const q = query(collectionRef, orderBy('createdAt', 'desc'))
    // Crea una query che ordina i documenti della collezione per il campo 'createdAt' in ordine decrescente.
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // Configura un ascoltatore per la query che si attiva ogni volta che ci sono modifiche nella collezione.
  
      console.log('Tot Users: ', querySnapshot.size);
  
      setMessages(
        querySnapshot.docs.map((doc) => ({
          // Aggiorna lo stato 'messages' con i dati dei documenti nell'istantanea della query.
  
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      )
    })
    // La funzione onSnapshot ascolta le modifiche nella query ed esegue la funzione di callback fornita.
  
    return () => unsubscribe()
    // Restituisce una funzione di pulizia che annulla l'ascoltatore quando il componente viene smontato o l'effetto viene eseguito nuovamente.
  
  }, [])
  // L'effetto viene eseguito solo una volta quando il componente viene montato poiché ha un array di dipendenze vuoto.
  
  
  const onSend = useCallback((messages = []) => {
    // Definisce una funzione di callback chiamata 'onSend' utilizzando il hook 'useCallback'.
  
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    // Aggiorna lo stato 'messages' aggiungendo i nuovi 'messages' ai messaggi precedenti utilizzando il metodo 'GiftedChat.append'.
  
    const { _id, createdAt, text, user } = messages[0]
    // Estrapola le proprietà del primo messaggio nell'array 'messages'.
  
    addDoc(collection(database, 'chats'), {
      // Aggiunge un nuovo documento alla collezione 'chats' nel database.
      _id,
      createdAt,
      text,
      user
    })
    // Il documento contiene le proprietà estratte dal primo messaggio.
  
  }, [])
  // La funzione 'onSend' viene creata una volta e non dipende da variabili esterne o props.
  

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        avatar: 'https://i.pravatar.cc/300',
        name: auth?.currentUser?.email,
      }}
      messagesContainerStyle={{
        backgroundColor: 'white',

      }}

    />
  )
}

export default ChatCommunity

const styles = StyleSheet.create({})