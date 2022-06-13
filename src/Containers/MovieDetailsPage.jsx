import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MovieDetailsComponent } from "../Components/MovieDetailsComponent";
import { MovieReviewsComponent } from "../Components/MovieReviewsComponent";

export default function MovieDetailsPage() {
  const [search] = useSearchParams();
  const [movieDetails, setMovieDetails] = useState();
  const [movieReviews, setMovieReviews] = useState([]);

  useEffect(() => {
    const movieID = search.get("id");    
    axios.get(`http://localhost:8080/api/movie/` + movieID).then((res) => {
      const movie = res.data;      
      setMovieDetails(movie);
    });
    axios.get(`http://localhost:8080/api/movie/${movieID}/reviews/`).then((res) => {
      const reviews = res.data;   
      console.log(res.data);   
      setMovieReviews(reviews);      

    });

  }, [search]);

  return ( 
    <div>
      <MovieDetailsComponent movieDetails = {movieDetails}/>
      <MovieReviewsComponent reviews = {movieReviews}/>
    </div>
  );
}

