import React, { useState, useEffect, useRef } from "react";
import { generateHslaColors } from "../../utils/colorGenerator";
import { hsla } from "polished";
import { Button } from "react-bootstrap";
import "./Code.css";

const Code = ({ setupCode, codeSetting }) => {
    const { pattern, duration, code } = codeSetting;
    const [polling] = useState(duration * 1000);
    const [i, setI] = useState(0);
    const [allCodeInPattern] = useState(generateHslaColors(pattern));
    const [codeArr] = useState(
        code.split("").map((digit) => {
            return parseInt(Number(`0x${digit}`), 10);
        })
    );
    const [colorCode, setColorCode] = useState(allCodeInPattern[codeArr[i]]);

    const useInterval = (callback, intervalDelay) => {
        const savedCallback = useRef();

        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        useEffect(() => {
            const tick = () => {
                savedCallback.current();
            };
            if (intervalDelay !== null) {
                const id = setInterval(tick, intervalDelay);
                return () => clearInterval(id);
            }
        }, [intervalDelay]);
    };

    useInterval(() => {
        if (i < codeArr.length - 1) {
            setI(i + 1);
        } else if (i < 0) {
            setI(0);
        } else {
            setI(-1);
        }
    }, [polling]);

    useEffect(() => {
        if (i < 0) {
            setColorCode([0, 1, 1, 1]);
        } else {
            setColorCode(allCodeInPattern[codeArr[i]]);
        }
    }, [i]);

    return (
        <div
            style={{
                background: hsla(
                    colorCode[0], // hue
                    colorCode[1], // saturation
                    colorCode[2], // lightness
                    colorCode[3] // alpha
                ),
                minHeight: "100vh",
            }}
        >
            <div>
                <Button
                    onClick={setupCode}
                    variant="outline-dark"
                    style={{ margin: "1vh" }}
                >
                    Set new code
                </Button>
                code : {code}, current :
                {codeArr[i] >= 0 ? codeArr[i] : "Breaker"}
            </div>
            <span style={{ marginLeft: "1vh" }}>
                hsla(hue:{colorCode[0]}, saturation:{colorCode[1]}, lightness:
                {colorCode[2]}, alpha:{colorCode[3]})
            </span>
        </div>
    );
};

export default Code;
