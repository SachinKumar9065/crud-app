import { User } from '../model/userModel.js';

// create
export const create = async (req, res) => {
    try {
        const { fname, lname, email, password } = req.body;

        // Check if all required fields are provided
        if (!fname || !lname || !email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const userData = new User({ fname, lname, email, password });

        const savedData = await userData.save();

        res.status(200).json({
            message: "User data saved successfully!",
            savedData,
            success: true
        });

    } catch (error) {
        res.status(500).json({ error: error.message || error, success: false });
    }
};

export const getAll = async (req, res)=>{
    try {
        const userData = await User.find();

        if(!userData) return res.json({message:"no data exist", success:false})

        res.json({message:"All data fetched succesfully..!", userData, success:true})
        
    } catch (error) {
        res.status(500).json({ error: error.message || error, success: false });
    }
}
 
export const getOne = async (req, res)=>{
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user) return res.json({message:"Invalid Id..!", success:false})

        res.json({message:"User Found Successfully", user, success:true})
        
    } catch (error) {
        res.status(500).json({error:error, success:false})
    }
}

export const update = async (req, res) =>{
    try {

        const id = req.params.id;
        const user = await User.findById(id);
        if(!user) return res.status(404).json({message:"user not found", success:false})

        const updatedData = await User.findByIdAndUpdate(id, req.body, {new:true});

        res.status(200).json({message:"User updated successfully", updatedData, success:true})
        
    } catch (error) {
        res.status(500).json({error:error, success:false})
    }
}

export const deleteUser = async (req, res)=>{
    try {

        const id = req.params.id;
        const user = await User.findById(id);
        if(!user) return res.status(404).json({message:"user does't exist..!", success:false})
        await User.findByIdAndDelete(id);

        res.status(200).json({message:"user deleted successfully..!", success:true})
        
    } catch (error) {
        res.status(500).json({error:error, success:false})
    }
}
