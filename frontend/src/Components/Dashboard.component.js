import React, { Component, useEffect, useState } from "react";
import axios from 'axios';
import Header from "./Header.component";
import { ToastContainer, toast } from 'react-toastify';

export default function DashboardComponent() {
    const [users, setusers] = useState(null);
    const [success_flag, set_success_flag] = useState('');

    const notifySuccess = () => toast.success('Users Loaded from Database!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    const notifyFailed = () => toast.error('Failed to load from database!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    useEffect(() => {
        getusers();
    }, [success_flag]);

    const getusers = () => {
        axios.get("http://127.0.0.1:8000/api/users")
            .then(res => {
                console.log("Result", res)
                set_success_flag(res.data.success);
                console.log("Success:", success_flag)
                if (success_flag === true) {
                    setusers(res.data.data);
                    console.log("Users:", users);
                }
                else if (success_flag === false) {
                    notifyFailed();
                }
            })
            .catch((error) => {
                notifyFailed();
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            });
    }

    const DisplayData=users?.map(
        (users)=>{
            return(
                <tr>
                    <td>{users.name}</td>
                    <td>{users.email}</td>
                    <td>{users.role}</td>
                </tr>
            )
        }
    )

    const displayDesktop = () => {
        return (
            <>
             <div className="m-2 mt-5 pt-4">
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th>Full Name</th>
                    <th>E-mail</th>
                    <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayData}
                </tbody>
            </table>
             
        </div>
            </>
        );
    };      

    return (
        <div>
            <Header />
            {displayDesktop()}
        </div>
    );

}