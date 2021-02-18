import "./App.css";
import { Container } from "@material-ui/core";
import Header from "./components/Header";
import Widgets from "./components/Widgets";
import Weather from "./pages/Weather/Weather";
import Event from "./pages/Event/Event";
import Traffic from "./pages/Traffic/Traffic";

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <Container maxWidth="lg">
        {/* <Traffic /> */}
        <Weather />
=======
      <Container maxWidth="lg"> 
        {<Header /> }
        {<Widgets /> }
        {/* Will contain all the widgets for the dasboard (Weather, traffic ,etc) <Weather /> */}
        <Event/>
        <Traffic />
        {/* <Weather /> */}
>>>>>>> cfd8ab39a781b79e83af23bdd1a6d8b98f098242
        {/* <Header /> App Header/Toolbar
        <Widgets /> */}
        {/* Will contain all the widgets for the dasboard (Weather, traffic ,etc) */}
      </Container>
    </div>
  );
}

export default App;
