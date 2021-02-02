import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));

const CardMovie = (props) => {
  const classes = useStyles();

  return (
    <div className="flex-container">
      {props.movies.map((movie, index) => (
        <div>
          <Card key={index} className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={movie.Poster}
                title={movie.Poster}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {movie.Title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="h3"
                >
                  Year: {movie.Year}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
              <IconButton
                onClick={() => props.handleFavouritesClick(movie)}
                aria-label="add to favorites"
                variant="body2"
                color="textSecondary"
                component="h4"
              >
                <FavoriteIcon style={{ color: red[500] }} />
              </IconButton>

              <IconButton
                onClick={() => props.handleFavouritesClick(movie)}
                aria-label="delete"
                variant="body2"
                color="textSecondary"
                component="h4"
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </div>
      ))}
    </div>
  );
};
export default CardMovie;
