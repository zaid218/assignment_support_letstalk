// const mongoose = require('mongoose');
// const empSchema = new mongoose.Schema({
//     Name : {
//         type : String,
//         required : true
//     },
//     Age : {
//         type : Number,
//         required : true
//     },
//     Salary : {
//         type : Number,
//         required : true
//     },
//     Designation : {
//         type : String,
//         required : true
//     }

// }, {timestamps:true}
// )
// module.exports = mongoose.model("Employ", empSchema)



const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    Salary: {
        type: Number,
        required: true
    },
    Designation: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Employee", empSchema, "Employees");
