import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const { phoneNumber } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://qviqserver.onrender.com/api/user/${phoneNumber}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error("Error fetching user:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [phoneNumber]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white rounded-md shadow-md overflow-hidden relative">
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
      </div>
    </div>
  );
};

export default UserDetails;
