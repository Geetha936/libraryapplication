export const SpinnerLoading = ()=>{
    return(
        <div className="container mt-5 d-flex justify-content-center" style={{height:550}}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">loading..</span>
            </div>
        </div>
    );
}