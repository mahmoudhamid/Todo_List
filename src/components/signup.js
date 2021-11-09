import './style.css'
import { useRecoilState } from 'recoil'
import { useState } from 'react'
import { wrapState, userState, usersState } from '../recoil'
import { NavLink } from 'react-router-dom'

const Signup = () => {
    const [newUser, setnewUser] = useState({ id: Math.random(), name: '', username: '', password: '', list: [] });
    const [wrap, setWrap] = useRecoilState(wrapState);
    const [user, setUser] = useRecoilState(userState);
    const [users, setUsers] = useRecoilState(usersState);
    let routingWrap = { ...wrap };


    const addNewUser = (newUser) => {
        let loginUser = { ...user };
        let data = [...users];
        let found = false;
        users.forEach(user => {
            if (newUser.username === user.username) {
                found = true;
            }
        })
        console.log(found);
        if (!found) {
            loginUser = { name: newUser.name, username: newUser.username, list: [], id: Math.random(), password: newUser.password };
            setUser(loginUser);
            data = [...data, loginUser];
            setUsers([...data]);
            localStorage.setItem("users", JSON.stringify(data));
            routingWrap = { list: true, login: false, signup: false };
            setWrap({ list: true, login: false, signup: false });
            localStorage.setItem("wrap", JSON.stringify(wrap));
            localStorage.setItem("loginUser", JSON.stringify(loginUser));
        }
    }
    const saveName = (e) => {
        setnewUser({ ...newUser, name: e.target.value });
    }
    const saveUsername = (e) => {
        setnewUser({ ...newUser, username: e.target.value });
    }
    const savePassword = (e) => {
        setnewUser({ ...newUser, password: e.target.value });
    }
    const saveNewUser = () => {
        if (newUser.name !== '' && newUser.username !== '' && newUser.password !== '') {
            addNewUser(newUser);
        }
        else {
            console.log('incorrect')
        }
    }
    const cancel = () => {
        routingWrap = { list: false, login: true, signup: false };
        setWrap({ list: false, login: true, signup: false });
        localStorage.setItem("wrap", JSON.stringify(wrap));
    }
    return (
        <div className="signup">
            <div className="container">
                <h1>SIGN UP</h1>
                <form>
                    <label>Enter your name</label>
                    <input onChange={saveName} placeholder="Name" type="text" name="name" />
                    <label>Enter your Email or Username</label>
                    <input onChange={saveUsername} placeholder="Username" type="text" name="username" />
                    <label>Enter your password</label>
                    <input onChange={savePassword} placeholder="password" type="password" name="password" />
                    <div className="confirm" >

                        <NavLink to={(routingWrap.list) ? ("/Todo_List/src/components/todolist.js") : ("#")}>
                            <button onClick={saveNewUser} type="button" name="login" value="Login" >Save</button>
                        </NavLink>

                        <NavLink to="/Todo_List/">
                            <button onClick={cancel} className="cancel" type="button" name="cancel" >   Cancel</button>
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Signup
