import React from 'react'
import './loginBox.css'
const LoginBox = () => {
    return (
        <div className='loginbox w-50 mx-auto'>
            <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1"/>
                    </div>

                    <button className='btn btn-outline-success'>Login</button>
            </form>
        </div>
    )
}

export default LoginBox;
