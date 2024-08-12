import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateComponent from "./components/PrivateComponent";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";
import Favorites from "./pages/Favorites";
import Payment from "./components/Payment";
import SingleRecipe from "./components/SingleRecipe";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import Footer from "./components/Footer";
import About from "./pages/About";

const App = () => {
 
  return (
    <BrowserRouter>
    <Navbar/>
     <Routes>
     <Route element={<PrivateComponent/>}>
     <Route path="/" element={<Home/>}/>
     <Route path="/about" element={<About/>}/>
     <Route path="/submit-recipe" element={<AddRecipe/>}/>
     <Route path="/favorites" element={<Favorites/>}/>
     <Route path="/payment" element={<Payment/>}/>
     <Route path="/recipe" element={<SingleRecipe/>}/>
     <Route path="/success" element={<Success/>}/>
     <Route path="/cancel" element={<Cancel/>}/>
      </Route>

      <Route path="/login" element={<Login/>}/>
      <Route path="/logout" element={<h1>logout Component</h1>}/>
      <Route path="/signup" element={<Signup/>}/>
     </Routes>
     
    <ToastContainer />
    <Footer/>

    </BrowserRouter>


  );
};

export default App;
