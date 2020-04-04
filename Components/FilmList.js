import React, { Component } from "react";
import { FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import FilmItem from "./FilmItem";

class FilmList extends Component {
  constructor(props) {
    super(props);
  }
  _findIfFavorite(movie) {
    const favoriteFilmIndex = this.props.favoritesFilm.findIndex(
      item => item.id === movie.id
    );
    return favoriteFilmIndex === -1 ? false : true;
  }

  _displayDetailForFilm = idFilm => {
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm });
  };

  render() {
    return (
      <FlatList
        data={this.props.movies}
        extraData={this.props.favoritesFilm}
        style={styles.movie_list}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          !this.props.favoriteList &&
            this.props.page < this.props.totalPages &&
            this.props.loadFilms();
        }}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <FilmItem
            isFavorite={this._findIfFavorite(item)}
            movie={item}
            displayDetailForFilm={this._displayDetailForFilm}
          />
        )}
      />
    );
  }
}

const mapStateToProps = state => {
  return { favoritesFilm: state.favoritesFilm };
};
export default connect(mapStateToProps)(FilmList);

const styles = StyleSheet.create({
  movie_list: { padding: 5 }
});
