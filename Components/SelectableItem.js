import React, { PureComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ComponentStyles } from "../Styles/ComponentStyles";

export default class SelectableItem extends React.PureComponent {
  onPress = () => {
    if (!!this.props.onPressItem) {
      this.props.onPressItem(this.props.id);
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View>
          <Text
            style={
              this.props.selected
                ? ComponentStyles.rowSelected
                : ComponentStyles.row
            }
          >
            {this.props.text}
          </Text>
        </View>
        <View style={ComponentStyles.rowDivider} />
      </TouchableOpacity>
    );
  }
}
