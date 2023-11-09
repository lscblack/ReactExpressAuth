import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
export default function Register(){
	const [values, setValues] = useState({
	  name: '',
	  email: '',
	  password: ''
	});

	const handleChange = (event) => {
	  setValues({ ...values, [event.target.name]: event.target.value });
	}

	const handleSubmit = (event) => {
	  event.preventDefault();
	  axios.post('http://localhost:8081/register',values)
	  .then(res => clearup(res))
	  .catch(err => console.log(err))
	}
	const navigate = useNavigate()
	function clearup(das){
		if(das.data.status === "Successfully Registered"){
			navigate('/login')
		}else{
			alert(das.data.Error)
		}
	}

	return(<div >
		<form style={{ maxWidth: '350px' , padding:'10px'}} className=" rounded  card mx-auto mt-4"  onSubmit={handleSubmit}>
		    <h2 className="text-muted" align="center">Sign Up</h2>
		    <div className="mb-4">
		        <strong className="text-muted"  htmlFor="name">Name <span className='text-danger'>*</span></strong>
		        <input type="text" value={values.name} onChange={handleChange} id="name"  name="name" className="form-control " placeholder="Enter your name" required/>
		    </div>
		    <p></p>
		    <div className="mb-4">
		        <strong className="text-muted" htmlFor="email">Email <span className='text-danger'>*</span></strong>
		        <input type="email" value={values.email} onChange={handleChange} id="email" name="email" className="form-control " placeholder="Enter your email" required/>
		    </div>
		    <p></p>
		    <div className="mb-4">
		        <strong className="text-muted" htmlFor="password">Password <span className='text-danger'>*</span></strong>
		        <input type="password" onChange={handleChange} value={values.password}id="password" name="password" className="form-control " placeholder="Enter your password" required/>
		    </div>
		    <p></p>
		    <button className="btn btn-success " type="submit">Sign Up</button>
		    <center><small className='text-muted'>Already Have Account <Link to='/login' className='text-primary'>Sign in</Link></small></center>
		</form>

	</div>)
}