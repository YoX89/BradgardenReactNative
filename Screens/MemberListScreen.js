import React, { Component } from 'react'
import { AppRegistry, View, FlatList, Text, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native'

const extractKey = ({id}) => id

export default class MemberListScreen extends Component {

  state = {
    loading: true,
    error: false,
    members: [],
  }

  componentWillMount = async () => {
    try {
      const response = await fetch('https://private-anon-1e01747d5a-bradgardenstats.apiary-mock.com/api/members')
      const members = await response.json()
      this.setState({loading: false, members})
    } catch (e) {
      this.setState({loading: false, error: true})
    }
  }

  renderItem = ({item}) => {
    return (
      <Text>
        {item.firstName} {item.lastName}
      </Text>
    )
  }

  render() {
    const {loading, members} = this.state

    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} />
        </View>
      )
    }
    
    return (
      <FlatList
       style={styles.list}
       data={members}
       renderItem={this.renderItem}
       keyExtractor={extractKey}
       />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  }
})

AppRegistry.registerComponent('MemberListScreen', () => MemberListScreen)
