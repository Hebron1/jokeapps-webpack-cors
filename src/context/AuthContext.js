import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [api_Key, setApi_Key] = useState({apiKey: ""})
    const [authToken, setAuthToken] = useState({token: ""})
    const [basicAuthentic, setBasicAuthentic] = useState({
        username: "",
        password: ""
    })
    const [pages, setPages] = useState({pageNumber: [1,2,3,4,5]})

    const setApiToken = (apiKey) => {
        setApi_Key(apiKey)
    }

    const setAuthenticationToken = (token) => {
        setAuthToken(token)
    }

    const setBasicAuth = (username, password) => {
        setBasicAuthentic(username, password)
    }

    const setPageNumber = (num) => {
        setPages((prev) => ({
            pageNumber: [...prev.pageNumber, num]
        }))
    }

    return (
        <AuthContext.Provider
        value={{
            api_Key,
            setApiToken,
            authToken,
            setAuthenticationToken,
            basicAuthentic,
            setBasicAuth,
            pages,
            setPageNumber
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

