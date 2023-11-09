import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
const salt = 10;

//define appp
const app = express()
app.use(cors({
	origin:["http://localhost:5173"],
	methods:["POST","GET"],
	credentials:true
}))
app.use(cookieParser())
app.use(express.json())

//connection
const db = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'signup'
})
//verify user function
const verifyUser = (req,res,next) =>{
	const token = req.cookies.token
	if(!token){
		return res.status(500).json({'Error':"Your Are Not Logged In"})
	}else{
		jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
			if (err) {
				res.status(500).json({"Error":"Unable To Verify Your Token"})
			}else{
				req.name = decoded.name;
				next()
			}
		})
	}
}
//check if use already logged in
app.get('/',verifyUser ,(req,res) => {
	return res.status(200).json({ status: 'Successfully Logged in' ,name:req.name});
})
//logout user
app.get('/logout',(req,res) => {
	res.clearCookie('token')
	return res.json({status:'Logged out'})
})

//Register API
app.post('/register',(req,res) => {
	const sql = "INSERT INTO login(`name`,`email`,`password`) VALUES(?,?,?)"
	bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
		if(err){
			return res.json({Error:'Failed To Hash Password'})
		}
	        const values =  [req.body.name,req.body.email,hash]
		
	db.query(sql,values,(err,result) => {
		if(err){
			console.log(err)
			res.status(500).json({Error:'Failed To Register'})
		}else{
			res.status(200).json({'status':'Successfully Registered'})
		}
	})
	})
})

//Login API
app.post('/login', (req, res) => {
  const sql = 'SELECT * FROM login WHERE email=?';

  db.query(sql, [req.body.email], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server Error" });
    } else {
      if (data.length > 0) {
        bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
          if (err) {
            return res.status(500).json({ error: 'Password Comparing Failed' });
          }
          if (response) {
            const name = data[0].name;
            const token = jwt.sign({ name }, 'jwt-secret-key', { expiresIn: '1d' });

            res.cookie('token', token);
            return res.status(200).json({ status: 'Successfully Logged in' });
          } else {
            return res.status(401).json({ error: 'Password Incorrect' });
          }
        });
      } else {
        return res.status(404).json({ error: 'Email Not Found' });
      }
    }
  });
});


app.listen(8081,()=>{
  console.log("Listening...")
})
