import axios from "axios"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom";

export function Signup(){

    let navigate= useNavigate()



    let formik = useFormik(
        {
            initialValues:{
                UserId:"",
                UserName:"",
                Password:"",
                Mobile:"",
                Eamil:""

            },
            onSubmit:(user)=>{
                axios.post("http://127.0.01:5050/register-user" ,user);
                alert("New user sucessfully Sign Up");
                navigate('/login')



            }
        }
    )

    return(

        <div className="border border-2 border-primary p-3 text-white rounded">
            <form onSubmit={formik.handleSubmit} >
                <h2>Register User</h2>
                <dl className="form-group">
                    <dt>User Id</dt>
                    <dd><input type="text" name="UserId" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>User Name</dt>
                    <dd><input type="text" name="UserName" onChange={formik.handleChange} className="form-control"  /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange} className="form-control"  /></dd>
                    <dt>Mobile</dt>
                    <dd><input type="number" name="Mobile" onChange={formik.handleChange}className="form-control"  /></dd>
                    <dt>Email</dt>
                    <dd><input type="text" name="Email" onChange={formik.handleChange} className="form-control" /></dd>
                </dl>
                <button className="btn btn-primary w-100 ">Submit</button>
            </form>
            
        </div>
    )
}