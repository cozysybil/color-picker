import React, { useState, useEffect } from "react";
import "./Code.css";

const Code = ({ setupCode, codeSetting }) => {
  const { pattern, duration, code } = codeSetting;
  console.log(pattern)
  console.log(duration)
  console.log(code)
  return (
    <div>
      <div className="logout_button" onClick={() => setupCode()}>
        click to set new code : {code}
      </div>
      <h2>Hello, {code}</h2>
    </div>
  );
};

export default Code;
