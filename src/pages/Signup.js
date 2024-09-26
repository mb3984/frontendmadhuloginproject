import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./Spinner"; // Reuse Spinner component

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleError = (message) => {
    toast.error(message);
  };

  const handleSuccess = (message) => {
    toast.success(message);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("Name, email, and password are required");
    }

    setLoading(true); // Show loading spinner

    try {
      const response = await fetch(
        "https://backendcodeloginproject.onrender.com/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupInfo),
        }
      );

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login"); // Redirect after successful signup
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError("An unexpected error occurred");
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name..."
            value={signupInfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={signupInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={signupInfo.password}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? <Spinner /> : "Signup"}
        </button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import { handleError, handleSuccess } from "../utils";

// function Signup() {
//   const [signupInfo, setSignupInfo] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log(name, value);
//     const copySignupInfo = { ...signupInfo };
//     copySignupInfo[name] = value;
//     setSignupInfo(copySignupInfo);
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     const { name, email, password } = signupInfo;
//     if (!name || !email || !password) {
//       return handleError("name, email and password are required");
//     }
//     try {
//       const url = `https://backendcodeloginproject.onrender.com/auth/signup`;
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(signupInfo),
//       });
//       const result = await response.json();
//       console.log(result);
//       const { success, message, error } = result;
//       if (success) {
//         handleSuccess(message);
//         setTimeout(() => {
//           navigate("/login");
//         }, 1000);
//       } else if (error) {
//         const details = error?.details[0].message;
//         handleError(details);
//       } else if (!success) {
//         handleError(message);
//       }
//       console.log(result);
//     } catch (err) {
//       handleError(err);
//     }
//   };
//   return (
//     <div className="container">
//       <h1>Signup</h1>
//       <form onSubmit={handleSignup}>
//         <div>
//           <label htmlFor="name">Name</label>
//           <input
//             onChange={handleChange}
//             type="text"
//             name="name"
//             autoFocus
//             placeholder="Enter your name..."
//             value={signupInfo.name}
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             onChange={handleChange}
//             type="email"
//             name="email"
//             placeholder="Enter your email..."
//             value={signupInfo.email}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             onChange={handleChange}
//             type="password"
//             name="password"
//             placeholder="Enter your password..."
//             value={signupInfo.password}
//           />
//         </div>
//         <button type="submit">Signup</button>
//         <span>
//           Already have an account ?<Link to="/login">Login</Link>
//         </span>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// }

// export default Signup;
