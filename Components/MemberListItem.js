import React, { PureComponent } from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { ComponentStyles } from "../Styles/ComponentStyles";

export default class MemberListItem extends React.PureComponent {
  onPress = () => {
    const { onPressItem, data } = this.props;
    if (!!onPressItem) {
      onPressItem(data);
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.outerWrapper}>
          <Image style={styles.image} source={require("../Images/user.png")} />
          <View style={styles.innerWrapper}>
            <Text style={ComponentStyles.rowTitle}>{this.props.text}</Text>
            <Text style={ComponentStyles.rowDetails}>
              {"I think " +
                this.props.text +
                " is a pretty cool person. Tehy play games and doesn’t afraid of anything."}
            </Text>
          </View>
        </View>
        <View style={ComponentStyles.rowDivider} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  outerWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  innerWrapper: {
    flex: 1
  },
  image: {
    marginLeft: 15,
    height: 32,
    width: 32
  }
});
