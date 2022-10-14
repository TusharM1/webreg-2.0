import axios from "axios";
import {useEffect, useState} from "react";

export function useToken2() {
    const tokenValue = localStorage.getItem("token");
    // let loading = !!tokenValue;
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(loading ? "loading" : "");
    // if (tokenValue)
    //     setToken("loading");

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
        console.log("useToken2 validate");
        return (await axios.post("http://localhost:3001/token", {tokenValue})
            .then(response => response.data["valid"])).valueOf();
    }

    useEffect(() => {
        console.log("loading " + loading);
        if (loading) {
            setLoading(false);
            const valid = validate();
            if (valid) {
                setToken(tokenValue);
            } else {
                deleteToken();
            }
        }
            // setLoading("false");
        // console.log("useToken2 useEffect " + tokenValue + " " + loading);
    });
        // void validate();
        // console.log("useeffect")

        // const valid = axios.post("http://localhost:3001/token", { token })
        //     .then(response => response.data["valid"]);
        // console.log("useToken2 useEffect " + );
        // if (!valid) {
        //     deleteToken();
        // }
        // setLoading("false");
    // });

    return [token, saveToken];
}
