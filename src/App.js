import "./App.css";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from "./components/Header/Header";
import Widgets from "./components/Widgets";
import Weather from "./pages/Weather/Weather";
import Event from "./pages/Event/Event";
import Traffic from "./pages/Traffic/Traffic";
import AirQuality from "./pages/AirQuality/AirQuality";

function App() {
  return (
    <Router>
      <div className="App">
        <Container maxWidth="lg">
          {/* {<Header />}
        {<Widgets />} */}
          {/* Will contain all the widgets for the dasboard (Weather, traffic ,etc) <Weather /> */}
          {/*<Event />*/}
          {/* <AirQuality /> */}
          {/* <Traffic /> */}
          {/* <Weather /> */}
          <Header />
          <Switch>
            <Route path="/" exact component={Widgets} />
            <Route path="/weather" component={Weather} />
            <Route path="/traffic" component={Traffic} />
            <Route path="/event" component={Event} />
            <Route path="/air" component={AirQuality} />
          </Switch>
          {/* <Widgets /> */}
          {/* Will contain all the widgets for the dasboard (Weather, traffic ,etc) */}
        </Container>
      </div>
    </Router>
  );
}

export default App;
