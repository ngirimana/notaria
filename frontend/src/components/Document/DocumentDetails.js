import React, { useEffect, Fragment, } from 'react';
import { useAlert } from 'react-alert';
import { Carousel } from 'react-bootstrap';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getDocumentDetails, clearErrors } from '../../actions/documentActions';


const ProductDetails = ({ match }) => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const { loading, error, document } = useSelector(
		(state) => state.documentDetails,
	);
	useEffect(() => {
        dispatch(getDocumentDetails(match.params.id));
        console.log(match.params.id)
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, alert, error, match.params.id]);
	

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title={document && document.category} />
					{document ? (
						<div className="row f-flex justify-content-around">
							<div className="col-12 col-lg-5 img-fluid" id="product_image">
								<Carousel pause="hover">
									{document.images &&
										document.images.map((image) => (
											<Carousel.Item key={image.public_id}>
												<img
													className="d-block w-100"
													src={image.url}
													alt={document.category}
													height="500"
													width="500"
												/>
											</Carousel.Item>
										))}
								</Carousel>
							</div>

							<div className="col-12 col-lg-5 mt-5">
								<h5>{document.category}</h5>
								<p id="product_id">Document # {document._id}</p>
								<hr />
								<h5 className="mt-2">Owner's first name:</h5>
								<p>{document.firstName}</p>
								<hr />
								<h4 className="mt-2">Owner's last name:</h4>
								<p>{document.lastName}</p>
								<hr />
								<h4 className="mt-2">Owner's ID card Number:</h4>
								<p>{document.idCard}</p>
								<hr />
								<h4 className="mt-2">Owner's email address:</h4>
								<p>{document.email}</p>
								<hr />
								<h4 className="mt-2">Owner's phone number:</h4>
								<p>{document.phone}</p>
								<hr />
								<h4 className="mt-2">Document's category:</h4>
								<p>{document.category}</p>
								<hr />
							</div>
						</div>
					) : (
						''
					)}
				</Fragment>
			)}
		</Fragment>
	);
};

export default ProductDetails;

