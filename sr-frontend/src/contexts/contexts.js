import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [getUser, setUser] = useState({
        loggedIn: false,
        user_id: null,
        user_name: "",
        user_surname: "",
        user_email: ""
    });

    return (
        <UserContext.Provider value={{ getUser, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
