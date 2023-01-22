import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Explore from './pages/Explore';
import Category from './pages/Category';
import Profiles from './pages/Profile';
import {PrivateRoute}  from './Components/PrivateRoute';
import SignUp from './pages/SignUp';
import Offers from './pages/Offers';
import SignIn from './pages/SignIn';
import ForgotPasswword from './pages/ForgotPassword'; 
import Navbar from './Components/Navbar';
import CL from './pages/CL';
import Listing from './pages/Listing';
import Contact from './pages/Contact';
import EditListing from './pages/EditListing';

export default function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/category/:categoryName' element={<Category />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profiles />} />
          </Route>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPasswword />} />
          <Route path='/create-listing' element={<CL />} />
          <Route path='/edit-listing' element={<EditListing />} />
          <Route path='/category/:categoryName/:listingId' element={<Listing />} />
          <Route path='/contact/:landlordId' element={<Contact />} />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer />
    </>
  );
}
