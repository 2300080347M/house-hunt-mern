import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/all-users');
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
          return;
        }

        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchListings = async () => {
      try {
        const res = await fetch('/api/listing/admin/listings');
        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
          return;
        }

        setListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
    fetchListings();
  }, []);

  const handleDeleteListing = async (id) => {
    try {
      await fetch(`/api/listing/admin/delete/${id}`, {
        method: 'DELETE',
      });

      setListings(
        listings.filter((listing) => listing._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='p-5'>
      <h1 className='text-3xl font-bold mb-8 text-center'>
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10'>
        <div className='bg-blue-500 text-white p-5 rounded-lg shadow-lg'>
          <h2 className='text-xl font-bold'>Total Users</h2>
          <p className='text-3xl mt-2'>{users.length}</p>
        </div>

        <div className='bg-green-500 text-white p-5 rounded-lg shadow-lg'>
          <h2 className='text-xl font-bold'>Total Listings</h2>
          <p className='text-3xl mt-2'>{listings.length}</p>
        </div>

        <div className='bg-red-500 text-white p-5 rounded-lg shadow-lg'>
          <h2 className='text-xl font-bold'>Admins</h2>
          <p className='text-3xl mt-2'>
            {users.filter((user) => user.isAdmin).length}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <h2 className='text-2xl font-bold mb-4'>Users</h2>

      <div className='overflow-x-auto mb-10'>
        <table className='w-full border'>
          <thead>
            <tr className='bg-slate-700 text-white'>
              <th className='p-3 border'>Username</th>
              <th className='p-3 border'>Email</th>
              <th className='p-3 border'>Admin</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className='p-3 border'>{user.username}</td>
                <td className='p-3 border'>{user.email}</td>
                <td className='p-3 border'>
                  {user.isAdmin ? 'YES' : 'NO'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Listings Table */}
      <h2 className='text-2xl font-bold mb-4'>Listings</h2>

      <div className='overflow-x-auto'>
        <table className='w-full border'>
          <thead>
            <tr className='bg-slate-700 text-white'>
              <th className='p-3 border'>Property Name</th>
              <th className='p-3 border'>Price</th>
              <th className='p-3 border'>Type</th>
              <th className='p-3 border'>Delete</th>
            </tr>
          </thead>

          <tbody>
            {listings.map((listing) => (
              <tr key={listing._id}>
                <td className='p-3 border'>{listing.name}</td>

                <td className='p-3 border'>
                  ₹ {listing.regularPrice}
                </td>

                <td className='p-3 border'>
                  {listing.type}
                </td>

                <td className='p-3 border'>
                  <button
                    onClick={() =>
                      handleDeleteListing(listing._id)
                    }
                    className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}