import { StyleSheet } from "react-native";
import { Colors } from "../../Styles/Colors";

export const ComponentStyles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 10,
    alignItems: "center",
    backgroundColor: Colors.button
  },
  buttonText: {
    color: Colors.primary,
    fontWeight: "500",
    fontSize: 18
  },
  input: {
    height: 40,
    margin: 10,
    padding: 10,
    color: Colors.primary
  },
  toggle: {
    height: 50,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  toggleText: {
    color: Colors.primary,
    fontWeight: "normal",
    fontSize: 16
  }
});
