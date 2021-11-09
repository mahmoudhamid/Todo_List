import './style.css'
import { useRecoilState } from 'recoil'
import { userState, wrapState, newItemState, usersState } from './../recoil'
import { NavLink } from 'react-router-dom'
const TodoList = () => {
    const [user, setUser] = useRecoilState(userState);
    const [users, setUsers] = useRecoilState(usersState);
    const [wrap, setWrap] = useRecoilState(wrapState);
    const [newItem, setNewItem] = useRecoilState(newItemState);

    const handleLogout = () => {
        let routingWrap = { ...wrap };
        let loginUser = { ...user, username: '', name: '', id: '', list: [], password: '' };
        localStorage.setItem("loginUser", JSON.stringify(loginUser));
        setUser(loginUser);
        routingWrap = { list: false, login: true, signup: false };

        setWrap(routingWrap);
        localStorage.setItem("wrap", JSON.stringify(routingWrap));
    }
    const handleText = (e) => {
        setNewItem(e.target.value);
    }

    const showList = () => {
        if (!user.list.length) {
            return (
                <p>there is no items</p>
            )
        }
        else {
            return (
                user.list.map(item => {
                    return (
                        <li key={Math.random()} className="item">
                            <div>{item.name}</div>
                            <button onClick={() => deleteElement(user.id, item.id)}>x</button>
                        </li>
                    )
                })
            )
        }

    }



    const addToList = (id) => {
        let loginUser = { ...user };
        if (newItem !== '') {
            let arr = [];
            arr = [...loginUser.list];
            arr.push({ id: Math.random(), name: newItem });
            loginUser.list = [...arr];
            setUser(loginUser);
            setNewItem('');
        }
        let usersArray = JSON.parse(localStorage.getItem("users") || '[]');;
        usersArray = usersArray.filter(user => { return (user.id !== id) });
        usersArray.push(loginUser);
        localStorage.setItem("users", JSON.stringify(usersArray));
        localStorage.setItem("loginUser", JSON.stringify(loginUser));
    }


    const deleteElement = (elementId, itemId) => {
        let usersArray = JSON.parse(localStorage.getItem("users") || '[]');;
        let loginUser = { ...user };
        let arr = user.list;
        arr = arr.filter(item => { return (item.id !== itemId) });
        loginUser.list = [...arr];
        setUser(loginUser);
        usersArray = usersArray.filter(user => { return (user.id !== elementId) });
        usersArray.push(loginUser);
        localStorage.setItem("users", JSON.stringify(usersArray));
        localStorage.setItem("loginUser", JSON.stringify(loginUser));
        setUsers([...usersArray]);
    }

    const clearAll = (id) => {
        let loginUser = { ...user };
        let usersArray = JSON.parse(localStorage.getItem("users") || '[]');;
        usersArray = usersArray.map(user => {
            if (user.id === id) {
                loginUser = { ...user, list: [] };
                setUser(loginUser);
                return { ...user, list: [] };
            } else return user;
        });
        localStorage.setItem("users", JSON.stringify(usersArray));
        localStorage.setItem("loginUser", JSON.stringify(loginUser));
    }

    return (
        <div className="todolist">
            <div className="container" >
                <div className="head" >
                    <h1>{user.name.toUpperCase()}'s Todo List</h1>

                    <NavLink to="/Todo_List/">
                        <button onClick={handleLogout} type="button" name="logout"  >Logout</button>
                    </NavLink>

                </div>
                <form>
                    <input placeholder="Enter New Item" value={newItem} onChange={handleText} type="text" name="todo" />
                    <button onClick={() => addToList(user.id)} type="button" name="addtodo"  >Add</button>
                </form>
                <ul className="list">
                    {showList()}
                </ul>
                <button onClick={() => clearAll(user.id)} className="clearbutton" type="button" name="clear"  >Clear All</button>

            </div>
        </div>
    )
}

export default TodoList
