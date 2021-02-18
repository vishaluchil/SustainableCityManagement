import "./App.css";
import { Container } from "@material-ui/core";
import Header from "./components/Header";
import Widgets from "./components/Widgets";
import Weather from "./pages/Weather/Weather";
import Event from "./pages/Event/Event";

function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        
        <Event />
        {<Header /> }
        {<Widgets /> }
        {/* Will contain all the widgets for the dasboard (Weather, traffic ,etc) <Weather /> */}
      </Container>
    </div>
  );
}

export default App;
