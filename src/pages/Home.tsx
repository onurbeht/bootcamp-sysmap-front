import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <main className="container mx-max bg-slate-600 text-cyan-50">
      <Navbar />
      <h1 className="hover:bg-pink-500 hover:text-black duration-200">Home</h1>
      <Footer />
    </main>
  );
};

export default Home;
