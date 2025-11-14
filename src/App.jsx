import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import { Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Routes>
        
            <Route path= "/" element={<HomePage />} />
       
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
