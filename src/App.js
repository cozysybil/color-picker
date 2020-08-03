import React, { useState } from "react";

import Code from "./pages/Code/Code";
import Setcode from "./pages/Setcode/Setcode";
const App = () => {
    const [code, setCode] = useState(null);

    return (
            <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
                {code ? (
                    <Code setupCode={() => setCode(null)} codeSetting={code} />
                ) : (
                    <Setcode showCode={(codeSetting) => setCode(codeSetting)} />
                )}
            </div>
    );
};

export default App;
