/* eslint-disable no-await-in-loop */
import cloudinary from 'cloudinary';
import Document from '../models/document';
import { errorResponse } from '../utils/response';
import userIdFromToken from '../utils/getUserIdFromToken';

class DocumentController {
	static async newDocument(req, res) {
		try {
			let images = [];
			if (typeof req.body.images === 'string') {
				images.push(req.body.images);
			} else {
				images = req.body.images;
			}

			const imagesLinks = [];

			for (let i = 0; i < images.length; i += 1) {
				const result = await cloudinary.v2.uploader.upload(images[i], {
					folder: 'notaria',
					overwrite: true,
					invalidate: true,
				});

				imagesLinks.push({
					public_id: result.public_id,
					url: result.secure_url,
				});
			}

			req.body.images = imagesLinks;
			req.body.user = req.user.id;
			const document = await Document.create(req.body);

			res.status(201).json({
				success: true,
				document,
			});
		} catch (err) {
			return errorResponse(res, 400, err.message);
		}
	}

	static async getAllDocuments(req, res) {
		try {
			const { token } = req.cookies;
			const user = userIdFromToken(token);
			const documents = await Document.find({ user });
			return res.status(200).send({
				success: true,
				documents,
			});
		} catch (error) {
			return errorResponse(res, 400, error.message);
		}
	}

	/**
	 * Get details for single document => /api/v1/documents/:id
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} details of a single document
	 */
	static async getSingleDocument(req, res) {
		try {
			const document = await Document.findById(req.params.id);
			if (document ) {
				return res.status(200).json({
					success: true,
					document,
				});
			}
			return errorResponse(res, 404, 'Document is not available');
		} catch (err) {
			return errorResponse(res, 400, err.message);
		}
	}
}

export default DocumentController;
