import express from 'express';
import upload from '../middleware/multer.js';
import ContactController from '../controllers/contactController.js';

const router = express.Router();

router.post('/designForm', upload.array('files', 5), ContactController.sendContactForm);

export default router;
