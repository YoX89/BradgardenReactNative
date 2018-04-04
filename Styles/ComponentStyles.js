import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

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
  },
  row: {
    padding: 15,
    marginBottom: 5,
    color: Colors.black,
    backgroundColor: Colors.secondary
  },
  rowSelected: {
    padding: 15,
    marginBottom: 5,
    color: Colors.primary,
    backgroundColor: Colors.secondary
  },
  picker: {
    margin: 10
  },
  pickerButton: {
    padding: 10,
    backgroundColor: Colors.secondary
  },
  pickerPlaceholderText: {
    color: Colors.primary,
    fontWeight: "500",
    fontSize: 18
  },
  pickerFloatingText: {
    color: Colors.primary,
    marginBottom: 4,
    fontWeight: "500",
    fontSize: 18
  },
  pickerText: {
    color: Colors.black,
    fontSize: 14
  },
  errorWrapper: {
    backgroundColor: Colors.error,
    margin: 10,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.primary
  },
  errorTitle: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "700"
  },
  errorMessage: {
    color: Colors.primary,
    fontSize: 16
  }
});
