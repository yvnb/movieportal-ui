import * as React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Paper, Rating } from "@mui/material";

export function MovieDetailsComponent({ movieDetails }) {
  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "50%",
    maxHeight: "50%",
  });

  const navigate = useNavigate();
  const handleClick = () => {
  navigate(`/booking?title=${movieDetails.title}`) 
    
}
  return (
    <div>
      {movieDetails && (
        <Paper
          sx={{
            p: 2,
            margin: "auto",
            maxWidth: 500,
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          }}
          className="paper"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Grid item>
                    <Box display="flex" justifyContent="flex-end">
                     
                        <Img
                          alt={movieDetails.title}
                          src={
                            "https://image.tmdb.org/t/p/w500" +
                            movieDetails.poster_path
                          }
                        />
                      
                    </Box>
                  </Grid>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {movieDetails.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Overview : {movieDetails.overview}
                  </Typography>
                  <Typography variant="body2">
                    Runtime : {movieDetails.runtime} minutes
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Rating
                      name="size-medium"
                      value={movieDetails.vote_average}
                      max={10}
                      precision={0.5}
                      readOnly={true}
                    />
                    Rating : {movieDetails.vote_average}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Release Date : {movieDetails.release_date}
                  </Typography>
                  <Typography variant="body2">
                    <Button variant="contained" onClick={handleClick}>Book Now</Button>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  );
}
