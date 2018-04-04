import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const ContainerStyles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  full: {
    flex: 1
  },
  modal: {
    flex: 1,
    borderRadius: 4,
    borderColor: Colors.primary,
    borderWidth: 1,
    backgroundColor: Colors.background
  },
  centerLoading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});
