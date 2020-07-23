import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import Code from "./pages/Code/Code";
import Setcode from "./pages/Setcode/Setcode";
const App = () => {
    const [code, setCode] = useState(null);

    const handle = useFullScreenHandle();

    return (
        <FullScreen handle={handle}>
            <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
                <Button
                    variant="dark"
                    onClick={handle.active ? handle.exit : handle.enter}
                    size="sm"
                    block
                >
                    {handle.active ? "Exit fullscreen" : "Enter fullscreen"}
                </Button>
                {code ? (
                    <Code setupCode={() => setCode(null)} codeSetting={code} />
                ) : (
                    <Setcode showCode={(codeSetting) => setCode(codeSetting)} />
                )}
            </div>
        </FullScreen>
    );
};

export default App;
