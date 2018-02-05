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
      selectedIds: props.selectedIds,
      selectMultiple: props.selectMultiple
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isVisible != nextProps.isVisible) {
      this.setState({ isVisible: nextProps.isVisible });
    }
    if (this.state.selectables != nextProps.selectables) {
      this.setState({ selectables: nextProps.selectables });
    }
    if (this.state.selectedIds != nextProps.selectedIds) {
      this.setState({ selectedIds: nextProps.selectedIds });
    }
    if (this.state.selectMultiple != nextProps.selectMultiple) {
      this.setState({ selectMultiple: nextProps.selectMultiple });
    }
    if (this.state.onPressDone != nextProps.onPressDone) {
      this.setState({ onPressDone: nextProps.onPressDone });
    }
  }

  onPressItem = id => {
    const { selectedIds } = this.state;

    if (this.state.selectMultiple) {
      const index = selectedIds.indexOf(id);
      const newSelected = selectedIds.splice(0);
      if (index != -1) {
        newSelected.splice(index, 1);
      } else {
        newSelected.push(id);
      }
      this.setState({ selectedIds: newSelected });
    } else {
      this.setState({ selectedIds: [id] });
    }
  };

  renderSelectable = ({ item }) => {
    return (
      <SelectableItem
        id={item.id}
        onPressItem={this.onPressItem}
        selected={this.state.selectedIds.indexOf(item.id) != -1}
        text={item.text}
      />
    );
  };

  onPressDone = () => {
    const {
      selectables,
      selectedIds,
      selectMultiple,
      onPressDone
    } = this.state;
    const selectedObjects = selectables.filter(
      selectable => selectedIds.indexOf(selectable.id) != -1
    );
    onPressDone(selectedObjects);
  };

  render() {
    const { isVisible, selectables } = this.state;

    return (
      <Modal isVisible={isVisible}>
        <SafeAreaView style={ContainerStyles.full}>
          <View style={ContainerStyles.modal}>
            <Button title="Done" onPress={this.onPressDone} />
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
