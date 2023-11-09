import React,{ useState } from 'react'
import { Link , useNavigate }  from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
//Login Page
export default function Register(){
	const [values, setValues] = useState({
	  email: '',
	  password: ''
	});
	const navigate = useNavigate()
	axios.defaults.withCredentials = true

	const handleChange = (event) => {
	  setValues({ ...values, [event.target.name]: event.target.value });
	}

	const handleSubmit = (event) => {
	  event.preventDefault();
	  axios.post('http://localhost:8081/login',values)
	  .then(res => clearup(res))
	  .catch(err => console.log(err))
	}
	function clearup(das){
		if(das.data.status === "Successfully Logged in"){
			navigate('/')
		}else{
			alert(das.data.Error)
		}
	}

	return(<div >
		<form style={{ maxWidth: '350px' , padding:'10px'}} className=" rounded  card mx-auto mt-4"  onSubmit={handleSubmit}>
		    <h2 className="text-muted" align="center">Sign In</h2>
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
		    <button className="btn btn-success" type="submit">Sign in</button>
		    <center><small className='text-muted'>Don't Have Account <Link to='/register' className='text-primary'>Sign Up</Link></small></center>
		</form>

	</div>)
}