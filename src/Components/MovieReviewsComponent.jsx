import { Avatar, Box, Container, Grid, Paper } from "@material-ui/core";
import Typography from '@mui/material/Typography';

export function MovieReviewsComponent({reviews = []}){

    return (
        <Container>
        {reviews && reviews.map(review => (
        <Paper
        sx={{
          p: 2,
          margin: 'auto',
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <Avatar sx={{ width: 56, height: 56 }}>{review.author}</Avatar>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography style={{ fontWeight: 600 }} gutterBottom variant="subtitle1" component="div">
                 A Review By : {review.author ? review.author : 'Anonymous'}
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div">
                   written by {review.author ? review.author : 'Anonymous'} on {review.created_at}                   
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div">
                        Rating : {review.author_details.rating}/10
                </Typography>
                <Typography variant="body2" gutterBottom>
                    {review.content}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      ))}
      </Container>

    );

}