import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { loginRoute } from "../utils/api";
import axios from "axios";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: black;
  h1 {
    color: white;
    text-transform: uppercase;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #002400;
    border-radius: 1rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #8fff0e;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #200f50;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    margin: auto;
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("CURRENT_USER")) {
      navigate("/");
    }
  }, []);
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
  });

  const handleUserInputChange = (event) => {
    setUserInputs({
      ...userInputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleUserInputValidation = () => {
    const { email, password } = userInputs;
    if (email === "") {
      toast.error("Email is required");
      return false;
    } else if (password === "") {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleUserInputValidation()) {
      const { email, password } = userInputs;
      const { data } = await axios.post(loginRoute, {
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.message, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("CURRENT_USER", JSON.stringify(data.user));
        localStorage.setItem("TOKEN", JSON.stringify(data.token));
        toast.success("LoggedIn Successfully!");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    }
  };

  return (
    <>
      <Container>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <h1>Chat-Application</h1>
          </div>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            onChange={handleUserInputChange}
          />
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={handleUserInputChange}
          />
          <button type="submit">Login</button>
          <span>
            New User ? <Link to="/Register">Register</Link>
          </span>
        </form>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Login;
