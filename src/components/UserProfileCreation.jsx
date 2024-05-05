import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    profilePhoto: null,
    coverPhoto: null,
    gender: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('phoneNumber', formData.phoneNumber);
    formDataToSend.append('profilePhoto', formData.profilePhoto);
    formDataToSend.append('coverPhoto', formData.coverPhoto);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('country', formData.country);

    try {
      const response = await fetch('https://qviqserver.onrender.com/api/signup', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        const data = await response.json();
        alert(" Profile Created Successfully!");
        navigate("/")
      } else if (response.status === 400) {
        alert('This user already exists');
      } else {
        alert('Try again later');
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div className="min-h-screen bg-blue-100 flex flex-col justify-between bg-gradient-to-b from-skyblue-200 to-skyblue-300">
      <nav className="bg-pink-200 py-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-center">
            Create Your Profile 
          </h1>
        </div>
      </nav>
      <div className="container  mx-auto flex-1 flex items-center justify-center">
        <div className="max-w-md bg-blue-300 p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Profile Creation</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input border border-gray-300 p-2 w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="input border border-gray-300 p-2 w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="profilePhoto" className="block mb-1">
                  Profile Photo
                </label>
                <input
                  type="file"
                  id="profilePhoto"
                  name="profilePhoto"
                  accept="image/*"
                  onChange={handleChange}
                  className="input border border-gray-300 p-2 w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="coverPhoto" className="block mb-1">
                  Cover Photo
                </label>
                <input
                  type="file"
                  id="coverPhoto"
                  name="coverPhoto"
                  accept="image/*"
                  onChange={handleChange}
                  className="input border border-gray-300 p-2 w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="gender" className="block mb-1">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="input border border-gray-300 p-2 w-full"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="country" className="block mb-1">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="input border border-gray-300 p-2 w-full"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4 block mx-auto"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
