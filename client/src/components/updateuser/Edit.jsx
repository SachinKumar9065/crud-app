import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../adduser/add.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Edit = () => {

    const users = {
        fname:"",
        lname:"",
        email:""
    }

    const {id} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(users);

    useEffect(() => {
      axios.get(`https://crud-app-api-delta.vercel.app/getone/${id}`)
      .then((response)=>{
        // console.log("Fetched user:", response.data);
        setUser(response.data.user);
      })
      .catch((error)=>{
        console.log(error)
      })
    }, [id])
    

    const inputChangeHandler = (e) =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value});
        console.log(user)
    }

    const submitForm = async(e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:1000/api/update/${id}`, user)
        .then((response)=>{
            toast.success(response.data.message, {position:"top-right"})
            navigate('/')
        }).catch((error) => console.log(error))
    }

  return (
    <div className='addUser'>
        <Link to="/" >Back</Link>

        <h3>Update user</h3>

        <form className='addUserForm' onSubmit={submitForm}>
            <div className='inputGroup'>
                <label htmlFor="fname">First name</label>
                <input type="text" value={user.fname} onChange={inputChangeHandler} id='fname' name='fname' autoComplete='off' placeholder='First name' />
            </div>

            <div className='inputGroup'>
                <label htmlFor="lname">Last name</label>
                <input type="text" value={user.lname} onChange={inputChangeHandler} id='lname' name='lname' autoComplete='off' placeholder='Last name' />
            </div>

            <div className='inputGroup'>
                <label htmlFor="email">Email</label>
                <input type="email" value={user.email} onChange={inputChangeHandler} id='email' name='email' autoComplete='off' placeholder='email' />
            </div>

            <div className='inputGroup'>
                <button type='submit'>UPDATE USER</button>
            </div>
        </form>
    </div>
  )
}

export default Edit
