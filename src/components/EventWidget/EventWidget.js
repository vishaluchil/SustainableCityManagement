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
    var items = [
    {
        name: "Music of Chopin",
        link: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F125694371%2F479275886939%2F1%2Foriginal.20210210-014026?w=800&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C20%2C1280%2C640&s=60bd9398602f0cd65a0f49e1f1e83d38",
        date: new Date(1629869754776).toLocaleDateString()
    },
    {
        name: "Sport Workshop",
        link: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F116485485%2F318748095583%2F1%2Foriginal.20200306-003452?w=800&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C63%2C1600%2C800&s=8c7ce20d21498bdf78c9c33e574b76ea",
        date: new Date(1623469754776).toLocaleDateString()
    },
    {
      name: "Harmony",
      link: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F133586755%2F100674844133%2F1%2Foriginal.20210428-004408?w=800&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C85%2C1920%2C960&s=1565cced3629db01fb003d120029ab08",
      date: new Date(1623419111776).toLocaleDateString()
  }
  ]

  return (

    <Card className={classes.root}raised>
    <div>
      <a href="#">      
        <Carousel 
        navButtonsProps={{ style: {backgroundColor: 'cornflowerblue',opacity: 0.2}}}
        navButtonsWrapperProps={{ style: { bottom: '-25%', top: 'unset'} }} >
          {
            items.map( (item, i) => <CarouselSlide key={i} item={item} /> )
          }
        </Carousel>
      </a>
    </div>
    </Card>
  );
}