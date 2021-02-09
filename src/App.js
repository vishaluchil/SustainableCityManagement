import "./App.css";
import { Container } from "@material-ui/core";
import Header from "./components/Header";
import Widgets from "./components/Widgets";
import Weather from "./pages/Weather/Weather";

function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        {/* <Weather /> */}
        <Header /> {/* App Header/Toolbar */}
        <Widgets />
        {/* Will contain all the widgets for the dasboard (Weather, traffic ,etc) */}
      </Container>
    </div>
  );
}

export default App;
