import './App.scss';
import './basic_scss/_variables.scss'
import Header from "./components/header/Header";
import AppBody from "./components/AppBody/AppBody";
import data from "./firebaseConfig";

console.log(data)

function App() {
  return (
      <>
        <Header/>
        <AppBody />
      </>

  );
}

export default App;
