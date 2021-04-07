import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { newDocument, clearErrors } from '../../actions/documentActions';
import { NEW_DOCUMENT_RESET } from '../../constants/documentConstant';

const NewDocument= ({ history, location }) => {
	const [document, setDocument] = useState({
		firstName: '',
		lastName: '',
		idCard: '',
		phone:'',
		email: '',
		category:''
		
	});
	const categories = ['Degree', 'Diploma', 'Contract', 'Heritage', 'Certificates'];

	const { firstName, lastName,idCard,phone, email,category } = document;
	const [images, setImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState(
		[]
	);
	const alert = useAlert();
	const dispatch = useDispatch();
	const { success, error, loading } = useSelector(
		(state) => state.newDocument,
	);

	

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (success) {
			 history.push('/documents');
			alert.success('Document created successfully');
			dispatch({type:NEW_DOCUMENT_RESET})

			
		}
	}, [dispatch, alert, success, error, history]);

	const submitHandler = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.set('firstName', firstName);
		formData.set('lastName', lastName);
		formData.set('idCard', idCard);
		formData.set('email', email);
		formData.set('phone', phone);
		formData.set('category', category);
		images.forEach((image) => {
			formData.append('images', image);
		});
		console.log(formData.getAll('images').length)
		
		dispatch(newDocument(formData));
	};
	const onChange = (e) => {
		if (e.target.name === 'images') {
			const files = Array.from(e.target.files);

			setImagesPreview([]);
			setImages([]);

			files.forEach((file) => {
				const reader = new FileReader();

				reader.onload = () => {
					if (reader.readyState === 2) {
						setImagesPreview((oldArray) => [...oldArray, reader.result]);
						setImages((oldArray) => [...oldArray, reader.result]);
					}
				};

				reader.readAsDataURL(file);
			});
		} else {
			setDocument({ ...document, [e.target.name]: e.target.value });
		}
	};

	return (
		<Fragment>
			<MetaData title={'New Document'} />
			<div className="row wrapper">
				<div className="col-10 col-lg-5">
					<form
						className="shadow-lg"
						onSubmit={submitHandler}
						encType="multipart/form-data"
					>
						<h1 className="mb-3">New Document</h1>

						<div className="form-group">
							<label htmlFor="name_field">First Name</label>
							<input
								type="text"
								id="name_field"
								className="form-control"
								name="firstName"
								value={firstName}
								data-toggle="tooltip"
								data-placement="bottom"
								title="First Name"
								onChange={onChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="email_field">Last Name</label>
							<input
								type="text"
								id="name_field"
								className="form-control"
								name="lastName"
								value={lastName}
								data-toggle="tooltip"
								data-placement="bottom"
								title="Last Name"
								onChange={onChange}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="email_field">ID Card</label>
							<input
								type="Number"
								id="email_field"
								className="form-control"
								name="idCard"
								value={idCard}
								data-toggle="tooltip"
								data-placement="bottom"
								title="Identification Number Number"
								onChange={onChange}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="password_field">Email</label>
							<input
								type="email"
								id="password_field"
								className="form-control"
								name="email"
								value={email}
								data-toggle="tooltip"
								data-placement="bottom"
								title="Email"
								onChange={onChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="phone_field">Phone</label>
							<input
								type="phone"
								id="phone_field"
								className="form-control"
								name="phone"
								value={phone}
								data-toggle="tooltip"
								data-placement="bottom"
								title="Phone Number"
								onChange={onChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="category_field">Category</label>
							<select
								className="form-control"
								name="category"
								id="category_field"
								value={category}
								onChange={onChange}
							>
								{categories.map((category) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</select>
						</div>
						<div className="form-group">
							<label>Images</label>

							<div className="custom-file">
								<input
									type="file"
									name="images"
									className="custom-file-input"
									id="customFile"
									onChange={onChange}
									data-toggle="tooltip"
									data-placement="bottom"
									title="One image should be less than 1MB"
									multiple
								/>
								<label className="custom-file-label" htmlFor="customFile">
									Choose Images
								</label>
							</div>

							{imagesPreview.map((img) => (
								<img
									src={img}
									key={img}
									alt="Images Preview"
									className="mt-3 mr-2"
									width="55"
									height="52"
								/>
							))}
						</div>

						<button
							id="register_button"
							type="submit"
							className="btn btn-block "
						>
							{loading ? <Loader /> : 'Submit'}
						</button>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

export default NewDocument;
