import React from "react";

export const defaultUserData = {
    user: {
        netID: null,
        fullName: null,
        role: null
    },
    semesters: {
        selectedSemester: null,
        register: [],
        plan: [],
        drop: []
    }
};

export const UserContext = React.createContext({
    userData: defaultUserData,
    setUserData: (userData) => {}
});

