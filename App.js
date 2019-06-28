/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, useState, useEffect, useReducer } from 'react';
import {Platform, StyleSheet, Text, View, Image, ScrollView, TextInput } from 'react-native';
import Axios from 'axios';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const fetchReducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_INIT': 
      return {
        ...state,
        isLoading: true
      }
    case 'FETCH_SUCCESS': 
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      }
    case 'FETCH_FAILURE': 
      return {
        ...state,
        isLoading: false,
        isError: false
      }
    default: 
      return state
  }
}

const useFetchData = (initialUrl) => {
  // const [isError, setIsError] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)
  // const [list, setList] = useState({ items: [] })
  const [url, setUrl] = useState(initialUrl)

  const [state, dispatch] = useReducer(fetchReducer, {
    data: { items: [] },
    isLoading: false,
    isError: false,
  })

  useEffect(() => {
    const fetchData = async () => {
     try {
       dispatch({ type: 'FETCH_INIT' })
      //  setIsLoading(true)
       const data = await Axios.get(url)
       console.log('data', data)
       dispatch({ type: 'FETCH_SUCCESS', payload: data.data })
      //  setList(data.data)
      //  setIsLoading(false) opvbv
      //  setIsError(false)
     } catch {
        // setIsError(true)
        // setIsLoading(false)
        dispatch({ type: 'FETCH_FAILURE' })
     }
    }
    fetchData()
  }, [url])

  return [state, setUrl]
}

const App = () => {
  const [content, setContent] = useState('')
  const [{data, isLoading, isError}, setUrl] = useFetchData('https://api.github.com/search/users?q=cbreno')

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: 300, height: 100, marginTop: 64, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <TextInput style={{ width: 200, height: 40 }} placeholder={'input here'} onChangeText={(text) => setContent(text)}/>
          <Text onPress={() => setUrl(`https://api.github.com/search/users?q=${content}`)}>Click Me</Text>
        </View>
        <ScrollView>
          {
            isError ? <Text>Error</Text> : null
          }
        {
          isLoading ? <Text>Loading</Text> : data.items.map(item => (
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 300, height: 200 }}>
              <Text>{item.login}</Text>
              <Image style={{ width: 100, height: 100 }} source={{ uri: item.avatar_url }} />
            </View>
          ))
        }
        </ScrollView>
      </View>
  )
}

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       content: 'aaaa'
//     }

//     this.handleChangeClick = this.handleChangeClick.bind(this)
//   }

//   handleChangeClick() {
//     this.setState({ content: new Date().getTime() })
//   }

//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text onPress={this.handleChangeClick}>Click Me</Text>
//         <Text>{this.state.content}</Text>
//       </View>
//     )
//   }
// }



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
