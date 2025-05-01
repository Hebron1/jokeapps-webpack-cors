import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const AddJoke = () => {

    const {authToken} = useContext(AuthContext);

    const [emScore, setEmScore] = useState(null);
    const [secret, setSecret] = useState("");

    const config = {
        headers: { Authorization: `Bearer ${authToken}` },
    };

    const sendData = async () => {
        
        try {
            await axiosInstance.get('/secrets', {
                score: emScore,
                secret: secret
            }, config)
            
        } catch (error) {
            console.error('This server cannot be reach', error)
        }
    }

    return (
        <div>
            <form onSubmit={sendData}>
            <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Score</label>
            <input value={emScore} onChange={e => setEmScore(e.target.value)} type="number" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
            <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Write your Secret</label>
            <textarea value={secret} onChange={e => setSecret(e.target.value)} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddJoke