import React,{useContext} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../apiconfig";
import { AuthContext } from "../context/AuthContext";
function Modal({ setOpenModal, employeeId, setSelectedEmployeeId, updateEmpData }) {
  const { currentUser } = useContext(AuthContext);
  const token = currentUser ? currentUser.token : null;
  if (!token) {
    return;
  }
  const userId = currentUser ? currentUser.User._id : null;
  if (!userId) {
    return;
  }
  const handleDelete = async () => {
    
    try {
      await axios.post(`${baseUrl}user/emp/${userId}/${employeeId}`, {
        token
      });
      updateEmpData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const cancel = () => {
    setOpenModal(false);
    setSelectedEmployeeId(null);
  };

  const handleCombine = () => {
    handleDelete();
    cancel();
  };

  return (
    <div className="modalBackground" data-aos="zoom-out">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={cancel}>x</button>
        </div>
        <div className="title">
          <h1>
            Are You Sure You Want to{" "}
            <span style={{ color: "red" }}>Delete?</span>
          </h1>
        </div>
        <div className="body">
          <p>
            By clicking <span style={{ color: "red" }}>Delete</span>, the employee details will be deleted
          </p>
        </div>
        <div className="footer">
          <button onClick={cancel} id="cancelBtn">
            Cancel
          </button>
          <Link to="/user/dashboard">
            <button onClick={handleCombine}>Delete</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Modal;
