import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Frontend/components/LOGIN&REGISTRATION/Login/Login";
import Signup from "./Frontend/components/LOGIN&REGISTRATION/Signup/Signup";
import Home from "./Frontend/components/Home/home";
import NavBar from "./Frontend/components/Home/Navbar";
import Footer from "./Frontend/components/Home/Footer";
import MiniNavBar from "./Frontend/components/Home/Mininavbar";
import Chatbot from "./Frontend/components/chatbot/chatbot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Home />
              <Chatbot />
              <Footer />
            </>
          }
        />
        
        <Route
          path="/login"
          element={
            <>
              <MiniNavBar />
              <Login />
            </>
          }
        />
        
        <Route
          path="/signup"
          element={
            <>
              <MiniNavBar />
              <Signup />
            </>
          }
        />
        
        {/* ✅ Route for /home */}
        <Route
          path="/home"
          element={
            <>
              <NavBar />
              <Home />
              <Chatbot />
              <Footer />
            </>
          }
        />
        
        {/* ✅ Route for Chatbot Page */}
        <Route
          path="/chatbot"
          element={
            <>
              <NavBar />
              <Chatbot />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
