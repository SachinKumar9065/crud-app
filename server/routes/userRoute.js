import express from 'express'
import { create, deleteUser, getAll, getOne, update } from '../controller/userController.js';

const router = express.Router();

//create
router.post('/create', create)

//get all data
router.get('/getAll', getAll)

//get data by id
router.get('/getone/:id', getOne)

//update by id
router.put('/update/:id', update)

// delete user by id
router.delete('/delete/:id', deleteUser);

export default router;