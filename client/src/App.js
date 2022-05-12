import "./App.scss";
import { Routes } from "./config/Routes";
import { BrowserRouter, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
// import { Searchbar } from "./components/Searchbar";

function App() {
  return (
    <div className="app">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Route
          render={(props) => (
            <>
              <Sidebar></Sidebar>
              <div className="emp-sidebar"></div>
              <div className="container">
                {/* <Searchbar></Searchbar> */}
                <Routes></Routes>
              </div>
            </>
          )}
        ></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
