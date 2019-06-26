/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, useState, useEffect, useReducer } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Image, TextInput } from 'react-native';
import Axios from 'axios';

const reducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_INIT': 
      return {
        ...state,
        isLoading: true
      }
    case 'FETCH_SUCCESS': 
      return {
        ...state,
        data: action.playload,
        isLoading: false,
        isError: false
      }
    case 'FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
    default: 
        return state
  }
}

const useFetchData = (initialData, initialUrl) => {
  // const [data, setDsetIsLoading(true)ata] = useState(initialData)
  // const [isLoading, setIsLoading] = useState(false)
  // const [isError, setIsError] = useState(false)
  const [url, setUrl] = useState(initialUrl)
  const [state, dispatch] = useReducer(reducer, {
    data: initialData,
    isLoading: false,
    isError: false
  })

  useEffect(() => {
    const fetchGitHubData = async () => {
      dispatch({ type: 'FETCH_INIT' })
      try {
        const res = await Axios.get(url)
        console.log('data:', res)
        dispatch({ type: 'FETCH_SUCCESS', playload: res.data })
        // setData(res.data)
        // setIsLoading(false)
        // setIsError(false)
      } catch (error) {
        // setIsError(true)
        // setIsLoading(false)
        dispatch({ type: 'FETCH_FAILURE' })
      }
    }
    fetchGitHubData()

    return () => {

    }
  }, [url])

  return [state, setUrl]
}

const App = () => {
  const [{data, isLoading, isError}, setUrl] = useFetchData({ items: [] }, 'https://api.github.com/search/users?q=cbreno')
  const  [content, setContent] = useState('')

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', width: 300, height: 100, justifyContent: 'center', alignItems: 'center', marginTop: 44  }}>
        <TextInput 
          placeholder={'input name here'}
          style={{ width: 200, height: 100 }}
          onChangeText={(text) => setContent(text)}
        />
        <Text onPress={() => setUrl(`https://api.github.com/search/users?q=${content}`)}>Search</Text>
      </View>
      <ScrollView>
        {
          isError ? <Text>Errir</Text> : null
        }
        {
          isLoading ? <Text>Loading</Text> :
            data.items.map((item) => (
              <View key={item.id} style={{ justifyContent: 'center', alignItems: 'center', width: 300, height: 200 }}>
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
//     super(props)
//     this.state = {
//       content: 'use class',
//       items: [],
//     }

//     this.handleSearchClick = this.handleSearchClick.bind(this)
//   }

//   handleSearchClick() {
//     console.log('handleSearchClick')
//     this.setState({ content: new Date().getTime() })
//   }

//   componentWillMount() {
//     Axios.get('https://api.github.com/search/users?q=mattt')
//       .then(res => {
//         console.log('res:', res)
//         this.setState({ items: res.data.items })
//       })
//   }

//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text onPress={this.handleSearchClick}>Search</Text>
//         <Text>{this.state.content}</Text>
//         <ScrollView>
//           {
//             this.state.items.map((item) => (
//               <View key={ item.id } style={{ justifyContent: 'center', alignItems: 'center', width: 300, height: 200 }}>
//                 <Text>{item.login}</Text>
//                 <Image style={{ width: 100, height: 100 }} source={{ uri: item.avatar_url }}/>
//               </View>
//             ))
//           }
//         </ScrollView>
//       </View>
//     )
//   }
// }

export default App;
