import React from "react";
import CustomButton from "./components/atoms/CustomButton/CustomButton";
import CustomInput from "./components/atoms/CustomInput/CustomInput";
import AdCard from "./components/molecules/AdCard/AdCard";
import Navbar from "./components/organisms/Navbar/Navbar";
import AdPage from "./Pages/AdPage";
import Home from "./Pages/Home";

function App() {
  return (
    <div>
      <div>
        <Navbar />
        {/* <Home /> */}
        <AdPage />
      </div>
    </div>
  );
}

export default App;
