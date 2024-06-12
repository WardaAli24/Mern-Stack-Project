// client/src/components/UserList.js
import React, { useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

const UserList = ({ users, deleteUser, fetchUsers }) => {
  const navigate = useNavigate();

  const editUser = (id) => {
    navigate(`/edit-user/${id}`);
  }

  useEffect(() => {
    fetchUsers()
  }, [])
  return (
    <div className=' mt-10 flex flex-col mx-auto justify-center '>
      <div className='justify-between flex'>
      <div className="bg-white px-2 py-0.1 rounded">
      <h2 className="text-xl font-bold mb-2">User List</h2>
      </div>

        <Link to="/add-user" className="bg-black text-white hover:bg-white hover:text-black font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
          Add User
        </Link>
      </div>
      <table className="table-auto mt-10 w-full">
    <thead>
      <tr className="bg-white">
      <th className="px-4 border py-2">Name</th>
      <th className="px-4 border py-2">Email</th>
      <th className="px-4 border py-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {users?.length ? (
      users.map((user, index) => (
        <tr key={user._id} className={index % 2 === 0 ? 'bg-white' : 'bg-white'}>
          <td className="border px-4 py-2 text-center">{user.name}</td>
          <td className="border px-4 py-2 text-center">{user.email}</td>
          <td className="border px-4 py-2 flex flex-nowrap justify-center">
            <button
              className="bg-black text-white hover:bg-white hover:text-black font-bold py-1 px-2 rounded mr-2 focus:outline-none focus:shadow-outlines"
              onClick={() => editUser(user._id)}
            >
              Edit
            </button>
            <button
              className="bg-black text-white hover:bg-white hover:text-black font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              onClick={() => deleteUser(user._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td className="border px-4 py-2 text-center" colSpan="3">No Data Found</td>
      </tr>
    )}
  </tbody>
</table>

    </div>
  );
};

export default UserList;
