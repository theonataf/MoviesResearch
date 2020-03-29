import React from "react";
import {
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";
import FilmItem from "./FilmItem";
import { getFilmsFromApiWithSearchText } from "../API/TMDBApi";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.page = 0;
    this.totalPages = 0;
    this.searchedText = "";
    this.state = {
      films: [],
      isLoading: false
    };
  }

  _loadFilms = () => {
    this.setState({ isLoading: true });
    if (this.searchedText.length > 0) {
      getFilmsFromApiWithSearchText(this.searchedText, this.page + 1).then(
        data => {
          this.page = data.page;
          this.totalPages = data.total_pages;
          this.setState({
            films: [...this.state.films, ...data.results],
            isLoading: false
          });
        }
      );
    } else {
      alert("Please type something");
    }
  };

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  _handleInputChange = text => {
    this.searchedText = text;
  };

  _searchFilms() {
    this.page = 0;
    this.totalPages = 0;
    this.setState(
      {
        films: []
      },
      () => this._loadFilms()
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <TextInput
          onChangeText={text => this._handleInputChange(text)}
          style={styles.textinput}
          placeholder="Title of the movie"
          onSubmitEditing={() => this._searchFilms()}
        />
        <Button
          styles={styles.btn}
          title="Search"
          onPress={() => this._searchFilms()}
        />
        <FlatList
          data={this.state.films}
          style={styles.movie_list}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            this.page < this.totalPages && this._loadFilms();
          }}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <FilmItem movie={item} />}
        />
        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: { height: 50 },
  mainContainer: { marginTop: 40, flex: 1 },
  movie_list: { padding: 5 },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});
export default Search;
