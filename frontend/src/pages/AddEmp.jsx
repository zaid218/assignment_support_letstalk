import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { baseUrl } from '../apiconfig';
const AddEmp = () => {
  
  const [employee, setEmployee] = useState({
    Name: '',
    Age: 0,
    Salary: 0,
    Designation: '',
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setEmployee((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = currentUser ? currentUser.User._id : null;
      if (!userId) {
        setError("User not authenticated. Please log in.");
        return;
      }

      const token = currentUser ? currentUser.token : null;
      if (!token) {
        setError("User token not available. Please log in.");
        return;
      }

      await axios.post(
        `${baseUrl}user/emp`,
        { ...employee, userId,token },
        
      );
      navigate('/user/dashboard');
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth2">
      <div className="xt" style={{ marginTop: '4.5em' }} data-aos="zoom-out">
        <form style={{ height: '23em' }} data-aos="zoom-in">
          <h1>Add Employee</h1>
          <input
            required
            type="text"
            placeholder="Name"
            name="Name"
            onChange={handleChange}
          />
          <input
            required
            type="number"
            placeholder="Age"
            name="Age"
            onChange={handleChange}
          />
          <input
            required
            type="number"
            placeholder="Salary"
            name="Salary"
            onChange={handleChange}
          />
          <input
            required
            type="text"
            placeholder="Designation"
            name="Designation"
            onChange={handleChange}
          />

          <button onClick={handleSubmit} className="form-btn">
            Add Employee
          </button>
          {err && <p>{err}</p>}
          <span>
            Cancel Add Employee?{' '}
            <Link
              style={{
                textDecoration: 'none',
                color: '#ff9899',
                backgroundColor: 'inherit',
              }}
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default AddEmp;
