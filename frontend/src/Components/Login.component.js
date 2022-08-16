import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Login.css";
import Header from "./Header.component";
import Select from "react-select";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const useStyles = makeStyles(() => ({
    header: {
        backgroundColor: "#400CCC",
        paddingRight: "79px",
        paddingLeft: "38px",
        "@media (max-width: 900px)": {
            paddingLeft: 0,
        },
    },
    logo: {
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        color: "#FFFEFE",
        textAlign: "left",
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
}));

export default function Login(props) {
    const [role_sel, set_role_sel] = useState('');
    const [failed, setfailed] = useState('');
    const [success_flag, set_success_flag] = useState('');
    const { header, logo, menuButton, toolbar } = useStyles();
    const notifySuccess = () => toast.success('User Added to Database!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    const notifyFailed = () => toast.error(failed, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    const notifyFailedSub = () => toast.error('Enter all details!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    let a_token = '';
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    useEffect(() => {
        if (success_flag === true) {
            notifySuccess();
            props.history.push("/userinfo");
        }
    }, [success_flag]);

    useEffect(() => {
        if (success_flag === false) {
            notifyFailed();
        }
    }, [failed]);

    const roles = [
        { label: 'Author', value: 'Author' },
        { label: 'Editor', value: 'Editor' },
        { label: 'Subscriber', value: 'Subscriber' },
        { label: 'Administrator', value: 'Administrator' },
    ];

    const handleChangeRole = (e) => {
        let obj = { value: e.value, label: e.label };
        set_role_sel(obj);
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log("submitted");
        console.log(e.target.name.value);
        console.log(e.target.email.value);
        console.log(role_sel.value);
        const name = e.target.name.value;
        const email = e.target.email.value;
        const role = role_sel.value;

        if (role == '' || name == '' || email == '' || name == undefined || email == undefined) {
            notifyFailedSub();
            return;
        }

        axios.post("http://127.0.0.1:8000/api/adduser",
            JSON.stringify({ name: name, email: email, role: role }), config
        )
            .then(res => {
                console.log("Result", res)
                set_success_flag(res.data.success);
                console.log("Success:", success_flag)
                if (res.data.success === false) {
                    setfailed(res.data.error.email[0]);
                    console.log("Result Failed:", failed);
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

    const displayDesktop = () => {
        return (
            <><div className="main">
                <div className="col-md-6 col-sm-12">
                    <div className="login-form">
                        <form onSubmit={handleSubmit}>
                            <h4>Add User</h4><br />
                            <div className="form-group mb-3">
                                <input type="text" id="name" name="name" className="form-control rounded-pill border-0 shadow-sm px-4" placeholder="Full Name" />
                            </div>
                            <div className="form-group mb-3">
                                <input type="text" id="email" name="password" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" placeholder="E-mail" />
                            </div>
                            <div className="form-group mb-3">
                                <Select value={role_sel} onChange={handleChangeRole} placeholder={'Role'} options={roles} />
                            </div>
                            <button type="submit" class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Add user</button>
                        </form>
                    </div>
                </div>
            </div></>
        );
    };

    return (
        <div>
            {displayDesktop()}
        </div>
    );
}