import React from 'react';

const UsersTable = ({ users, setUsers, selectAll, setSelectAll }) => {

  const toggleSelectAll = () => {
    const updatedUsers = users.map((user) => ({ ...user, selected: !selectAll }));
    setUsers(updatedUsers);
    setSelectAll(!selectAll);
  };

  const toggleUser = (userId) => {
    const updatedUsers = users.map((user) =>
      user.user_id === userId ? { ...user, selected: !user.selected } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>
            <input 
              type="checkbox" 
              className='user-check' 
              checked={selectAll} 
              onChange={toggleSelectAll}
              />
          </th>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Last Login Time</th>
          <th>Registration Time</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>  
        {users.map((user) => (
        <tr key={user.user_id}>
          <td>
            <input 
              type="checkbox" 
              className='user-check'
              checked={user.selected}
              onChange={() => toggleUser(user.user_id)}
              />
          </td>
          <td>{user.user_id}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.last_login_time}</td>
          <td>{user.register_time}</td>
          <td>{user.user_status}</td>
        </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
