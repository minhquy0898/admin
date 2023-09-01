import React, { useState } from 'react'
import './Login.css'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'
import Cookies from 'js-cookie';

function Login() {
    const [account, setAccount] = useState({
        id: "",
        email: "",
        password: ""
    });
    const adminAccount = {
        email: "admin",
        password: "admin"
    };
    const [err, setErr] = useState('');
    const HandleSignAsAdmin = async (event) => {
        event.preventDefault();
        setAccount(adminAccount);

    }
    const HandleChangeInput = (event) => {
        const { name, value } = event.target;
        setAccount(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const HandleRegister = async (event) => {
        event.preventDefault();
        const newAccount = {
            ...account,
            id: uuidv4()
        }
        const response = await axios.get(`http://localhost:3001/Account`)
        let accountAll = response.data
        if (accountAll.find(acc => acc.email === newAccount.email)) {
            setErr('email already used')
        } else {
            try {
                await axios.post(`http://localhost:3001/Account`, newAccount, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                setErr('Success')
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    const HandleSignIn = async (event) => {
        event.preventDefault();
        const response = await axios.get(`http://localhost:3001/Account`)
        let accountAll = response.data
        console.log(accountAll);
        console.log(account.email);
        const CheckEmail = accountAll.find(acc => acc.email === account.email)
        console.log(CheckEmail);
        if (!CheckEmail) {
            setErr('Cannot find this email')
        }
        else {
            if (CheckEmail.password !== account.password) {
                setErr("Wrong Password")
            } else {
                setErr("login success")
                Cookies.set('jwt', CheckEmail.email, { expires: 31 })
                window.location.href = '/product'
            }

        }
    }
    return (
        <div className='Container'>
            <div className='body_content2'>
                <h2>Welcome back</h2>
                <form action="" className='formLogin'>
                    <input type="text" name='email' className='loginInput' placeholder='Email' value={account.email}
                        onChange={HandleChangeInput} />

                    <input type="password" name='password' className='loginInput' placeholder='Password' value={account.password}
                        onChange={HandleChangeInput} />
                    {err ? <p>{err}</p> : null}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: `15px 0px 15px 0px`
                    }}>
                        <div>
                            <input type="checkbox" />
                            Remember me
                        </div>
                        <p>Forgot password</p>
                    </div>
                    <button className='btnSignIn' onClick={HandleRegister}>Register</button>
                    <button className='btnSignIn' onClick={HandleSignIn}>Sign in</button>
                    <button className='btnSignIn' onClick={HandleSignAsAdmin}>Login as admin</button>

                </form>
            </div>
        </div>
    )
}

export default Login
