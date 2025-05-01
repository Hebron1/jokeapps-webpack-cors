import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import NavPage from "./NavPage";
import Navbar from "./Navbar";
import AddJokeModal from "./modal/AddJokeModal";
import Swal from "sweetalert2";

const Dashboard = () => {

    const {basicAuthentic, authToken, pages, setPageNumber, setAuthenticationToken} = useContext(AuthContext);
    
    const [searchId, setSearchId] = useState([]);
    // const [valuesId, setValuesId] = useState([]);
    const [page, setPage] = useState(1);

    let didCancel = false
    let timeout;
    // const pages = [1, 2, 3, 4, 5]

    const config = {
        auth: {
            username: basicAuthentic.username,
            password: basicAuthentic.password
        }
    };
    
    const fetchRandomData = async () => {

        try {
            // console.log(basicAuthentic)
            // const response = await axiosInstance.get('/random')
            // setValues(response.data)
            // const requests = pages.map(page =>
            // axios.get(`https://secrets-api.appbrewery.com/all?page=${page}`, config)
            // );

            // const responses = await Promise.all(requests);
            // const allData = responses.flatMap(res => res.data);
            // combine all array to one array without having to delete the scope array
            // flatMap merges all .data from each response into one array.

            const requests = await axiosInstance.get(`/all?page=${page}`, config)
            const data = requests.data;
            if (!didCancel) {
                // setValues(response.data)
                setSearchId(requests.data)
            }
            // setSearchId(requests.map(item => item.id));

            // this will erase page 6 if data on page 6 when get, but doesn't exist
            // Adding inside AddJokeModal
            if (Array.isArray(data) && data.length === 0) {
                const lastPage = pages.pageNumber[pages.pageNumber.length - 1];
                setPageNumber(lastPage - 1)
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            clearTimeout(timeout)
        }
    }

    useEffect(() => {
        fetchRandomData()
        return () => {
            didCancel = true;
            clearTimeout(timeout);
          };
    }, [page, searchId])

    let star = '⭐';

    const bearerConfig = {
        headers: { Authorization: `Bearer ${authToken}` },
    };

    const deleteJoke = async (jokeId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                await axiosInstance.delete(`/secrets/${jokeId}`, bearerConfig)
            }
            console.log(`Secret with ID ${jokeId} deleted successfully.`);
            fetchRandomData()

        } catch (error) {
            console.log(error)
        }
    }

    return (
        
        <div>
            <Navbar />
            {/* navbar */}
            <div className="d-flex justify-content-between mx-3 my-2">
            <Link to={'/dashboard/score'}><button type="button" className="btn btn-primary">Score</button></Link>
            <div className="justify-content-end gap-3">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add
            </button>
            <Link to={'/'} className="ps-2">
            <button type="button" className="btn btn-danger" onClick={() => setAuthenticationToken('')}>Logout</button>
            </Link>
            </div>
            </div>

            <AddJokeModal />

            {/* <div>
                <h1>New Adding</h1>
            {valuesId.length > 49 && (
                <ul>
                    {values.map((joke) => (
                    <li key={joke.id}>{joke.text}</li>
                    ))}
                </ul>
            )}
            </div> */}

            {searchId && searchId.length > 0 ? searchId.map((sec) => {
               return (
               <div className="card" key={sec.id}>
                <div className="card-body">
                    <h4 className="card-title">{sec.username}</h4>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{`Score: ${star.repeat(sec.emScore)}`}</h6>
                    <div className="d-flex flex-row">
                    <p className="card-text"><strong>Secret:</strong> {sec.secret}</p>
                    </div>
                    <div className="d-flex justify-content-start p-2 gap-2">
                    <Link to={`/edit-joke/${sec.id}`}>
                    <button type="button" className="btn btn-success">Edit</button>
                    </Link>
                    <button className="btn btn-danger" onClick={() => deleteJoke(sec.id)}>Delete</button>
                    </div>
                </div>
                </div>
               )
            }) : <div className="spinner-border text-primary" role="status">
                 <span className="visually-hidden">Loading...</span>
                 </div>
                 } 

            {/* <p>{values.id}</p>
            <h1>{values.secret}</h1> */}

            <NavPage page={page} setPage={setPage} pages={pages.pageNumber} />
        </div>
    )
}

export default Dashboard;