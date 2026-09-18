import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Story from "./sections/Story";
import ProductsServices from "./sections/ProductsServices";
import Approach from "./sections/Approach";
import Process from "./sections/Process";
import Production from "./sections/Production";
import Team from "./sections/Team";
import Clients from "./sections/Clients";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Story />
        <ProductsServices />
        <Process />
        <Production />
        <Approach />
        <Team />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}