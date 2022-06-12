import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function MovieComponent({ movie }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie?id=${movie.id}`)
    }
  return (
    <div>
        <Card onClick={handleClick}>
        <CardActionArea style={{ width: 325, height:260 }}>
            <CardMedia
            component="img"
            height="120"
            image={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path}
            alt={movie.path}
            style={{margin:0}}
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {movie.release_date}                
            </Typography>
            <Typography variant="body2" color="text.secondary">
                <Rating name="size-medium" value={movie.vote_average} max={10} precision={0.5} readOnly={true}/> 
                {movie.vote_average} 
            </Typography>  
    
            </CardContent>
        </CardActionArea>
        </Card>
    </div>    
  );
} 