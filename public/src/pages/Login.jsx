import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
      <div className="brand">
            <img src={Logo} alt="logo" />
            <h1> Welcome to <br/> Goodspace Communications</h1>
          </div>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
        <h1> Log In</h1>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;

justify-content: center;
gap: 5rem;
align-items: center;
padding-bottom:50px;

.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  
  justify-content: center;
  flex-direction:column;
  img {
    height: 8rem;
    padding-right:25rem
  }
  h1 {
    color: white;
    font-size:1.6rem;
    padding-right:5rem;
  }
}

form {
  display: flex;
  flex-direction: column;
 
  gap:1rem;
  backdrop-filter: blur(50px);
  border-radius: 2rem;
  padding: 5rem 5rem;
  width:40%;
  height:80%;
  h1{
  color:white;
  font-size:1.5rem;
  padding-bottom:1rem
  }
}
input {
  background-color: white;
  padding: 0.5rem;
  
  border-radius: 0.4rem;
  font-weight: 400;
  width: 100%;
  font-size: 0.8rem;
  &:focus {
    border: 0.1rem solid #297BCA;
    outline: none;
  }
}
button {
  background-color: #297BCA;
  color: white;
  padding: 1rem 2rem;
  border: none;
 
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  
  
}
span {
  color: white;

  a {
    color: #297BCA;
    text-decoration: none;
    font-weight: bold;
  }
}
`;
