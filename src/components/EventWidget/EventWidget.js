import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CarouselSlide from "./CarouselSlide.js"
import Carousel from 'react-material-ui-carousel'


const useStyles = makeStyles({
  root: {
    width: 250 ,
    height: 200 ,
    margin: 20,
  },
  media: {
    height: 100,
  },
});

export default function EventWidget() {
  const classes = useStyles();
  //Some Hardcoded values to work with. We need a title string. A url link to an image and the timestamp to the event.
  var items = [
    {
        name: "Random Name #1",
        link: "https://i.imgur.com/udfNskE.png",
        date: new Date(12121212).toLocaleDateString()
    },
    {
        name: "Random Name #2",
        link: "https://i.imgur.com/DTxieS1.png",
        date: new Date(9999999999).toLocaleDateString()
    },
    {
      name: "Random Name #3",
      link: "https://i.imgur.com/Riicmz9.jpeg",
      date: new Date(8468484).toLocaleDateString()
  }
  ]

  return (
    <Card className={classes.root}raised>
      <Carousel>
            {
                items.map( (item, i) => <CarouselSlide key={i} item={item} /> )
            }
        </Carousel>
    </Card>
  );
}