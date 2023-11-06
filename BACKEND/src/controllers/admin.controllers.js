//admin.controllers.js
const adminService = require('../services/admin.service');

exports.getAllUsers = (req, res) => {
    return adminService.getAllUsers(req,(error,data)=>{
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("Showing all users");
    });
};

exports.saveUser = (req, res) => {
    adminService.createUser(req,(error,data)=>{
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("User saved successfully");
    })
};

exports.deleteUser = (req,res) => {
    adminService.deleteUser(req, (error,data)=> {
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("User deleted successfully");
    })
};

exports.changeUser = (req, res) => {
    adminService.changeUser(req,(error,data)=>{
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("User updated successfully");
    })
};
