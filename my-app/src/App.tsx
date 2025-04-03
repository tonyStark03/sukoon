import Footer from "./Components/footer";
import Navbar from "./Components/Navbar";
import Vibrations from "./Components/Vibrations";





const App: React.FC = () => {
  return (
   <div className="bg-neutral-800">
    <Navbar />
    <div className="flex items-center justify-center h-screen">
      <Vibrations />
    </div>
    <Footer />
   </div>
  );
};

export default App
