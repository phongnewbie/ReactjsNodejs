import "./App.css";
import HomePage from "./Components/Home/HomePage"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NavBar from "./Components/NavBar/NavBar";
import { useState } from "react";
import MessageBot from "./Components/ChatBot/MessageBot"
import Product from "./Components/ProductHome/Product";
import "./dist/output.css"
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import ContactAdmin from "./Components/Contact/ContactAdmin";
import AdminPage from "./Components/AdminPage/AdminPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ChatBotAdmin from "./Components/ChatBotAdmin/ChatBotAdmin";
import HandleUserInput from "./Components/ChatBot/HandleUserInput";
function App() {
  const [theme, setTheme] = useState('light');
  return (
    <Router>
      
      <div className="App"> 
      <NavBar />
        <Routes>
          {/* <Route path="/ChatBotAdmin" element={<ChatBotAdmin/>}/> */}
          
          <Route path="/AdminPage" element={<AdminPage/>}/>
           <Route path="/MessageBot" element={<MessageBot/>}/> 
          <Route path="/ContactAdmin" element={<ContactAdmin/>}/>
          <Route path="/productDetails" element={<ProductDetails/>}/>
          <Route path="/"exact element={<HomePage />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={<Register />} />
          
        </Routes>
        
      </div>
     
    </Router>
  );
}

export default App;
