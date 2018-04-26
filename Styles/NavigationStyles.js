import { Colors } from "./Colors";

export const NavigationStyles = {
  navigationOptions: {
    headerTintColor: Colors.primary,
    headerStyle: {
      backgroundColor: Colors.bar
    }
  },
  cardStyle: {
    backgroundColor: Colors.background
  },
  tabBarOptions: {
    activeTintColor: Colors.primary,
    inactiveTintColor: Colors.black,
    indicatorStyle: {
      backgroundColor: Colors.primary
    },
    style: {
      backgroundColor: Colors.bar
    }
  }
};
