import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import FilmList from "./FilmList";
import { connect } from "react-redux";

class Favorites extends Component {
  render() {
    return (
      <FilmList
        movies={this.props.favoritesFilm}
        navigation={this.props.navigation}
        favoriteList={true}
      />
    );
  }
}

const mapStateToProps = state => {
  return { favoritesFilm: state.favoritesFilm };
};
export default connect(mapStateToProps)(Favorites);
