import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import './App.css';
import Login from './components/login'
import Signup from './components/signup'
import TodoList from './components/todolist';
import { wrapState, userState, usersState, newItemState } from './recoil'


const App = () => {
  const [user, setUser] = useRecoilState(userState);
  const [wrap, setWrap] = useRecoilState(wrapState);
  const [users, setUsers] = useRecoilState(usersState);
  const [newItem, setNewItem] = useRecoilState(newItemState);


  // let isLogin = false;
  const getData = async () => {
    const data = JSON.parse(localStorage.getItem("users") || '[]');
    const userData = JSON.parse(localStorage.getItem("loginUser"));
    const routingWrap = JSON.parse(localStorage.getItem("wrap") || '{}');

    setUsers(data);
    setWrap(routingWrap);
    if (localStorage.loginUser) {
      setUser(userData);
    }
  }
  useEffect(() => {
    getData();
  }, [])




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
    <div className="App">
      {wrap.login ? (<Login />) : ''}
      {wrap.signup ? (<Signup />) : ''}
      {wrap.list ? (<TodoList users={users} addToList={addToList} deleteElement={deleteElement} clearAll={clearAll} />) : ''}
    </div>
  )
}


export default App;
