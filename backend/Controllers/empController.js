const empModel = require ("../Models/empModel")
const jwt = require("jsonwebtoken")

const addEmp = async (req, res) => {
    try {
        const data = req.body;
        const userId = data.userId; 

        if (!userId) {
            return res.status(401).json("Unauthorized access");
        }

        data.userId = userId;

        const { Name, Age, Salary, Designation} = data;

        if (!Name || !Age || !Salary || !Designation) {
            return res.status(400).json("Please enter all required fields");
        }

        const saveData = await empModel.create({ ...data, userId: userId });
        console.log("Saved Data:", saveData);

        return res.status(201).json(saveData);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
const getEmp = async (req, res) => {
    try {
        console.log("==========================>")
        console.log(req.user); // Log user information
        console.log("==========================>")
        const userId = req.user ? req.user.userId : null;

        if (!userId) {
            return res.status(401).json("Unauthorized access");
        }

        let getData = await empModel.find({ userId }); // Fetch employees by userId
        return res.status(200).json(getData);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const getEmpById = async (req,res) => {
    try {
        let data = req.body
        let {Name, Age, Salary, Designation,userId} = data

        let getData = await empModel.findById({_id: req.params.id})
        return res.status(200).json(getData)

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const updateEmp = async (req, res) => {
    try {
        const body = req.body;
        const userId = req.params.userId; // Extract userId from params

        // Check if the employee belongs to the user
        const emp = await empModel.findOne({ _id: req.params.empId, userId });

        if (!emp) {
            return res.status(404).json("Employee not found or unauthorized access");
        }

        // Update the employee with the correct ID
        const updatedEmp = await empModel.updateOne({ _id: req.params.empId, userId }, { $set: body });

        return res.status(200).json(updatedEmp);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};


const deleteEmp = async (req, res) => {
    try {
        const empId = req.params.empId;
        const userId = req.params.userId; // Extract userId from params

        // Check if the employee belongs to the user
        const emp = await empModel.findOne({ _id: empId, userId });

        if (!emp) {
            return res.status(404).json("Employee not found or unauthorized access");
        }

        const deletedEmp = await empModel.deleteOne({ _id: empId });
        return res.status(200).json("Employee deleted Successfully");
    } catch (error) {
        return res.status(500).json(error.message);
    }
};


module.exports = { addEmp, updateEmp, deleteEmp, getEmp, getEmpById }
