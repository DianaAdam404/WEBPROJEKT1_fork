//var express = require('express');
import express from 'express';
import userController from '../controllers/userController.js';
var router = express.Router();

//app.js prefix: /users
router.get('/', userController.getAll); // Összes felhasználó lekérése
router.get('/:id', userController.getById); // Felhasználó lekérése ID alapján

export default router;
