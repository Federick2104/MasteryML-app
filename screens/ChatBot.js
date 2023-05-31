
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { OpenAIApi } from 'openai';
import axios from 'axios';

const openai = new OpenAIApi(process.env.OPENAI_API_KEY);

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInput = async () => {
    try {
      const gptResponse = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        {
          prompt: `You: ${input}\nAI:`,
          max_tokens: 200,
          temperature: 0.6,
          n: 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${'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'}`,
          },
        }
      );

      const newMessage = {
        sender: 'You',
        content: input,
      };

      const responseMessage = {
        sender: 'AI',
        content: gptResponse.data.choices[0].text,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage, responseMessage]);
    } catch (error) {
      console.log(error);
    }

    setInput('');
  };

  const renderMessage = ({ item }) => {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.message}>{item.content}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ChatBot</Text>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type here to chat!"
          onChangeText={(text) => setInput(text)}
          value={input}
        />
        <TouchableOpacity onPress={handleInput} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chatContainer: {
    flexGrow: 1,
  },
  messageContainer: {
    marginBottom: 16,
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  message: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  sendButton: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'blue',
    borderRadius: 4,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
