import React, { PureComponent } from "react";
import {
  AppRegistry,
  View,
  FlatList,
  Text,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import Modal from "react-native-modal";
import Button from "../Components/Button";
import SelectableItem from "../Components/SelectableItem";
import { ContainerStyles } from "./Styles/ContainerStyles";

const extractKey = ({ id }) => id;

export default class SelectionScreen extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      isVisible: props.isVisible,
      selectables: props.selectables,
      onPressDone: props.onPressDone,
      selected: props.selected
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isVisible != nextProps.isVisible) {
      this.setState({ isVisible: nextProps.isVisible });
    }
    if (this.state.selectables != nextProps.selectables) {
      this.setState({ selectables: nextProps.selectables });
    }
    if (this.state.selected != nextProps.selected) {
      this.setState({ selected: nextProps.selected });
    }
  }

  onPressItem = id => {
    const { selected } = this.state;

    const index = selected.indexOf(id);
    const newSelected = selected.splice(0);
    if (index != -1) {
      newSelected.splice(index, 1);
    } else {
      newSelected.push(id);
    }
    this.setState({ selected: newSelected });
  };

  renderSelectable = ({ item }) => {
    return (
      <SelectableItem
        id={item.id}
        onPressItem={this.onPressItem}
        selected={this.state.selected.indexOf(item.id) != -1}
        text={item.text}
      />
    );
  };

  render() {
    const { isVisible, selectables, onPressDone } = this.state;

    return (
      <Modal isVisible={isVisible}>
        <SafeAreaView style={ContainerStyles.full}>
          <View style={ContainerStyles.modal}>
            <Button title="Done" onPress={onPressDone} />
            <FlatList
              style={ContainerStyles.full}
              data={selectables}
              extraData={this.state}
              renderItem={this.renderSelectable}
              keyExtractor={extractKey}
            />
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

AppRegistry.registerComponent("SelectionScreen", () => SelectionScreen);
