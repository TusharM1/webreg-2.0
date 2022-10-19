import React from "react";

export const UserContext = React.createContext({
    userData: null,
    setUserData: (userData) => {}
});

export const defaultUserData = {
    data: {
        netID: null,
        fullName: null,
        role: null
    },
    token: null,
    semesters: {
        selectedSemester: null,
        register: [],
        plan: [],
        drop: []
    }
};

