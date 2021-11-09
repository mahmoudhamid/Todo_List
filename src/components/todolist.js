import './style.css'
import { useRecoilState } from 'recoil'
import { userState, wrapState, newItemState } from './../recoil'
const TodoList = ({ addToList, deleteElement, clearAll }) => {
    const [user, setUser] = useRecoilState(userState);
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

    return (
        <div className="todolist">
            <div className="container" >
                <div className="head" >
                    <h1>{user.name.toUpperCase()}'s Todo List</h1>
                    <button onClick={handleLogout} type="button" name="logout"  >Logout</button>
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
