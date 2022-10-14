import axios from "axios";
import {useEffect, useState} from "react";

export function useToken2(setLoading) {
    const [token, setToken] = useState(localStorage.getItem('token'));

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

    useEffect(() => {
        const validate = async () => {
            axios.post("http://localhost:3001/token", { token })
                .then(response => {
                    const valid = response.data["valid"];
                    if (!valid) {
                        deleteToken();
                    }
                    setLoading("false");
                    console.log("useToken2 useEffect " + valid);
                });

        }
        void validate();
        console.log("useeffect")

        // const valid = axios.post("http://localhost:3001/token", { token })
        //     .then(response => response.data["valid"]);
        // console.log("useToken2 useEffect " + );
        // if (!valid) {
        //     deleteToken();
        // }
        // setLoading("false");
    });

    return [token, saveToken];
}
