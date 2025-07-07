import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="dashboard" element={<div>Dashboard</div>} />
        <Route path="feed" element={<div>Feed Managment</div>} />
        <Route path="sales" element={<div>Sales</div>} />
        <Route path="stock" element={<div>Stock</div>} />
        <Route path="partners" element={<div>Parter Details</div>} />
        <Route path="profile" element={<div>Profile</div>} />
        <Route path="*" element={<div>404 Page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
