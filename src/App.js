import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const BACKEND_URL = "http://localhost:4000";

const App = () => {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">React CRUD</Link>
        </div>
      </nav>
      <Routes>
        <Route index element={<HomePage></HomePage>}></Route>
        <Route path="/create" element={<CreatePage></CreatePage>}></Route>
        <Route path="/edit/:id" element={<EditPage></EditPage>}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;