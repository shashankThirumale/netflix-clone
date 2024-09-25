import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseURL = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerURL, setTrailerURL] = useState("");

  const handleClick = (nextMovie) => {
    if (trailerURL && trailerURL.movieId === nextMovie.id) {
      setTrailerURL("");
    } else {
      movieTrailer(nextMovie?.name || "")
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search);
          const videoId = urlParams.get('v');
          setTrailerURL({ videoId, movieId: nextMovie.id });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchURL]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`}
            src={`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerURL && <Youtube videoId={trailerURL.videoId} opts={opts} />}
    </div>
  );
}

export default Row;