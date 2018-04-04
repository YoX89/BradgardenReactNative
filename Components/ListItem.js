import React, { PureComponent } from "react";
import { Text, TouchableOpacity } from "react-native";
import { ComponentStyles } from "../Styles/ComponentStyles";

export default class ListItem extends React.PureComponent {
  onPress = () => {
    const { onPressItem, data } = this.props;
    if (!!onPressItem) {
      onPressItem(data);
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <Text style={ComponentStyles.row}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}
