import React, { useContext, useState } from "react";
import { axiosInstance } from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "sonner";

function AddJokeModal() {

    const {authToken, pages, setPageNumber} = useContext(AuthContext);

    const [emScore, setEmScore] = useState("");
    const [secret, setSecret] = useState("");
    // const [values, setValues] = useContext()

    const config = {
        headers: { Authorization: `Bearer ${authToken}` },
    };

    const data = {
        secret: secret,
        score: parseInt(emScore)
     }

    const postSecret = async (e) => {
        e.preventDefault()
        try {
           const response = await axiosInstance.post('/secrets', data, config)
            toast.success('you success adding!')
            // setValues(response.data)
            // console.log(values.secret)

            // this will page 6 if user adding some joke, but its not perfect because
            // if we adding every joke, but pages are added as secret jokes are added
            const lastPage = pages.pageNumber[pages.pageNumber.length - 1];
            setPageNumber(lastPage + 1)
        } catch (error) {
            console.log(error)
            toast.error('Failed to add secret.');
        }
    }

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={postSecret}>
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
                    onChange={(e) => 
                    setSecret(e.target.value)} 
                    className="form-control" 
                    id="exampleFormControlTextarea1" 
                    rows="3"></textarea>
                    </div>
                </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
            </form>
            </div>
        </div>
        </div>
    )
}

export default AddJokeModal;