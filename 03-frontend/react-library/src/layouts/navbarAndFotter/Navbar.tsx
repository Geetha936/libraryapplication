import { useOktaAuth } from "@okta/okta-react";
import { Link, NavLink } from "react-router-dom";
import { SpinnerLoading } from "../utils/Spinner";

export const Navbar=() => {

  const {oktaAuth,authState} =useOktaAuth();
  if(!authState){
    return <SpinnerLoading/>

  }
  const handleLogout =async() => oktaAuth.signOut();
  console.log(authState);
    return (

        <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
      <div className='container-fluid'>
        <span className='navbar-brand'>LibJar</span>
        <button type='button' className='navbar-toggler' 
        data-bs-toggle='collapse' data-bs-target="#navbarNavDropdown" 
        aria-label="navigation items" aria-controls='nabarNavDropdown'
        aria-expanded="false">
          <span className='navbar-toggler-icon'> </span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
              <ul className='navbar-nav'>
                <li className='navbar-item'>
                  <NavLink  className='nav-link' to={"/home"}>Home</NavLink>
                  </li>
                <li><NavLink  className='nav-link' to={"/search"}>Search Books</NavLink></li>
              </ul>
              <ul className='navbar-nav ms-auto'>
                {!authState.isAuthenticated ? 
                <li className='nav-item m-1'>
                <Link  type='button' className='btn btn-outline-light' to='/login'>Sign In</Link>
              </li> :<li className='nav-item m-1'>
                  <button  type='button' className='btn btn-outline-light' onClick={handleLogout}>LogOut</button>
                </li>}
                
              </ul>
        </div>

      </div>
    </nav>
    );
}
