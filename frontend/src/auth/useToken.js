import axios from "axios";
import { useState } from "react";

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
        return (await axios.post("http://localhost:3001/token", {token: tokenValue})
            .then(response => response.data["valid"]))
    }

    if (loading) {
        validate().then(valid => {
            if (valid) {
                setToken(tokenValue);
            } else {
                deleteToken();
            }
            setLoading(false);
        });
    }

    return [token, saveToken];
}
