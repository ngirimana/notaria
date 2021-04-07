import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import MetaData from '../layout/MetaData';
import Spinner from '../layout/Spinner';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getDocuments, clearErrors } from '../../actions/documentActions';


const DocumentsList = ({ history }) => {
	const alert = useAlert();
	const dispatch = useDispatch();

	const { loading, error, documents} = useSelector(
		(state) => state.documents,
	);
	

	useEffect(() => {
		dispatch(getDocuments());

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		

		
	}, [dispatch, alert, error, history]);

	const setDocuments = () => {
		const data = {
			columns: [
				{
					label: 'First Name',
					field: 'firstName',
					sort: 'asc',
				},
				{
					label: 'Last Name',
					field: 'lastName',
					sort: 'asc',
				},
				{
					label: 'ID Card',
					field: 'idCard',
					sort: 'asc',
				},
				{
					label: 'Phone number',
					field: 'phone',
					sort: 'asc',
				},
				{
					label: 'Email',
					field: 'email',
					sort: 'asc',
				},
				{
					label: 'Category',
					field: 'category',
					sort: 'asc',
				},

				{
					label: 'Actions',
					field: 'actions',
				},
			],
			rows: [],
		};

	documents && documents.forEach((document) => {
			data.rows.push({
				firstName: document.firstName,
				lastName: document.lastName,
				idCard: document.idCard,
				email: document.email,
				phone: document.phone,
				category: document.category,
				actions: (
					<Fragment>
						<Link
							 to={`/document/${document._id}`}
							className="btn btn-primary py-1 px-2"
						>
							<i className="fa fa-eye"></i>
						</Link>
						<button className="btn btn-danger py-1 px-2 ml-2">
							<i className="fa fa-trash"></i>
						</button>
					</Fragment>
				),
			});
		});

		return data;
	};

	return (
		<Fragment>
			<MetaData title={'All Documents'} />
			{loading ? (
							<Spinner/>
						) : (
			<div className="row">
				<div className="col-12 col-md-12">
					<Fragment>
						<h1 className="my-5">All Documents</h1>

						
							<MDBDataTable
								data={setDocuments()}
								className="px-3"
								bordered
								striped
								hover
							/>
						
					</Fragment>
				</div>
			</div>)}
		</Fragment>
	);
};

export default DocumentsList;
