import React, { PureComponent } from 'react'
import { AppRegistry, View, FlatList, Text, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native'

const extractKey = ({id}) => id
const baseURL = 'https://private-anon-1e01747d5a-bradgardenstats.apiary-mock.com/api'

export default class MemberListScreen extends PureComponent {

  state = {
    loading: true,
    error: false,
    members: [],
  }

  componentWillMount = async () => {
    try {
      const response = await fetch(baseURL + '/members')
      const members = await response.json()
      this.setState({loading: false, members})
    } catch (e) {
      this.setState({loading: false, error: true})
    }
  }

  renderMember = ({item}) => {
    return (
      <Text>
        {item.firstName} {item.lastName}
      </Text>
    )
  }

  render() {
    const {loading, members, error} = this.state

    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} />
        </View>
      )
    }

    if (error) {
      return (
        <View style={styles.container}>
          <Text>
            Could not load members.
          </Text>
        </View>
      )
    }

    return (
      <FlatList
       style={styles.list}
       data={members}
       renderItem={this.renderMember}
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
