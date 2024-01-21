import React, { useEffect,useContext } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from '../apiconfig';
import { AuthContext } from "../context/AuthContext";
const Employ = () => {
  const { currentUser } = useContext(AuthContext); 
  const [err, setError] = useState(null);
  const [value, setValue] = useState({});

  const location = useLocation();
  const id = location.pathname.split("/")[3];
  
  const fetchEmp = async () => {
    const token = currentUser ? currentUser.token : null;
    if (!token) {
      setError("User token not available. Please log in.");
      return;
    }
    const res = await axios.put(`${baseUrl}user/empput/${id}`, {

      //send token to eet  by using const accessToken = Cookies.get("access_token"); and using import Cookies from "js-cookie"; 
      token
    }
    );
    setValue(res.data);
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const token = currentUser ? currentUser.token : null;
      if (!token) {
        setError("User token not available. Please log in.");
        return;
      }
      const updatedValue = {
        ...value,
        token,
      };
      const userId = currentUser ? currentUser.User._id : null;
      if (!userId) {
        return;
      }
      await axios.put(`${baseUrl}user/emp/${userId}/${id}`, updatedValue);
      navigate("/user/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchEmp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="auth2">
      <div className="xt" style={{ marginTop: "4.5em" }} data-aos="zoom-out">
        <form style={{ height: "23em" }} data-aos="zoom-in">
          <h1>Edit Employee</h1>
          <input
            required
            type="text"
            placeholder="Name"
            value={value.Name || ""}
            name="Name"
            onChange={handleChange}
          />
          <input
            required
            type="number"
            placeholder="Age"
            value={value.Age || ""}
            name="Age"
            onChange={handleChange}
          />
          <input
            required
            type="number"
            placeholder="Salary"
            value={value.Salary || ""}
            name="Salary"
            onChange={handleChange}
          />
          <input
            required
            type="text"
            placeholder="Designation"
            value={value.Designation || ""}
            name="Designation"
            onChange={handleChange}
          />

          <button onClick={handleSubmit} className="form-btn">
            Update
          </button>
          {err && <p>{err}</p>}
          <span>
            Cancel Edit?{" "}
            <Link
              style={{
                textDecoration: "none",
                color: "#ff9899",
                backgroundColor: "inherit",
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

export default Employ;