/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, useState, useEffect, useMemo } from 'react';
import { Platform, StyleSheet, Text, View, Image, TextInput, Button, ScrollView } from 'react-native';
import Axios from 'axios';
// import axios from 'axios';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const Child = React.memo(({ name, content }) => {
  console.log('child rerender');
  changeName = (name) => {
    console.log('Child');
    return name + ' is changed'
  }

  const changedName = useMemo(() => changeName(name), [name])

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
      <Text>{changedName}</Text>
      <Text>{content}</Text>
    </View>
  );

})

const FetchDataExample = () => {
  const [data, setData] = useState({ items: [] })
  const [content, setContent] = useState('cbreno')
  const [url, setUrl] = useState(`https://api.github.com/search/users?q=cbreno`)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const result = await Axios.get(url)
      console.log('result:', result.data)
      setData(result.data)
      setIsLoading(false)
    }

    fetchData()
  }, [url])

  return (
    <View style={{ flex: 1, backgroundColor: 'orange', width: 300, justifyContent: 'flex-start', paddingTop: 64 }}>
      <View style={{ width: 300, height: 40, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
        <TextInput
          style={{ width: 200 }}
          placeholder={'type the name you wanna search'}
          onChangeText={(text) => setContent(text)}
        />
        <Text onPress={() => setUrl(`https://api.github.com/search/users?q=${content}`)} style={{ marginRight: 20 }}>
          Search
       </Text>
      </View>
      <ScrollView>
        <View style={{ justifyContent: 'center', alignItem: 'center' }}>
          {
          isLoading ? <Text>loading</Text> :
          data.items.map(item => (
            <View key={item.id} style={{ width: 300, height: 40, backgroundColor: 'green', marginBottom: 10, flexDirection: 'row', justifyContent: 'center', alignItem: 'center' }}  >
              <Text>{item.login}</Text>
            </View>
          ))
        }
        </View>
      </ScrollView>
    </View>
  )
}


const App = () => {
  const [name, setName] = useState('name');
  const [content, setContent] = useState('content');

  return (
    <View style={styles.container}>
      {/* <Text style={{ marginTop: 100 }} onPress={() => setName(new Date().getTime())}>{name}</Text>
      <Text onPress={() => setContent('qwer')}>{content}</Text>
      <Child name={name}>{content}</Child> */}
      <FetchDataExample />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 45,
  },
});

export default App;
