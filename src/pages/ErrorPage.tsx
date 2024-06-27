import React from "react";
// import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center mt-5">
      <h2>Error Page</h2>
      <h1>404</h1>
      <button className="btn btn-primary" onClick={()=>navigate(-1)}>Back</button>
      {/* <Button variant="primary" onClick={() => navigate(-1)}>Back</Button> */}
    </div>
  );
};

export default ErrorPage;
