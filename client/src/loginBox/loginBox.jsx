import React from 'react'
import useLogin from '../hooks/useLogin'
import './loginBox.css'
const LoginBox = () => {
    let {handleLogin}=useLogin()
    return (
        <div className='loginbox w-50 mx-auto'>
            <form onSubmit={(event)=>handleLogin(event)}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1"/>
                    </div>

                    <button type='submit' className='btn btn-outline-success'>Login</button>
            </form>
        </div>
    )
}

export default LoginBox;
