import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import pdf from '../../utils/pdf.jpg'

const styles = {
  card: {
    maxWidth: '20%',
    margin: 14
  },
  media: {
    objectFit: 'cover',
  },
  container: {
    display: 'flex',
    flexFlow: 'row wrap'
  },
};

const content = [1,2,3,4,5,6,7,8]

function ImgMediaCard(props) {
  const { classes } = props;
  const resources = content.map((number) =>
  <Card className={classes.card}>
  <CardActionArea>
    <CardMedia
      component="img"
      alt="Contemplative Reptile"
      className={classes.media}
      height="20%"
      image={pdf}
      title="Contemplative Reptile"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        Lizard
      </Typography>
      <Typography component="p">
        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
        across all continents except Antarctica
      </Typography>
    </CardContent>
  </CardActionArea>
  <CardActions>
    <Button size="small" color="primary">
      Descargar
    </Button>
  </CardActions>
  </Card>
  );
  return (
    <div className={classes.container}>
      {resources}
    </div>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);
