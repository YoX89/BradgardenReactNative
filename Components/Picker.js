import React, { Component } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { ComponentStyles } from "../Styles/ComponentStyles";

const textReducer = (text, next) => text + next.text + "\n";

export default class Picker extends Component {
  render() {
    const { selected, onPress, placeholder } = this.props;

    const text =
      selected && selected.length > 0
        ? selected.reduce(textReducer, "").trim()
        : null;

    return (
      <View style={ComponentStyles.picker}>
        {text && (
          <Text style={ComponentStyles.pickerFloatingText}>{placeholder}</Text>
        )}
        <TouchableOpacity
          style={ComponentStyles.pickerButton}
          onPress={onPress}
        >
          {text && <Text style={ComponentStyles.pickerText}>{text}</Text>}
          {!text && (
            <Text style={ComponentStyles.pickerPlaceholderText}>
              {placeholder}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}
