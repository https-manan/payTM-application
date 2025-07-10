import { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter,setFilter] = useState('')
useEffect(() => {
  const token = localStorage.getItem('Token');

  axios.get('http://localhost:8080/api/v1/user/bulk', {
    params: {
      filter: filter
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      setUsers(res.data.users);
    })
    .catch(err => {
      console.error("Failed to fetch users:", err);
    });
}, [filter]);



  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold pb-2">Users</h2>

      <input
        onChange={(e)=>{setFilter(e.target.value)}}
        placeholder="Search users..."
        className="w-full border border-gray-200 rounded px-3 py-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-gray-300"
      />

      <div className="space-y-4">
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const initials = user.firstname?.charAt(0).toUpperCase() || '?';

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 rounded shadow-sm border">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-700">
          {initials}
        </div>
        <div className="text-sm font-medium text-gray-800">
          {capitalize(user.firstname)} {capitalize(user.lastname)}
        </div>
      </div>
      <button className="bg-gray-900 text-white px-4 py-1.5 rounded hover:bg-gray-800 text-sm">
        Send Money
      </button>
    </div>
  );
}
export default Users;
