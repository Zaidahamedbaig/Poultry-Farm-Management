import "./App.css";
import NavBar from "./Components/NavBar/index";
import MainRouterr from "./Routes/MainRouter";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={MainRouterr}>
          <NavBar />
        </RouterProvider>
      </Provider>
    </>
  );
}

export default App;
