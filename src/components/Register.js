import React, { useState } from "react";
import { axiosInstance } from "../api/axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const navigate = useNavigate();

    const registerData = async (e) => {

        e.preventDefault()
        try {
            if (secondPassword === password) {
                const response = await axiosInstance.post('/register', {
                     username: username,
                     password: password
                 })
                console.log(`${username}| ${password}`)
                console.log("Response:", data);
                toast.success(response.data.success)
                navigate('/')
            } else {
                toast.error('Must be same as current password!')
            }
        } catch (error) {
            console.error("Error: 404", error);
            toast.error('failed to register!')
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="w-50">
        <form onSubmit={registerData}>
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
                <div id="usernameHelp" className="form-text">We'll never share your username with anyone else.</div>
            </div>
            <div className="mb-3 d-flex gap-3">

                {/* first password */}
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input 
                type="password" 
                className="form-control" 
                id="exampleInputPassword1" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                />

                {/* second password */}
                <label htmlFor="exampleInputPassword2" className="form-label">Second Password</label>
                <input 
                type="password" 
                className="form-control" 
                id="exampleInputPassword2" 
                value={secondPassword}
                onChange={(e) => setSecondPassword(e.target.value)}
                required 
                />
            </div>
            <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary me-2">Submit</button>
            <Link to={'/'}>
            <button className="btn btn-primary">Back</button>
            </Link>
            </div>
        </form>
        </div>
        </div>
    )
}

export default Register;