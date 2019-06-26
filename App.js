/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import Axios from 'axios';

const App = () => {
  const [content, setContent] = useState('useState')
  const [data, setData] = useState({ items: [] })

  useEffect(() => {
    const fetchGitHubData = async () => {
      const res = await Axios.get('https://api.github.com/search/users?q=cbreno')
      console.log('data:', res)
      setData(res.data)
    }
    fetchGitHubData()

    return () => {
      
    }
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text onPress={() => setContent(new Date().getTime())}>Search</Text>
      <Text>{content}</Text>
      <ScrollView>
        {
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
