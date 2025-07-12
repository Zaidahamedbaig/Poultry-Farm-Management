import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainCard from "./MainCard";
import NavBar from "./Components/NavBar/index";
import MainRouterr from "./Routes/MainRouter";
import { RouterProvider } from "react-router-dom";

function App() {
  return<>
  <RouterProvider router={MainRouterr}>
     <NavBar/>
  </RouterProvider>
  </> 
  ;
}

export default App;

