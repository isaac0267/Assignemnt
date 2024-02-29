import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  async function saveList() {
    try {
      const jsonValue = JSON.stringify(list);
      await AsyncStorage.setItem('@myList', jsonValue);
    } catch (error) {
      console.error(error);
    }
  }

  function pressMe() {
    alert("" + text);
    setList([...list, { key: list.length.toString(), value: text }]);
    setText(""); // Optionally clear the input after adding to the list
  }

  return (
    <View style={styles.container}>
      <Text>Assignment</Text>
      <Text>{text}</Text>
      <TextInput style={styles.textInput} onChangeText={setText} value={text} />
      <Button title='Press me' onPress={pressMe} />
      <FlatList
        data={list}
        renderItem={({ item }) => <Text>{item.value}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 12,
  },
});
