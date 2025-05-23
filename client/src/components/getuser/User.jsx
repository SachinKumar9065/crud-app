import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./user.css"
import axios from 'axios';
import toast from 'react-hot-toast';

const User = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("https://crud-app-api-delta.vercel.app/getAll");
            setUsers(response.data.userData); // make sure this is correct
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };
      
        fetchData();
      }, []);

      const deleteUser = async(userId) =>{
        await axios.delete(`https://crud-app-api-delta.vercel.app/delete/${userId}`)
        .then((response)=>{
            setUsers((prevUser)=>prevUser.filter((user)=> user._id !== userId))
            toast.success(response.data.message, {position:'top-right'})
        })
        .catch((error) =>{
            console.log(error)
        })
      }
    
  return (
    <div className='userTable'>
        <Link to={"/add"} className='addButton'>Add User</Link>

        <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th>User name</th>
                    <th>User Email</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {
                    users.map((user, index)=>{
                        return(
                            <tr key={user._id}>
                                <td> {index+1} </td>
                                <td>{user.fname} {user.lname} </td>
                                <td>{user.email}</td>
                                <td className='actionButtons'>
                                    <button onClick={()=> deleteUser(user._id)} ><i className="fa-solid fa-trash"></i></button>
                                    <Link to={`/edit/`+user._id} ><i className="fa-solid fa-pen-to-square"></i></Link>
                                </td>
                            </tr>
                        )
                    })

                    // Array.isArray(users) && users.length > 0 ? (
                    //     users.map((user, index) => (
                    //       <tr key={user._id}>
                    //         <td>{index + 1}</td>
                    //         <td>{user.fname} {user.lname}</td>
                    //         <td>{user.email}</td>
                    //         <td className='actionButtons'>
                    //           <button><i className="fa-solid fa-trash"></i></button>
                    //           <Link to={`/edit/${user._id}`}><i className="fa-solid fa-pen-to-square"></i></Link>
                    //         </td>
                    //       </tr>
                    //     ))
                    //   ) : (
                    //     <tr>
                    //       <td colSpan="4">No users found.</td>
                    //     </tr>
                    // )
                }
                
            </tbody>
        </table>
    </div>
  )
}

export default User
