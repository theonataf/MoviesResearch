import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Search from "../Components/Search";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import FilmDetail from "../Components/FilmDetail";
import Favorites from "../Components/Favorites";
import { Image, StyleSheet } from "react-native";
import Test from "../Components/Test";

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: "Search"
    }
  },
  FilmDetail: {
    screen: FilmDetail,
    navigationOptions: {
      title: "Details"
    }
  }
});

const FavoriteStackNavigator = createStackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      title: "Favorites"
    }
  },
  FilmDetail: {
    screen: FilmDetail,
    navigationOptions: {
      title: "Details"
    }
  }
});

const MoviesTabNavigator = createBottomTabNavigator(
  {
    Test: {
      screen: Test
    },
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <Image
              source={require("../Images/ic_search.png")}
              style={styles.icon}
            />
          );
        }
      }
    },
    Favorites: {
      screen: FavoriteStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <Image
              source={require("../Images/ic_favorite.png")}
              style={styles.icon}
            />
          );
        }
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      activeBackgroundColor: "#DDDDDD",
      inactiveBackgroundColor: "#FFFFFF"
    }
  }
);

export default createAppContainer(MoviesTabNavigator);

const styles = StyleSheet.create({
  icon: { width: 30, height: 30 }
});
