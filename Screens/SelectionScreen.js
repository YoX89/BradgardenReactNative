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
import { ContainerStyles } from "../Styles/ContainerStyles";

const extractKey = ({ id }) => id.toString();

export default class SelectionScreen extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      selectedIds: props.selectedIds
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.selectedIds != nextProps.selectedIds) {
      this.setState({ selectedIds: nextProps.selectedIds });
    }
  }

  onPressItem = id => {
    const { selectedIds } = this.state;

    if (this.props.selectMultiple) {
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
    const { selectedIds } = this.state;
    const { selectables, onPressDone } = this.props;
    const selectedObjects = selectables.filter(
      selectable => selectedIds.indexOf(selectable.id) != -1
    );
    onPressDone(selectedObjects);
  };

  render() {
    const { isVisible, selectables } = this.props;

    return (
      <Modal isVisible={isVisible}>
        <SafeAreaView style={ContainerStyles.full}>
          <View style={ContainerStyles.modal}>
            <FlatList
              style={ContainerStyles.full}
              data={selectables}
              extraData={this.state}
              renderItem={this.renderSelectable}
              keyExtractor={extractKey}
            />
            <Button title="Done" onPress={this.onPressDone} />
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

AppRegistry.registerComponent("SelectionScreen", () => SelectionScreen);
