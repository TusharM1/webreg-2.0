import axios from "axios";
import { useState } from "react";

export const [token, setToken] = useState(localStorage.getItem('token'));

export const validateToken = async () => {
    if (!token)
        return false;
    return axios.post("http://localhost:3001/token", { token })
        .then(response => response.data["valid"]);
}

export function saveToken(token) {
    if (token && token !== "invalid") {
        setToken(token);
        localStorage.setItem("token", token);
    }
}

export function deleteToken() {
    setToken("");
    localStorage.removeItem("token");
}