import React, { PureComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
      <View>
        <TouchableOpacity onPress={this.onPress}>
          <Text style={ComponentStyles.rowTitle}>{this.props.title}</Text>
          <Text style={ComponentStyles.rowDetails}>{this.props.details}</Text>
        </TouchableOpacity>
        <View style={ComponentStyles.rowDivider} />
      </View>
    );
  }
}
