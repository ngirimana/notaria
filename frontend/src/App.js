import {useEffect} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Login from "./components/user/Login";
import Register from './components/user/Register';
import NewDocument from "./components/Document/NewDocument";
import DocumentsList from './components/Document/DocumentList';
import ProtectedRoute from './components/route/ProtectedRoute';
import ProductDetails from './components/Document/DocumentDetails';
//import Home from './components/Home'
import {loadUser} from './actions/userActions';
import store from './store';
function App() {
 useEffect(() => {
    store.dispatch(loadUser());
  },[])
  return (
		<Router>
			<div className="App">
				<Header />
				<div className="container container-fluid">
					<Route path="/" component={Login} exact />
					<Route path="/login" component={Login} />
					<ProtectedRoute
						path="/register"
						isAdmin={true}
						component={Register}
					/>

					<ProtectedRoute path="/document" component={NewDocument} exact />
					<ProtectedRoute path="/documents" component={DocumentsList}exact/>
					<ProtectedRoute path="/document/:id" component={ProductDetails} />
				</div>

				<Footer />
			</div>
		</Router>
	);
}

export default App;
