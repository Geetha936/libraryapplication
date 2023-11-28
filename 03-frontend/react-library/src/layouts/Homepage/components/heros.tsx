import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

export const Heros =() =>{
    const {authState} =useOktaAuth();
    return(
        <div>
            <div className="d-none d-lg-block"> {/* d-none d-lg-block is only on large devices */}
                <div className="row g-0 mt-5">
                <div className="col-sm-6 col-mid-6">
                    <div className="col-image-left"></div>
                </div>
                <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
                    <div className="ml-2">
                        <h1>What have you been reading</h1>
                        <p className="lead">
                            The library yeam would love to know what you have been reading,
                            Whether it is to learn a new skill or grow within one,
                            we will be able to provide the top content for you!
                        </p>
                        {authState?.isAuthenticated ? <Link type="button" className="btn main-color text-white" to="search">Explore Top Books</Link> :
                        <a className="btn main-color btn-lg text-white" href="#"> Sign Up</a>}
                        
                    </div>
                </div>
            </div>
            <div className="row g-0">
                <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
                    <div className="ml-2">
                        <h1>Our collection is allways changing!</h1>
                        <p className="lead">
                            Try to ocheck as our collection as our collection is always changing!
                            we work nonstop to provide the most accurate book slection possible
                            for our libjar students! We are dilligent about our book selection abd
                            our books are always going to be our top priority.
                        </p>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6">
                    <div className="col-image-right">

                    </div>
                </div>
            </div>
          </div>
        
        {/* Mobile*/}
        <div className="d-lg-none"> {/* d-lg-none class is visible on other than large divices*/}
            <div className="container">
                <div className="m-2">
                    <div className="col-image-left">

                    </div>
                    <div className="mt-2">
                    <h1>What have you been reading</h1>
                        <p>
                            The library yeam would love to know what you have been reading,
                            Whether it is to learn a new skill or grow within one,
                            we will be able to provide the top content for you!
                        </p>
                        {authState?.isAuthenticated ? <Link type="button" className="btn main-color text-white" to="search">Explore Top Books</Link> :
                        <a className="btn main-color btn-lg text-white" href="#"> Sign Up</a>}

                    </div>

                </div>

                <div className="mt-2">
                    <div className="col-image-right"></div>

                
                <div className="mt-2">
                <h1>Our collection is allways changing!</h1>
                        <p>
                            Try to ocheck as our collection as our collection is always changing!
                            we work nonstop to provide the most accurate book slection possible
                            for our libjar students! We are dilligent about our book selection abd
                            our books are always going to be our top priority.
                        </p>
                </div>
                </div>

            </div>
            
        </div >



        </div>

    ) 
};