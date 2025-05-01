import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const EditJoke = (jokeId) => {

    const {authToken} = useContext(AuthContext)
    const [emScore, setEmScore] = useState('')
    const [secret, setSecret] = useState()
    const {id} = useParams(jokeId)
    const navigation = useNavigate()

    const config = {
        headers: { Authorization: `Bearer ${authToken}` },
    };

    const fetchDataById = async () => {
        try {
            const response = await axiosInstance.get(`/secrets/${id}`, config)
            setEmScore(response.data.emScore)
            setSecret(response.data.secret)
            if (!response.data) console.error(response.error)
        } catch (error) {
            console.log(error)
        }
    }

    const updateSecret = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.put('/secrets', {
                secret: secret,
                score: emScore
            }, config)
            console.log(response.data)
            navigation("/dashboard")
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        fetchDataById()
    }, [authToken])

    return (
        <form onSubmit={updateSecret}>
            <div className="modal-body">
                <div className="mb-3">
                <div className="input-group mb-3">
                    <span className="input-group-text">Score</span>
                    <span className="input-group-text">⭐</span>
                    <input 
                    type="text" 
                    value={emScore} 
                    onChange={(e) => setEmScore(e.target.value)} 
                    className="form-control" 
                    aria-label="Dollar amount (with dot and two decimal places)" 
                    />
                </div>
                </div>
                    <div className="mb-3">
                    <label 
                    htmlFor="exampleFormControlTextarea1" 
                    className="form-label">
                        Example textarea
                    </label>

                    <textarea 
                    value={secret} 
                    onChange={(e) => setSecret(e.target.value)} 
                    className="form-control" 
                    id="exampleFormControlTextarea1" 
                    rows="3"></textarea>
                    </div>
                </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
            </div>
            </form>
    )
}

export default EditJoke;