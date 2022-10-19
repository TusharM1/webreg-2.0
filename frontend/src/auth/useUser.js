import axios from "axios";
import { useState } from "react";

export function useUser() {
    const tokenValue = localStorage.getItem("token");
    const [loading, setLoading] = useState(!!tokenValue);
    const [user, setUser] = useState(loading ? "loading" : "");

    const deleteUser = () => {
        setUser("");
        sessionStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    const saveUser = (user) => {
        if (user && !user["error"]) {
            console.log(user);
            setUser(user);
            sessionStorage.setItem("user", user);
            localStorage.setItem("token", user);
        } else {
            deleteUser();
        }
    }

    const validate = async () => {
        return (await axios.post("http://localhost:3001/auth", {
            type: "token",
            data: {
                token: "001fe18e-4efb-11ed-8e54-0bd1fa6f3eea"
            }
        }).then(response => response.data));
    }

    if (loading) {
        validate().then(user => {
            saveUser(user);
            setLoading(false);
        });
    }

    return [user, saveUser];
}
