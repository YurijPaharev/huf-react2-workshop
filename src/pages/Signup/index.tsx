import React from 'react';
import { Link } from "react-router-dom";

function SignUpPage() {
  return (
    <div>
      This is a SignUp page
      <Link to={'/login'}> Navigate to Login </Link>
    </div>
  );
}

export default SignUpPage;
