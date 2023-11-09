import React from 'react'

import { useState,useEffect } from 'react';
import axios from 'axios'; // Add this line to import axios
import { Link , useNavigate }  from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Home(){
	axios.defaults.withCredentials = true 
	const [auth, setAuth] = useState(false)
	const [message, setMessage] = useState('')
	const [name, setName] = useState('')
	function clearup(das){
		if(das.data.status === "Successfully Logged in"){
			setAuth(true)
			setName(das.data.name)
			}else{
			setAuth(false)
			setMessage(das.data.Error)
		}
	}
	useEffect(()=>{
		  axios.get('http://localhost:8081/')
		  .then(res => clearup(res))
		  .catch(err => console.log(err))


	}, [])

//handle logout
	const handleDelete = () =>{
		axios.get('http://localhost:8081/logout')
		.then(res =>{
			if(res.data.status === "Logged out"){
			location.reload(true)
			}
		}).catch(err => console.log(err))
	}
	return(<div>
		<div className="nav-bar">
			<h4 className="text-primary">My App</h4>
        {
        	auth ?
        	<div>
        		<button onClick={handleDelete} className="btn btn-danger btn-smmin">Logout</button>
        	</div>
        	:
        	<div>
        		<Link to='/login' className="btn btn-primary btn-smmin">Sign in</Link>
        	</div>

        }
		</div>
		<div className="card" Style='border:0px'>
		    <div className="card-body">
		        <h2 className='alert text-muted' align='center'>Welcome To My App</h2>
		    {
		       	auth ?
		        <center className="text-success">Logged in as <b> {name}</b></center>
		        :
		        <center className="text-danger"> Not Authenticated </center>
		    }
            </div>	
        </div>
	</div>)
}