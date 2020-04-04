const initialState = { favoritesFilm: [] };

function toggleFavorite(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      const favoriteFilmIndex = state.favoritesFilm.findIndex(
        item => item.id === action.value.id
      );
      if (favoriteFilmIndex !== -1) {
        //removing from list
        nextState = {
          ...state,
          favoritesFilm: state.favoritesFilm.filter(
            (item, index) => index !== favoriteFilmIndex
          )
        };
      } else {
        //adding the movie
        nextState = {
          ...state,
          favoritesFilm: [...state.favoritesFilm, action.value]
        };
      }
      return nextState || state;

    default:
      return state;
  }
}

export default toggleFavorite;

// const initialState = {
//   historicFilms: []
// }

// function manageHistoricFilms(state = initialState, action) {
//   let nextState;
//   switch(action.type){
//     case "TOGGLE_FILMDETAIL":
//       if(state.historicFilms.findIndex(item => item.id === action.value.id) === -1) {
//         nextState = {...state, historicFilms: [...state.historicFilms , action.value]}
//       }
//       return nextState || state
//     case "REMOVE_HISTORIC_FILM":
// nextState = {...state, historicFilms: state.historicFilms.filter(item => item.id!== action.value.id )}
// return nextState || state
//     case "RESET_HISTORIC":
//       nextState = {...state, historicFilms:[] }
//       return nextState || state
//     default:
//     return state
//   }

// }

// export default manageHistoricFilms
