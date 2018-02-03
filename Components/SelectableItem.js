import React, { PureComponent } from "react";
import { Text, TouchableOpacity } from "react-native";
import { ComponentStyles } from "./Styles/ComponentStyles";

export default class SelectableItem extends React.PureComponent {
  onPress = () => {
    if (!!this.props.onPressItem) {
      this.props.onPressItem(this.props.id);
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <Text
          style={
            this.props.selected
              ? ComponentStyles.rowSelected
              : ComponentStyles.row
          }
        >
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}
