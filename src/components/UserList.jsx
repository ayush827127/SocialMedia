import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://qviqserver.onrender.com/api/users"
        );
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Error fetching users:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleQR = (user) => {
    setSelectedUser(user);
    setShowQR(!showQR);
  };

  return (
    <div>
      <div className="container mx-auto mt-8 ">
        <h1 className="text-3xl font-bold mb-4">User List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-md shadow-md overflow-hidden relative"
            >
              <button
                className="absolute top-0 right-0 m-2 p-2 rounded-full bg-blue-500 text-white"
                onClick={() => handleToggleQR(user)}
              >
                <span className="text-xl">i</span>
              </button>
              <img
                src={`https://qviqserver.onrender.com/uploads/${user.coverPhoto}`}
                alt="Cover Photo"
                className="w-full h-32 object-cover rounded-t-md"
              />
              <div className="relative flex justify-center">
                <img
                  src={`https://qviqserver.onrender.com/uploads/${user.profilePhoto}`}
                  alt="Profile Photo"
                  className="w-32 h-32 object-cover rounded-full border-4 border-white -mt-16"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{user.name}</h2>
                <p className="text-gray-600 mb-2">{user.phoneNumber}</p>
                <div className="flex justify-between">
                  <p className="text-gray-600 mb-2">{user.gender}</p>
                  <p className="text-gray-600 mb-2">{user.country}</p>
                </div>
              </div>
              {showQR && selectedUser === user && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-8 rounded-lg">
                    <QRCode
                      value={`${window.location.href}user/${user.phoneNumber}`}
                    />
                    <button
                      className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                      onClick={() => setShowQR(false)}
                    >
                      Close QR
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
