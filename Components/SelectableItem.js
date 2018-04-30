import React, { PureComponent } from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { ComponentStyles } from "../Styles/ComponentStyles";

export default class SelectableItem extends React.PureComponent {
  onPress = () => {
    if (!!this.props.onPressItem) {
      this.props.onPressItem(this.props.id);
    }
  };

  render() {
    return (
      <View style={styles.outerWrapper}>
        <TouchableOpacity onPress={this.onPress}>
          <View style={styles.innerWrapper}>
            <Text style={ComponentStyles.row}>{this.props.text}</Text>
            {this.props.selected && (
              <Image
                style={styles.image}
                source={require("../Images/checkmark.png")}
              />
            )}
          </View>
        </TouchableOpacity>
        <View style={ComponentStyles.rowDivider} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerWrapper: {
    flex: 1
  },
  innerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  image: {
    height: 16,
    width: 16,
    marginLeft: 15,
    marginRight: 15
  }
});
