import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';


const EmployeeList = () => {
    const [employee, setEmployee] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [insertModal, setInsertModal] = useState(false);
    const [currentUser, setCurrentUser] = useState([]);
    const [formData, setFormData] = useState([])
    const ref = useRef([]);

    useEffect(() => {
        fetchData();
    }, []);

    

    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}fetch`);
            ref.current = response.data;
            setEmployee(ref.current);
        }
         catch(error) {
            console.log('Error Fetching Data :', error);
         }

    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${apiUrl}insert`, currentUser);
            console.log(currentUser);
            if(response.data.type === 'success') {
                alert(response.data.message);
                setIsModalOpen(false)
            }
            else if (response.data.type === 'error') {
                alert(response.data.message)
            }
        }
        catch (error) {
            console.log(alert('Failed to submit data!1', error))
        }
    }

     const openInsertModal = () => {
        setInsertModal(true);
        setFormData([]);
      };


     const handleInputChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post
        }
     }
    

    return (
        <div>
                <button onClick={() => openInsertModal()}>Insert</button>

           <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>fname</th>
            <th>lname</th>
            <th>department</th>
            <th>role</th>
            <th>email</th>
            <th>age</th>
          </tr>
        </thead>
        <tbody>
          {employee.length > 0 ? (
            employee.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.fname}</td>
                <td>{user.lname}</td>
                <td>{user.department}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data found!</td>
            </tr>
          )}
        </tbody>
      </table>

      {insertModal && (
            <div className="modal">
              <div className="modal-content">
                <h2>Insert New User</h2>
                <form onSubmit={handleInsertSubmit}>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="uname"
                    placeholder='Enter name...'
                    value={formData.uname}
                    onChange={handleInsertChange}
                    required
                  />
                  <label>Contact Number:</label>
                  <input
                    type="text"
                    name="ucontact"
                    placeholder='Enter contact number...'
                    value={formData.ucontact}
                    onChange={handleInsertChange}
                    required
                  />
                  <div className="modal-actions">
                    <button type="submit">Insert</button>
                    <button type="button" onClick={() => setInsertModal(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
        </div>
    );
};

export default EmployeeList;