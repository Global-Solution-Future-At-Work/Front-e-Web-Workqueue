import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
