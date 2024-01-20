const User = require("../models/User")
const DisplayUser = {
    getAllUsers: async(req,res) =>{
        try{
            const user = await User.find();
             return res.status(200).json(user)
            
            
        }catch(err){
            res.status(400).json(err)
            console.log(err);
        }
    },
    deleteUser: async(req,res) =>{
      try {
        // Kiểm tra xem yêu cầu có tham số _id không
        if (!req.params._id) {
          throw new Error("Yêu cầu không có tham số _id");
        }
    
        // Tìm người dùng theo ID
        const user = await User.findById(req.params._id);
    
        
       
    
        // Xóa người dùng
        const deletedUser = await User.findByIdAndDelete(req.params._id);
    
        // Kiểm tra xem người dùng đã được xóa hay chưa
        if (!deletedUser) {
          throw new Error("Không thể xóa người dùng");
        }
    
        res.status(200).json("Người dùng đã bị xóa");
      }catch (err) {
        res.status(500).json("lỗi rồi");
        console.log(err);
      }
    },

};
module.exports = DisplayUser;