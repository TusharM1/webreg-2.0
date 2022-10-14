import axios from "axios";

export function getToken() {
    const token = localStorage.getItem('token');
    if (token)
        return token;
    return undefined;
}

export const validateToken = async (token) => {
    if (!token)
        return false;
    return axios.post("http://localhost:3001/token", { token })
        .then(response => response.data["valid"]);
}

export function saveToken(token) {
    if (token && token !== "invalid") {
        localStorage.setItem("token", token);
    }
}

export function deleteToken() {
    localStorage.removeItem("token");
}