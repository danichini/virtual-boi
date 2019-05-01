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
import word from '../../utils/word.png'
import ppoint from '../../utils/ppoint.png'
import ssheet from '../../utils/ssheet.png'
import unknown from '../../utils/unknown.png'

const styles = {
  card: {
    maxWidth: 200,
    margin: 14
  },
  media: {
    objectFit: 'cover',
    width: 200
  },
  container: {
    display: 'flex',
    flexFlow: 'row wrap'
  },
};

function ImgMediaCard (props) {
  const { classes, biglist } = props;
  const resources = biglist.map((value) =>
  <Card className={classes.card}>
  <CardActionArea>
    <CardMedia
      component="img"
      alt="Contemplative Reptile"
      className={classes.media}
      height="160"
      image={
        (value[2].split('/').pop() === 'jpeg' || value[2].split('/').pop() === 'png') ? value[3]
        : value[2].split('/').pop() === 'pdf' ? pdf
        : value[2].split('.').pop() === 'document' ? word
        : value[2].split('.').pop() === 'presentation' ? ppoint
        : value[2].split('.').pop() === 'sheet' ? ssheet
        : unknown
      }
      title={value[1]}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        {value[1]}
      </Typography>
      <Typography component="p">
        {value[0]}
      </Typography>
    </CardContent>
  </CardActionArea>
  <CardActions>
    
    <a href={value[3]} download>
      <Button size="small" color="primary" >
        Descargar
      </Button>
    </a>
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
