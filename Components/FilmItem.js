import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { getImageFromApi } from "../API/TMDBApi";
import FadeIn from "../Animations/FadeIn";

class FilmItem extends Component {
  _displayIfFavorite() {
    if (this.props.isFavorite) {
      return (
        <Image
          style={styles.favoriteImage}
          source={require("../Images/ic_favorite.png")}
        />
      );
    }
  }

  render() {
    const {
      id,
      vote_average,
      poster_path,
      original_title,
      overview,
      release_date,
    } = this.props.movie;
    return (
      <FadeIn>
        <TouchableOpacity
          onPress={() => this.props.displayDetailForFilm(id)}
          style={styles.main_container}
        >
          <Image
            style={styles.movies_image}
            source={{ uri: getImageFromApi(poster_path) }}
          />
          <View style={styles.movies_infos}>
            <View style={styles.header}>
              {this._displayIfFavorite()}
              <Text style={styles.movie_title}>{original_title}</Text>
              <Text style={styles.movie_vote}> {vote_average}</Text>
            </View>
            <View style={styles.movie_description}>
              <Text style={styles.description_text} numberOfLines={6}>
                {overview}
              </Text>
            </View>
            <View style={styles.movie_date}>
              <Text>Released on {release_date}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </FadeIn>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    height: 150,
    flexDirection: "row",
    marginBottom: 10,
    padding: 2,
  },
  movies_image: {
    backgroundColor: "grey",
    flex: 1,
  },
  movies_infos: {
    flex: 3,
    marginLeft: 3,
    paddingVertical: 0,
    paddingHorizontal: 3,
    justifyContent: "space-evenly",
  },
  header: {
    flexDirection: "row",

    alignItems: "center",
    padding: 3,
  },
  movie_title: { flex: 3, fontWeight: "bold", fontSize: 17, flexWrap: "wrap" },
  movie_vote: {
    flex: 1,
    textAlign: "right",
    color: "grey",
    fontWeight: "bold",
    fontSize: 17,
  },
  movie_description: {
    height: 80,
  },
  description_text: { fontStyle: "italic", color: "grey" },
  movie_date: {
    padding: 5,
    alignItems: "flex-end",
  },
  favoriteImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default FilmItem;
