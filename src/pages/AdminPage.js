import { useEffect, useState } from 'react';
import UsersTable from '../components/UsersTable';
import { useNavigate } from 'react-router-dom';
import checkStatus from '../handlers/checkStatus'
import { blockUsers, unblockUsers, deleteUsers } from "../handlers/adminFetchHelpers";

const AdminPage = ({ currentUser }) => {

  const [users, setUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch('https://backend-adminpanel.onrender.com/api/users')
    .then(res => res.json())
    .then(data => setUsers(data));
  },[]);

  async function blockHandler() {
    const userStatus = await checkStatus(currentUser.username);
    console.log(userStatus);
    if (userStatus === "active") {
        const selectedUserIds = users.filter((user) => user.selected).map((user) => user.user_id);
        if (selectedUserIds.length === 0) {
            alert('Please select at least one user to block.');
            return;
        }
        blockUsers(selectedUserIds);
        const updatedUsers = users.map((user) => {
            return selectedUserIds.includes(user.user_id) ? { ...user, user_status: 'blocked', selected: false } : user
        });
        setUsers(updatedUsers);
        setSelectAll(false);
    }
    else if(userStatus === "blocked") {
        navigate('/blocked-user');
    }
    else {
        navigate('/register');
    }
}

async function unblockHandler() {
  const userStatus = await checkStatus(currentUser.username);
  if(userStatus === "active") {
      const selectedUserIds = users.filter((user) => user.selected).map((user) => user.user_id);
      if (selectedUserIds.length === 0) {
          alert('Please select at least one user to unblock.');
          return;
      }
      unblockUsers(selectedUserIds);
      const updatedUsers = users.map((user) =>
          selectedUserIds.includes(user.user_id) ? { ...user, user_status: 'active', selected: false } : user
      );
      setUsers(updatedUsers);
      setSelectAll(false);
  }
  else if(userStatus === "blocked") {
      navigate('/blocked-user');
  }
  else {
      navigate('/register');
  }
}

async function deleteHandler(currentUser, users, navigate, setUsers, setSelectAll) {
  // const userStatus = await checkStatus(currentUser.username);
  const userStatus = "active";
  if(userStatus === "active") {
      const selectedUserIds = users.filter((user) => user.selected).map((user) => user.user_id);
      if (selectedUserIds.length === 0) {
          alert('Please select at least one user to delete.');
          return;
      }
      deleteUsers(selectedUserIds);
      const updatedUsers = users.filter((user) => !selectedUserIds.includes(user.user_id));
      setUsers(updatedUsers);
      setSelectAll(false);
  }
  else if(userStatus === "blocked") {
      navigate('/blocked-user');
  }
  else {
      navigate('/register');
  }
}

  return (
    <div className='panel'>
        <h1>Admin Panel</h1>
        <h2>Welcome, {currentUser.username}!</h2>
        <div className='toolbar'>
          <button id='block-btn' type="button" className="btn btn-danger" onClick={() => blockHandler(currentUser, users, navigate, setUsers, setSelectAll)}>Block</button>
          <i className="fa-solid fa-unlock" title='Unblock' onClick={() => unblockHandler(currentUser, users, navigate, setUsers, setSelectAll)}></i>
          <i className="fa-solid fa-trash-can" title='Delete' onClick={() => deleteHandler(currentUser, users, navigate, setUsers, setSelectAll)}></i>
        </div>
        <UsersTable 
          users={users} 
          setUsers={setUsers}
          selectAll={selectAll}
          setSelectAll={setSelectAll}
        />
    </div>
  )
}

export default AdminPage;
