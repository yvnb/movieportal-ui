
import { Container, Grid } from "@mui/material";
import { MovieComponent } from "./MovieComponent";

export function MovieListComponent({movies = []}){
    
    return (
        <Container>
            <Grid container spacing={3} justifyContent="center">
                {movies && movies.map(movie => (
                    <Grid item key={movie.id}>
                        <MovieComponent movie={movie} />
                    </Grid>    
                ))}
            </Grid>
        </Container>
    );

}


