
let useLogin=()=>{
    function handleLogin(e){
        e.preventDefault()
        let email=e.target[0].value
        let password=e.target[1].value
        
        console.log(password);
        fetch('http://localhost:5000/auth/login',{
            headers:{
                'Content-Type': 'application/json'
            },
            method:'POST',
            body:JSON.stringify({
                email,
                password
            })

        }).then(res =>res.json())
        .then(data=>{
            console.log(data)
        })
    }
    return {handleLogin}
}

export default useLogin;