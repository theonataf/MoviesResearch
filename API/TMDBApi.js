const API_KEY = "778dab49f6addf82a9c4a87816d653e0";

export function getFilmsFromApiWithSearchText(text, page) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${text}&page=${page}`;

  return fetch(url)
    .then(response => response.json())
    .catch(err => console.log(err));
}

export function getImageFromApi(name) {
  return "https://image.tmdb.org/t/p/w300" + name;
}
