import React, { useState } from 'react'
import './Login.css'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'
import Cookies from 'js-cookie';

function Login() {
    const [account, setAccount] = useState({
        id: "",
        username: "",
        password: ""
    });
    const [err, setErr] = useState('');
    const HandleChangeInput = (event) => {
        const { name, value } = event.target;
        setAccount(prevState => ({
            ...prevState,
            [name]: value
        }))

    }
    console.log(account);
    const HandleSignIn = async (event) => {
        event.preventDefault();
        const response = await axios.get(`http://localhost:3001/Account`);
        let accountAll = response.data;
        console.log(accountAll);
        const CheckEmail = accountAll.find(acc => acc.username === account.username);
        console.log('check', CheckEmail);
        if (!CheckEmail) {
            setErr(`The username is not exist`);
        }
        else {
            if (CheckEmail.username !== "admin") {
                setErr("The user is not granted access here");
            } else {
                if (CheckEmail.password !== account.password) {
                    setErr("Wrong Password");
                } else {
                    setErr("Login success");
                    Cookies.set('jwt', CheckEmail.email, { expires: 31 });
                    window.location.href = '/product';
                }
            }
        }
    }
    return (
        <div className='Container'>
            <div className='body_content2'>
                <h2>Welcome back</h2>
                <form action="" className='formLogin'>
                    <input type="text" name='username' className='loginInput' placeholder='Username' value={account.username}
                        onChange={HandleChangeInput} />

                    <input type="password" name='password' className='loginInput' placeholder='Password' value={account.password}
                        onChange={HandleChangeInput} />
                    {err ? <p>{err}</p> : null}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: `15px 0px 15px 0px`
                    }}>
                    </div>
                    <button className='btnSignIn' onClick={HandleSignIn}>Sign in</button>

                </form>
            </div>
        </div>
    )
}

export default Login
