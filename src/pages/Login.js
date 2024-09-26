import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevInfo) => ({
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

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Email and password are required");
    }

    try {
      const response = await fetch(
        "https://backendcodeloginproject.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      const { success, message, jwtToken, error } = result;

      if (success) {
        handleSuccess(message);

        // Store the JWT token in localStorage
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", result.email);
        console.log("Token stored:", jwtToken);
        console.log("User info:", result);

        setTimeout(() => {
          navigate("/home"); // Redirect after successful login
        }, 1000);
      } else {
        handleError(error?.details[0]?.message || message);
      }
    } catch (err) {
      handleError(err.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={loginInfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Don't have an account? <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Login() {
//   const [loginInfo, setLoginInfo] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginInfo((prevInfo) => ({
//       ...prevInfo,
//       [name]: value,
//     }));
//   };

//   const handleError = (message) => {
//     toast.error(message);
//   };

//   const handleSuccess = (message) => {
//     toast.success(message);
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const { email, password } = loginInfo;
//     if (!email || !password) {
//       return handleError("Email and password are required");
//     }

//     try {
//       const response = await fetch(
//         "https://backendcodeloginproject.onrender.com/auth/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(loginInfo),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const result = await response.json();
//       const { success, message, token, error } = result; // Assuming the backend sends the token

//       if (success) {
//         handleSuccess(message);

//         // Store the JWT token in localStorage
//         localStorage.setItem("token", token);
//         console.log(token);
//         console.log(result);

//         setTimeout(() => {
//           navigate("/home"); // Redirect after successful login
//         }, 1000);
//       } else {
//         handleError(error?.details[0]?.message || message);
//       }
//     } catch (err) {
//       handleError(err.message || "An unexpected error occurred");
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Login</h1>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             onChange={handleChange}
//             type="email"
//             name="email"
//             placeholder="Enter your email..."
//             value={loginInfo.email}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             onChange={handleChange}
//             type="password"
//             name="password"
//             placeholder="Enter your password..."
//             value={loginInfo.password}
//           />
//         </div>
//         <button type="submit">Login</button>
//         <span>
//           Don't have an account? <Link to="/signup">Signup</Link>
//         </span>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// }

// export default Login;
