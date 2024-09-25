import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseURL = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [{trailerURL, movie}, setTrailerURL] = useState({});

  const handleClick = (nextMovie) => {
    if (movie == nextMovie) {
      setTrailerURL({});
    } else {
      movieTrailer(nextMovie?.name || "").then(url => {
        const urlParams = new URLSearchParams(new URL(url).search);
        const u = urlParams.get('v');
        setTrailerURL({ u, nextMovie });
      }).catch(error => (console.log(error)));
    }
  }
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    }
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => {
              handleClick(movie)
            }}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${baseURL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerURL && <Youtube videoId={trailerURL} opts={opts} />}
    </div>
  );
}

export default Row;
