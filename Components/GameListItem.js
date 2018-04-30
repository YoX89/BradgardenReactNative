import React, { PureComponent } from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { ComponentStyles } from "../Styles/ComponentStyles";

export default class GameListItem extends React.PureComponent {
  onPress = () => {
    const { onPressItem, game } = this.props;
    if (!!onPressItem) {
      onPressItem(game);
    }
  };

  render() {
    const { game } = this.props;
    return (
      <View>
        <TouchableOpacity style={styles.outerWrapper} onPress={this.onPress}>
          <View style={styles.innerWrapper}>
            <Text style={ComponentStyles.gameTitle}>{game.name}</Text>
            <Text style={ComponentStyles.gameDetails}>
              {this.gameDetailsText(game)}
            </Text>
          </View>
          <View style={styles.iconWrapper}>
            {game.coop && (
              <Image
                source={require("../Images/coop.png")}
                style={ComponentStyles.gameIcon}
              />
            )}
            {game.traitor && (
              <Image
                source={require("../Images/traitor.png")}
                style={ComponentStyles.gameIcon}
              />
            )}
          </View>
        </TouchableOpacity>
        <View style={ComponentStyles.rowDivider} />
      </View>
    );
  }

  gameDetailsText(game) {
    const { coop, traitor } = game;
    if (traitor) {
      return "Beware of Simon Månsson, this game has traitors.";
    } else if (coop) {
      return "Want to avoid bad losers? Perfect! This is co-op.";
    }
    return "Regular ol' fashioned board game.";
  }
}

const styles = StyleSheet.create({
  outerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  innerWrapper: {
    flexDirection: "column"
  },
  iconWrapper: {
    flexDirection: "row",
    marginRight: 15
  }
});
