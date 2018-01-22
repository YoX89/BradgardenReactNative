import React, { Component } from 'react'
import { AppRegistry, View, Text, ActivityIndicator, StyleSheet } from 'react-native'

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

  render() {
    const {loading, members} = this.state

    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} />
        </View>
      )
    }

    console.log(members)
    return (
      <View style={styles.container}>
        <Text>
          We have {members.length} members.
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

AppRegistry.registerComponent('MemberListScreen', () => MemberListScreen)
