import express from 'express';
import { isAuthenticatedUser } from '../middleware/auth';
import  DocumentController  from '../controller/documentController';


const router = express.Router();


router.post('/new-document', isAuthenticatedUser, DocumentController.newDocument);
router.get(
	'/documents',
	isAuthenticatedUser,
	DocumentController.getAllDocuments,
);
router.get(
	'/document/:id',
	isAuthenticatedUser,
	DocumentController.getSingleDocument,
);

export default router;