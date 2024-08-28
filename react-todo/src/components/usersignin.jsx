import axios from "axios";
import { Formik, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


export function Signin(){
    const[users,setusers] = useState([]);

    const[cookie, setcookie,removecookie] = useCookies('name')

    let navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://127.0.0.1:5050/users")
        .then(res=>{
            setusers(res.data);
            console.log(users);
        })
    },[])

    let formik = useFormik({
        initialValues:{
            UserId:"",
            Password:""
        },
        onSubmit:(formdata)=>{
            var userdata= users.find(user=> user.UserId === formdata.UserId);
            if(userdata.Password === formdata.Password){
                setcookie('name',formdata.UserId)
                navigate('/dashboard')
            }else{
                navigate('/invalid')
            }
            

        }
    })

    return(
        <div>
            <form onSubmit={formik.handleSubmit} className="border border-3 border-success p-3 text-white rounded">
                <h2>User Login</h2>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" name="UserId" onChange={formik.handleChange}/></dd>
                    <dt>Password</dt>
                    <dd><input type="Password" name="Password" onChange={formik.handleChange} /></dd>
                </dl>
                <button className="btn btn-danger p-2 w-100">Sign In</button>
            </form>

        
        </div>
    )
}