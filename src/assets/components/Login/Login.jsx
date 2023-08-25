import React from 'react'
import './Login.css'
function Login() {
    return (
        <div className='Container'>
            <div className='body_content2'>
                <h2>Welcome back</h2>
                <form action="" className='formLogin'>
                    <input type="text" className='loginInput' placeholder='Email' />
                    <input type="password" className='loginInput' placeholder='Password' />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <input type="checkbox" />
                            Remember me
                        </div>
                        <p>Forgot password</p>
                    </div>
                    <button>Sign in</button>
                    <button>Login as admin</button>

                </form>
            </div>
        </div>
    )
}

export default Login
