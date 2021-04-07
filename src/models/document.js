import  mongoose from 'mongoose';
import validator from 'validator';

const documentSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'Please enter first name'],
		trim: true,
		maxLength: [100, 'First name cannot exceed 100 characters'],
	},
	lastName: {
		type: String,
		required: [true, 'Please enter last name'],
		trim: true,
		maxLength: [100, 'Last name cannot exceed 100 characters'],
	},
	idCard: {
		type: Number,
		required: [true, 'Please enter idCard'],
		minLength: [16, 'Id card cannot be lower than 16 characters'],
		maxLength: [16, ' Id card cannot exceed 16 characters'],
	},
	phone: {
		type: String,
		required: [true, 'Please enter Phone number'],
	},
	email: {
		type: String,
		required: [true, 'Please enter your email'],
		validate: [validator.isEmail, 'Please enter valid email address'],
	},
	category: {
		type: String,
		required: [true, 'Please enter Document Category'],
	},
	images: [
		{
			public_id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
	],
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Document', documentSchema);
