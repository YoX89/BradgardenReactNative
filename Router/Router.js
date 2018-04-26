import React from "react";
import { TabNavigator, TabBarBottom, StackNavigator } from "react-navigation";
import MemberListScreen from "../Screens/MemberListScreen";
import GameListScreen from "../Screens/GameListScreen";
import AddSessionScreen from "../Screens/AddSessionScreen";
import SessionListScreen from "../Screens/SessionListScreen";
import { Colors } from "../Styles/Colors";
import { ButtonStyles } from "../Styles/ButtonStyles";
import { NavigationStyles } from "../Styles/NavigationStyles";
import { Image } from "react-native";

const SessionsTab = StackNavigator(
  {
    AddSession: {
      screen: AddSessionScreen,
      navigationOptions: {
        title: "Add Session"
      }
    },
    SessionList: {
      screen: SessionListScreen,
      navigationOptions: {
        title: "Previous Session"
      }
    }
  },
  {
    navigationOptions: NavigationStyles.navigationOptions,
    cardStyle: NavigationStyles.cardStyle
  }
);

const GamesTab = StackNavigator(
  {
    GameList: {
      screen: GameListScreen,
      navigationOptions: {
        title: "Games"
      }
    }
  },
  {
    navigationOptions: NavigationStyles.navigationOptions,
    cardStyle: NavigationStyles.cardStyle
  }
);

const MembersTab = StackNavigator(
  {
    MemberList: {
      screen: MemberListScreen,
      navigationOptions: {
        title: "Members"
      }
    }
  },
  {
    navigationOptions: NavigationStyles.navigationOptions,
    cardStyle: NavigationStyles.cardStyle
  }
);

export const Tabs = TabNavigator(
  {
    Sessions: {
      screen: SessionsTab,
      navigationOptions: {
        tabBarLabel: "Add session",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../Images/add_session.png")}
            style={[ButtonStyles.tabIcon, { tintColor: tintColor }]}
          />
        )
      }
    },
    Games: {
      screen: GamesTab
    },
    Members: {
      screen: MembersTab
    }
  },
  {
    tabBarOptions: NavigationStyles.tabBarOptions,
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    swipeEnabled: true
  }
);
