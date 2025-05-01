import React, { useContext, useState } from "react";
import { axiosInstance } from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";

const Login = () => {

    const {setApiToken, setAuthenticationToken, setBasicAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Get Api Token
    const getApi = async () => {
        const response = await axiosInstance.get('/generate-api-key')
        const api_key = response.data.apiKey;
        setApiToken(api_key)
        // console.log(api_key)
    }

    // Get Bearer Token && Basic Authentic
    const loginData = async (e) => {

        e.preventDefault()
        try {
            const response = await axiosInstance.post('/get-auth-token', {
                 username: username,
                 password: password
             })
            await getApi()
            // console.log(`${username}| ${password}`)
            setBasicAuth({
                username: username,
                password: password
            })
            if (response.status === 200) {
                setAuthenticationToken(response.data.token)
                toast.success('success sign in!')
                navigate('/dashboard')
                // navigate('/dashboard/score')
            } else {
                toast.error("Username and password doesn't exist!")
            }

        } catch (error) {
            console.error("Error: 404", error);
            toast.error("To many Request!")
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="w-50">
        <form onSubmit={loginData}>
            <div className="mb-3">
                <label htmlFor="exampleInputUsername" className="form-label">Username</label>
                <input 
                type="text" 
                className="form-control" 
                id="exampleInputUsername" 
                aria-describedby="usernameHelp" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
                />
                <div id="usernameHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input 
                type="password" 
                className="form-control" 
                id="exampleInputPassword1" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                />
            </div>
            <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary me-2">Login</button>
                <button type="button" className="btn btn-primary" disabled>
                    Register
                </button>
            </div>
        </form>
        </div>
        </div>
    )
}

export default Login;