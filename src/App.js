import React from "react";
import CustomButton from "./components/atoms/CustomButton/CustomButton";
import CustomInput from "./components/atoms/CustomInput/CustomInput";

function App() {
  return (
    <div>
      <h1 className="font-bold underline">Shivansh</h1>
      <CustomInput placeholder="Find Cars, Mobile, etc" />
      <CustomButton
        text="My click"
        className="color-white p-2"
        onClick={() => {
          alert("clicked");
        }}
      />
    </div>
  );
}

export default App;
