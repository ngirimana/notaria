import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/userReducer";
import { documentReducer,documentsReducer,documentDetailsReducer} from "./reducers/documentReducer";


const reducer = combineReducers({
  auth: authReducer,
  newDocument: documentReducer,
  documents: documentsReducer,
  documentDetails:documentDetailsReducer
});
const middleware = [thunk];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
