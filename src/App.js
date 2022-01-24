import './App.scss';
import './basic_scss/_variables.scss'
import Header from "./components/header/Header";
import AppBody from "./components/AppBody/AppBody";
import {BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
      <Router>
          <Header/>
          <AppBody />
      </Router>
  );
}

export default App;
