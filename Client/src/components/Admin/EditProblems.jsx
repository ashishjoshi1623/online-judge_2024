import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import './editProblems.css';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from "react-router-dom"
import Loader from '../Loader/Loader';

function EditProblems() {
    // retrieve data for which we need to edit the problem
    const location = useLocation();
    const data = location.state;
    const isLogIn = data ? data.loggedIn : null;
    const [difficulty,setDifficulty] = useState('');
    const [problemStatement,setproblemStatement] = useState('');
    const [output,setOutput] = useState([]);
    const [testCases,setTestCases] = useState([]);
    const [title,setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    async function handleEdit(e){
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_PORT}/api/editquestions`, {
                title: title,
                difficulty: difficulty,
                problemStatement: problemStatement,
                output: output,
                testCases: testCases
            });
            alert("Data submitted Successfully");
            // console.log(response);
        } catch (error) {
            console.log(error);
        } finally{
            setIsLoading(false);
        }
        
    }

    //function to get the present data
    async function getPresentData(){
        setIsLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_PORT}/api/description/${data.title}`)
            const responseData = await JSON.parse(response.data);
            setDifficulty(responseData[0].difficulty);
            setOutput(responseData[0].output);
            setTestCases(responseData[0].testCases);
            setTitle(responseData[0].title);
            setproblemStatement(responseData[0].problemStatement);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
        
    }
    console.log(output);
    useEffect(()=>{
        getPresentData();
    },[]);
    if(isLogIn){
        return (
            <>
                <section className="admin-nav-section">
                    <div className="admin-nav-container">
                    <div className="admin-nav-app-logo">
                    <h1 className='admin-nav-heading'>TrashCodes Admin </h1>
                    </div>
                    <div className="nav-link">
                    <Nav className="me-auto">
                    <NavLink to="/" className="admin-navLink textcolor-pink">TrashCodes</NavLink>
                    <NavLink to="/adminlogin" className="admin-navLink textcolor-pink">Logout</NavLink>
                    </Nav>
                    </div>
                    </div>
                </section>

                {isLoading && <Loader isLoading={isLoading} />}

                <section className="editSection">
                <div className="editContainer">
                    <h1 className="editHeading">Edit values below</h1>
                    <form onSubmit={handleEdit} className="editForm">
                        <div className="editFormContainer">
                        <label>
                            <p>Title :</p>
                            <input type="text" 
                            className="editInput"
                            placeholder='Edit Title' 
                            name='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            />
                        </label>
                        <label>
                            <p>ProblemStatement :</p>
                            <textarea 
                            name="problemStatement" 
                            className="editTextarea"
                            id="PS" 
                            cols="80" 
                            rows="100"
                            value={problemStatement}
                            onChange={(e) => setproblemStatement(e.target.value)}
                            required
                            ></textarea>
                        </label>
                                
                        <label>
                            <p>Input :</p>
                            <p style={{color:'grey'}}>(For more than one testcase use ',' without extra space)</p>
                            <input type="text" 
                            className="editInput"
                            placeholder='Edit TestCases' 
                            name='testCases'
                            value={testCases}
                            onChange={(e) => setTestCases(e.target.value)} 
                            required
                            />
                        </label>

                        <label>
                            <p>output :</p>
                            <p style={{color:'grey'}}>(For more than one output use ',' without extra space)</p>
                            <input type="text" 
                            className="editInput"
                            placeholder='Edit Output' 
                            name='output'
                            value={output}
                            onChange={(e) => setOutput(e.target.value)} 
                            required
                            />
                        </label>
                        
                        <label>
                            <select name="" 
                            id="" value={difficulty} 
                            onChange={(e) => setDifficulty(e.target.value)}
                            className='chooseDiff'
                            >
                                <option value="easy">easy</option>
                                <option value="medium">medium</option>
                                <option value="hard">hard</option>
                            </select>
                        </label>
                        <input type="submit" className="editSubmitBtn" value="Submit"/>
                        </div>
                    </form>
                </div>
                </section>
            </>
        )
    }
    else{
        return (
            <h1>Invalid Url</h1>
        )
    }    
}

export default EditProblems