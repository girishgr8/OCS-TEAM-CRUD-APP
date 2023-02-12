import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./components/Home/Home";
import AddEdit from "./components/AddEdit/AddEdit";


function App() {
  const successToast = () => toast.success("User added !");
  const errorToast = () => toast.error("Cannot add user !");
  const warningToast = () => toast.warning("Warning !");
  const infoToast = () => toast.info("Info");

  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addEditUser" element={<AddEdit />} />
          <Route exact path="/addEditUser/:id" element={<AddEdit />} />


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
