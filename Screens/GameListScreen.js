import React, { PureComponent } from 'react'
import { AppRegistry, View, FlatList, Text, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native'
import { containerStyles } from './Styles/ContainerStyles'
import { rowStyles } from './Styles/RowStyles'

const extractKey = ({id}) => id
const baseURL = 'https://private-anon-1e01747d5a-bradgardenstats.apiary-mock.com/api'

export default class GameListScreen extends PureComponent {

  state = {
    loading: true,
    error: false,
    games: [],
  }

  componentWillMount = async () => {
    try {
      const response = await fetch(baseURL + '/games')
      const games = await response.json()
      this.setState({loading: false, games})
    } catch (e) {
      this.setState({loading: false, error: true})
    }
  }

  renderGame = ({item}) => {
    return (
      <Text style={rowStyles.row}>
        {item.name}
      </Text>
    )
  }

  render() {
    const {loading, games, error} = this.state

    if (loading) {
      return (
        <View style={containerStyles.center}>
          <ActivityIndicator animating={true} />
        </View>
      )
    }

    if (error) {
      return (
        <View style={containerStyles.center}>
          <Text>
            Could not load games.
          </Text>
        </View>
      )
    }

    return (
      <FlatList
       style={containerStyles.list}
       data={games}
       renderItem={this.renderGame}
       keyExtractor={extractKey}
       />
    )
  }
}

AppRegistry.registerComponent('GameListScreen', () => GameListScreen)
