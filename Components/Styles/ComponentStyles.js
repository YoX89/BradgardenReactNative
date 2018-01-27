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
  }
});
