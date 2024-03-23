import React from 'react'
import './questionList.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Loader from '../Loader/Loader';

function QuestionList(props) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
  return (
    <>
        {props.data.map((curr) => {
            const {_id,title} = curr;
            function handleEdit(){
                navigate('/adminlogin/admin/editProblems',{ state : {id : curr._id, title : curr.title, loggedIn : props.user}})
            }
            const handleDelete = async () => {
                Swal.fire({
                    title: "Do you want to delete this question?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Delete",
                    denyButtonText: `Don't delete`
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        setIsLoading(true);
                        try {
                            const response = await axios.delete(`${import.meta.env.VITE_API_PORT}/api/deletequestion`, {
                                params: {
                                    title: curr.title,
                                    _id: curr._id
                                }
                            });
                            Swal.fire("Deleted!", "", "success");
                            window.location.reload();
                            // Refresh the question list after deletion or handle it based on your requirement
                        } catch (error) {
                            Swal.fire("Error occurred!", "", "error");
                            console.log(error);
                        } finally{
                            setIsLoading(false);
                        }
                    } else if (result.isDenied) {
                        Swal.fire("Not Deleted", "", "info");
                    }
                });
            };
            return(
                <div className="QuestionListContainer">
                    {isLoading && <Loader isLoading={isLoading} />}
                <li key={_id} className="quesTitle">
                {title} 
                </li>
                <div className="btnHolder">
                <button className='editQuesBtn btn btn-dark px-3 mx-1' onClick={handleEdit}>Edit</button>
                <button className='editQuesBtn btn btn-danger px-3' onClick={handleDelete}>Delete</button>
                </div>
                </div>
            )
        })}
    </>
  )
}

export default QuestionList