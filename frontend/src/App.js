//react router according to new version
//Note:-there is no switch now
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Signup from "./components/signup";
import Signin from "./components/login";
import Home from "./components/home";

function App() {
  return (
    // using react router
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/" element={<Home/>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
