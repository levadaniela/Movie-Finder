import React, { useState, useEffect } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import CardMovie from "./components/Card";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourite from "./components/AddToFavourite";
import RemoveFavourites from "./components/RemoveFavourites";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=1be79423`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  //We're using a useEffect to make sure the API call only happens when the app loads for the first time
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);
  //We're using the useEffect hook to retrieve favourites from local storage when the app loads, and we're setting this to state
  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-finder-app-favourites")
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);
  //This function takes a list of items, and saves them to local storage against a key. In this case the key is react-movie-app-favourites.
  const saveToLocalStorage = (items) => {
    localStorage.setItem(
      "react-movie-finder-app-favourites",
      JSON.stringify(items)
    );
  };
  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);

    saveToLocalStorage(newFavouriteList);
    console.log(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
    console.log(newFavouriteList);
  };
  return (
    <div className="container">
      <div className="heading">
        <MovieListHeading heading="Find your next Movie ..." />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="container">
        {/* <MovieList
          movies={movies}
          favouriteComponent={AddFavourite}
          handleFavouritesClick={addFavouriteMovie}
        /> */}

        <CardMovie movies={movies} handleFavouritesClick={addFavouriteMovie} />
      </div>
      {/* <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="row">
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div> */}
      <div className="heading">
        <MovieListHeading heading="So far your Favourites ..." />
      </div>
      <div className="container">
        <CardMovie
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
        />
      </div>
    </div>
  );
};
export default App;
