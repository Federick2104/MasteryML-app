import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { OpenAIApi } from 'openai';
import axios from 'axios';


const openai = new OpenAIApi('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');

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleSend = async () => {
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
  
      const responseText = gptResponse.data.choices[0].text.trim();
      setOutput(responseText);
    } catch (error) {
      console.log('Error:', error);
    }
  
    setInput('');
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat</Text>
      <View style={styles.chatContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message"
            onChangeText={setInput}
            value={input}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.outputContainer}>
          <Text style={styles.output}>{output}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    chatContainer: {
        width: '90%',
        height: '70%',
        borderWidth: 1,
        borderRadius: 10,
        overflow: 'hidden',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f2f2f2',
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        marginRight: 10,
        backgroundColor: '#fff',
    },
    sendButton: {
        backgroundColor: '#2196f3',
        padding: 10,
        borderRadius: 20,
    },


})

export default ChatBot