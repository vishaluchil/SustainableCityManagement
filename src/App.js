import "./App.css";
import { Container } from "@material-ui/core";
import Header from "./components/Header";
import Widgets from "./components/Widgets";
import Weather from "./pages/Weather/Weather";
import Event from "./pages/Event/Event";
import Traffic from "./pages/Traffic/Traffic";
import AirQuality from "./pages/AirQuality/AirQuality";

function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        {/* {<Header />}
        {<Widgets />} */}
        {/* Will contain all the widgets for the dasboard (Weather, traffic ,etc) <Weather /> */}
        {/*<Event />*/}
        <AirQuality />
        {/* <Traffic /> */}
        <Weather />
        {/* <Header /> App Header/Toolbar */
        /*<Widgets />*/ }
        {/* Will contain all the widgets for the dasboard (Weather, traffic ,etc) */}
      </Container>
    </div>
  );
}

export default App;
