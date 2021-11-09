import './style.css'
import { useState } from 'react'
import { userState, errorState, wrapState, usersState } from './../recoil'
import { useRecoilState } from 'recoil'



const Login = () => {

    const [users, setUsers] = useRecoilState(usersState);
    const [user, setUser] = useRecoilState(userState);
    // const [error, setError] = useRecoilState(errorState);
    const [input, setInput] = useState({ username: '', password: '' })
    const [wrap, setWrap] = useRecoilState(wrapState);



    const handleUsername = (e) => {
        setInput({ ...input, username: e.target.value })
    }

    const handlePassword = (e) => {
        setInput({ ...input, password: e.target.value })
    }

    const handleSubmit = () => {
        let routingWrap = { ...wrap };
        let loginUser = { ...user };
        let usersArray = JSON.parse(localStorage.getItem("users") || '[]');;
        usersArray.forEach(one => {
            if (one.username === input.username && one.password === input.password) {
                loginUser = { ...user, username: one.username, name: one.name, id: one.id, list: one.list, password: one.password }
                setUser(loginUser);
                routingWrap = { list: true, login: false, signup: false }
                setWrap(routingWrap);
            }
        })
        console.log(loginUser);
        localStorage.setItem("loginUser", JSON.stringify(loginUser));
        localStorage.setItem("wrap", JSON.stringify(routingWrap));

    }

    const handleSignup = () => {
        let routingWrap = { ...wrap };
        routingWrap = { list: false, login: false, signup: true };
        setWrap(routingWrap);
        localStorage.setItem("wrap", JSON.stringify(routingWrap));
        localStorage.setItem("loginUser", JSON.stringify([]));
    }

    return (
        <div className="login">
            <div className="container">
                <h1>LOGIN</h1>
                <input onChange={handleUsername} placeholder="Username" type="text" name="username" />
                <input onChange={handlePassword} placeholder="password" type="password" name="password" />
                <div className="buttons">
                    <button onClick={handleSubmit} type="button" name="login" value="Login" >Login</button>
                    <span>OR</span>
                    <button onClick={handleSignup} type="button" name="signup">Create New Account</button>
                </div>
            </div>
        </div>
    )
    // return (
    //     <TodoList name={user.name} />
    // )
}

export default Login
