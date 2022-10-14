import axios from "axios";
import { useEffect, useState } from "react";

export function useToken() {
    const tokenValue = localStorage.getItem("token");
    const [loading, setLoading] = useState(!!tokenValue);
    const [token, setToken] = useState(loading ? "loading" : "");

    const deleteToken = () => {
        setToken("");
        localStorage.removeItem("token");
    }

    const saveToken = (token) => {
        if (token && token !== "invalid") {
            setToken(token);
            localStorage.setItem("token", token);
        }
        else {
            deleteToken();
        }
    }

    const validate = async () => {
        // console.log("useToken validate");
        return (await axios.post("http://localhost:3001/token", {token: tokenValue}).then(response => response.data["valid"]))
    }

    // useEffect(() => {
    //     // console.log("loading " + loading);
    //
    // });

    // console.log("Here " + loading);

    if (loading) {
        validate().then(valid => {
            // console.log("Valid: " + valid);
            if (valid) {
                setToken(tokenValue);
            } else {
                deleteToken();
            }
            setLoading(false);
        });
    }


    // useEffect(() => {
    //     // console.log("loading " + loading);
    //     const validate = async () => {
    //         if (loading) {
    //             setLoading(false);
    //             console.log("token: " + token + " " + tokenValue);
    //             const valid = (await axios.post("http://localhost:3001/token", {token: tokenValue})
    //                 .then(response => response.data["valid"]));
    //             console.log("Valid: " + valid);
    //             if (valid) {
    //                 setToken(tokenValue);
    //             } else {
    //                 deleteToken();
    //             }
    //         }
    //     }
    //     void validate();
    // });

    return [token, saveToken];
}
