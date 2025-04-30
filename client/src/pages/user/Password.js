import React, {useState} from "react";
import UserNav from "../../components/nav/UserNav";
import {auth} from "../../firebase";
import {toast} from "react-toastify";
import { Spin } from "antd";


const Password = () => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) =>{

e.preventDefault();
setLoading(true);

await auth.currentUser.updatePassword(password)
.then(()=>{

setLoading(false);
setPassword("");
toast.success("Password Updated")
//
})
.catch(err =>{

setLoading(false);

toast.error(err.message);
    //
})

    };

const passwordUpdateForm = () =>

<form onSubmit={handleSubmit}>
    <div className="form-group">
    
    <label>Password</label>
    <input type="password" onChange={e => setPassword(e.target.value)} 
    className="form-control" placeholder="Enter New Password"
    disabled={loading}
    value={password}

    />
    <button style={{marginTop:'20px'}} className="btn btn-primary" disabled={!password || password.length < 6 || loading}>
    Submit</button>
    
    
    </div>
    </form>;




    return(
    <div className="container-fluid">
<br/><br/><br/>
<div className="row">

    <div className="col-md-2">
<UserNav />

    </div>

<div className="col">
    {loading ? 
(<h4 className="text-danger"><Spin/></h4> ): (<h4>Change your password!</h4>) }
{passwordUpdateForm()}
</div>

</div>


    </div>
    );};

export default Password;