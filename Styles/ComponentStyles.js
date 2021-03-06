import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const ComponentStyles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 2,
    alignItems: "center",
    backgroundColor: Colors.button
  },
  buttonText: {
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 18
  },
  secondaryButton: {
    backgroundColor: Colors.secondary
  },
  secondaryButtonText: {
    color: Colors.primary
  },
  input: {
    height: 40,
    margin: 10,
    padding: 10,
    fontSize: 14,
    color: Colors.black
  },
  toggle: {
    height: 50,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  toggleText: {
    color: Colors.black,
    fontWeight: "normal",
    fontSize: 16
  },
  row: {
    padding: 15,
    marginBottom: 5,
    color: Colors.black,
    fontSize: 16,
    backgroundColor: Colors.background
  },
  rowDivider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 15,
    backgroundColor: Colors.divider
  },
  rowTitle: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    color: Colors.black,
    fontSize: 16,
    backgroundColor: Colors.background
  },
  rowDetails: {
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    color: Colors.secondary,
    fontSize: 12,
    backgroundColor: Colors.background
  },
  gameIcon: {
    width: 16,
    height: 16,
    marginLeft: 5
  },
  picker: {
    margin: 10
  },
  pickerButton: {
    padding: 10,
    borderRadius: 2,
    backgroundColor: Colors.secondary
  },
  pickerPlaceholderText: {
    color: Colors.primary,
    fontWeight: "300",
    fontSize: 16
  },
  pickerFloatingText: {
    color: Colors.black,
    marginBottom: 4,
    fontWeight: "300",
    fontSize: 16
  },
  pickerText: {
    color: Colors.black,
    fontSize: 16
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
  },
  profileHeaderContext: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "500"
  },
  profileHeaderDetails: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "300"
  }
});
