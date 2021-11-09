import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import './App.css';
import Login from './components/login'
import Signup from './components/signup'
import TodoList from './components/todolist';
import { wrapState, userState, usersState } from './recoil'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  const [user, setUser] = useRecoilState(userState);
  const [wrap, setWrap] = useRecoilState(wrapState);
  const [users, setUsers] = useRecoilState(usersState);


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


  return (
    <BrowserRouter>
      <Routes>
        {/* <Login /> */}
        <Route exact path="/Todo_List/" element={<Login />} />
        <Route path="/Todo_List/components/signup.js" element={<Signup />} />
        <Route path="/Todo_List/components/todolist.js" element={<TodoList />} />
        {/* 
        {wrap.login ? (<Login />) : ''}
        {wrap.signup ? (<Signup />) : ''}
        {wrap.list ? (<TodoList users={users} addToList={addToList} deleteElement={deleteElement} clearAll={clearAll} />) : ''} */}
      </Routes>
    </BrowserRouter >
  )
}


export default App;
