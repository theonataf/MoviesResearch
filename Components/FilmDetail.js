import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
  Platform,
} from "react-native";
import { getFilmDetailFromApi, getImageFromApi } from "../API/TMDBApi";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { NavigationTabProp } from "react-navigation-tabs";

class FilmDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    if (params.movie !== undefined && Platform.OS === "ios") {
      return {
        headerRight: (
          <TouchableOpacity
            style={styles.share_touchable_headerrightbutton}
            onPress={() => params.shareFilm()}
          >
            <Image
              style={styles.share_image}
              source={require("../Images/ic_share.png")}
            />
          </TouchableOpacity>
        ),
      };
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      movie: undefined,
      isLoading: true,
    };
  }

  componentDidMount() {
    const idFilm = this.props.navigation.getParam("idFilm");
    getFilmDetailFromApi(idFilm).then((data) => {
      this.setState({ movie: data, isLoading: false }, () => {
        this._updateNavigationParams();
      });
    });
  }

  _updateNavigationParams() {
    this.props.navigation.setParams({
      shareFilm: this._shareFilm,
      movie: this.state.movie,
    });
  }

  _shareFilm = () => {
    const { movie } = this.state;
    Share.share({ title: movie.title, message: movie.overview });
  };

  _displayFloatingActionButton() {
    const { movie } = this.state;
    if (movie !== undefined && Platform.OS === "android") {
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => this._shareFilm()}
        >
          <Image
            style={styles.share_image}
            source={require("../Images/ic_share.png")}
          />
        </TouchableOpacity>
      );
    }
  }

  _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: this.state.movie };
    this.props.dispatch(action);
  }

  _displayFavoriteImage() {
    var sourceImage = require("../Images/ic_favorite_border.png");
    if (
      this.props.favoritesFilm.findIndex(
        (item) => item.id === this.state.movie.id
      ) !== -1
    ) {
      sourceImage = require("../Images/ic_favorite.png");
    }
    return <Image source={sourceImage} style={styles.favorite_image} />;
  }

  _displayFilm() {
    const movie = this.state.movie;
    if (movie !== undefined) {
      return (
        <ScrollView
          style={styles.scrollview_container}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <Image
            style={styles.movie_image}
            source={{ uri: getImageFromApi(movie.backdrop_path) }}
          />
          <Text style={styles.title_text}>{movie.original_title}</Text>
          <TouchableOpacity
            style={styles.favorite_container}
            onPress={() => this._toggleFavorite()}
          >
            {this._displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.description_text}>{movie.overview}</Text>
          <View style={styles.details_view}>
            <Text style={styles.detail_text}>
              Released on: {movie.release_date}
            </Text>
            <Text style={styles.detail_text}>
              Vote: {movie.vote_average}/10
            </Text>
            <Text style={styles.detail_text}>
              Number of votes: {movie.vote_count}
            </Text>
            <Text style={styles.detail_text}>Budget: {movie.budget}$</Text>
            <Text style={styles.detail_text}>
              Genres: {movie.genres.map((genre) => genre.name).join(" / ")}
            </Text>
            <Text style={styles.detail_text}>
              Companies:
              {movie.production_companies
                .map((company) => company.name)
                .join(" / ")}
            </Text>
          </View>
        </ScrollView>
      );
    }
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  render() {
    const movie = this.state.movie;
    return (
      <View style={styles.main_container}>
        {this._displayFilm()}
        {this._displayLoading()}
        {this._displayFloatingActionButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  loading_container: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollview_container: {
    flex: 1,
    padding: 3,
  },
  movie_image: {
    flex: 0.3,
  },
  title_text: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "AmericanTypewriter-Bold",
    padding: 5,
    marginTop: 10,
  },
  description_text: {
    padding: 10,
    fontFamily: "American Typewriter",
    fontSize: 15,
    marginTop: 10,
  },
  details_view: {
    padding: 10,
    marginTop: 10,
  },
  detail_text: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "American Typewriter",
  },
  favorite_container: {
    alignItems: "center",
  },
  favorite_image: {
    width: 40,
    height: 40,
  },
  share_touchable_floatingactionbutton: {
    position: "absolute",
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: "#e91e63",
    justifyContent: "center",
    alignItems: "center",
  },
  share_image: {
    width: 30,
    height: 30,
  },
});

const mapStateToProps = (state) => {
  return { favoritesFilm: state.favoritesFilm };
};
export default connect(mapStateToProps)(FilmDetail);
