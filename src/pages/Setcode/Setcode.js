import React, { useState, useEffect, useRef } from "react";
import { hsla } from "polished";
import { Grid, TextField } from "@material-ui/core";
import DropdownList from "../../common/DropdownList/DropdownList";
import { generateHslaColors } from "../../utils/colorGenerator";

const patterns = [4, 8, 16];
const durations = [0.1, 0.25, 0.5, 0.75, 1, 2, 3, 4];

const Setcode = () => {
    const [pattern, setPattern] = useState(4);
    const [duration, setDuration] = useState(0.1);
    const [code, setCode] = useState("");
    const [exampleCode, setExampleCode] = useState("");

    const [allCodeInPattern, setAllCodeInPattern] = useState(null);
    const [i, setI] = useState(-1);
    const [codeArr, setCodeArr] = useState([]);
    const breakerCode = [0, 0, 0.2, 1];
    const [colorCode, setColorCode] = useState(breakerCode);

    const [polling, setPolling] = useState(null);

    const minCodeLen = 1;
    const maxCodeLen = 10;

    const handleTextFieldInput = (e) => {
        const input = e.target.value;
        switch (pattern) {
            case 8:
                const regex8 = /^[0-7]*$/;
                if (regex8.test(input)) {
                    setCode(input);
                }
                break;
            case 16:
                const regex16 = /^[0-9a-fA-F]*$/;
                if (regex16.test(input)) {
                    setCode(input);
                }
                break;
            default:
                const regex4 = /^[0-3]*$/;
                if (regex4.test(input)) {
                    setCode(input);
                }
                break;
        }
    };

    useEffect(() => {
        if (setCodeArr.length) {
            setPolling(duration * 1000);
        }
    }, [duration]);

    useEffect(() => {
        switch (pattern) {
            case 8:
                setExampleCode(`[0-7], max 10 chars`);
                break;
            case 16:
                setExampleCode(`[0-9a-fA-F], max 10 chars`);
                break;
            default:
                setExampleCode(`[0-3], max 10 chars`);
                break;
        }
        setAllCodeInPattern(generateHslaColors(pattern));
    }, [pattern]);

    useEffect(() => {
        if (pattern === 16) {
            setCodeArr(
                code.split("").map((digit) => {
                    return parseInt(Number(`0x${digit}`), 10);
                })
            );
        } else {
            setCodeArr(code.split(""));
        }
        setPolling(duration * 1000);
        if (!code.length) {
            setI(-1);
            setPolling(null);
        }
    }, [code]);

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
            setColorCode(breakerCode);
        } else {
            if (codeArr.length) {
                setColorCode(allCodeInPattern[codeArr[i]]);
            }
        }
    }, [i]);

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            style={{
                background: hsla(
                    colorCode[0], // hue
                    colorCode[1], // saturation
                    colorCode[2], // lightness
                    colorCode[3] // alpha
                ),
                height: "100vh",
            }}
        >
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <DropdownList
                    arr={patterns}
                    label="Pattern"
                    setValue={(selectedItem) => setPattern(selectedItem)}
                />
                <DropdownList
                    arr={durations}
                    label="Duration (seconds)"
                    setValue={(selectedItem) => setDuration(selectedItem)}
                />
                <Grid>
                    <TextField
                        fullWidth
                        placeholder={exampleCode}
                        onChange={(e) => handleTextFieldInput(e)}
                        value={code}
                        id="name"
                        label="Code"
                        type="text"
                        inputProps={{ maxLength: maxCodeLen }}
                    />
                    <Grid style={{ fontSize: "15px" }}>
                        now : {codeArr[i] >= 0 ? codeArr[i] : "-"} hsla(
                        {colorCode[0]},{colorCode[1]},{colorCode[2]},
                        {colorCode[3]})
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Setcode;
