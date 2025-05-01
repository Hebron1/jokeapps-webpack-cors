import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { axiosInstance } from "../api/axios"
import NavScore from "./NavScore"

const ScoreJoke = () => {
    
    const {api_Key} = useContext(AuthContext)
    const [emScore, setEmScore] = useState(3)
    const [selectedValue, setSelectedValue] = useState([])
    
    const scores = [3, 4, 5, 6, 7, 8]
    
    const star = '⭐'
    const apiConfig = {
        params: {
            score: emScore,
            apiKey: api_Key,
          },
    }

    const getAPiKey = async () => {
        const response = await axiosInstance.get('/filter', apiConfig)
        setSelectedValue(response.data)
    }

    useEffect(() => {
        getAPiKey()
    }, [emScore])

    // useEffect(() => {
    //     getAPiKey()
    // }, [emScore])

    return (
        <div>
        <div className="d-flex justify-content-center">
            <NavScore scores={scores} setScore={setEmScore} emScore={emScore} />
        </div>
            {selectedValue.map(val => (
                <div key={val.id} className="card">
                <div className="card-body">
                  <h5 className="card-title">{val.username}</h5>
                  <p className="card-text">{val.secret}</p>
                  <p>{star.repeat(val.emScore)}</p>
                </div>
                </div>
            ))}
            <NavScore scores={scores} setScore={setEmScore} emScore={emScore} />
        </div>
    )
}

export default ScoreJoke;