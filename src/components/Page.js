import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { axiosInstance } from "../api/axios";

const Page = () => {

    const {authToken} = useContext(AuthContext);
    const [values, setValues] = useState([]);
    const [page, setPage] = useState("")

    const config = {
        headers: { Authorization: `Bearer ${authToken}` },
      };
    
    const getData = async () => {
        const response = await axiosInstance.get(`/all?page=${page}`, config)
        setValues(response.data)
    }

    useEffect(() => {
        getData()
    }, [page])

    return (
        <div>
        <div>
            <select class="form-select" aria-label="Default select example" value={page} onChange={(e) => setPage(e.target.value)}>
                <option selected>Open this select page</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                <option value="4">Three</option>
                <option value="5">Three</option>
            </select>
        </div>
            {values.map(val => (
                <div key={val.id} class="card">
                <div class="card-body">
                  <h5 class="card-title">{val.username}</h5>
                  <p class="card-text">{val.secret}</p>
                  <p>{val.emScore}</p>
                </div>
              </div>
            ))}
        </div>
    )
}

export default Page;