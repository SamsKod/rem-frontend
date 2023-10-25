import React from "react";
import { Spinner } from "react-bootstrap";


const Asset = ({ spinner, src, message }) => {
  return (
    <div>
      {spinner && <Spinner 
          as="span"
          animation="grow"
          size="lg"
          role="status"
          aria-hidden="true" />}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;