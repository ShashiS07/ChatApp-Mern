import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { registerRoute } from "../utils/api";
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
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

const Register = () => {
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
      navigate("/login");
    }
  }, []);
  const [userInputs, setUserInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleUserInputChange = (event) => {
    setUserInputs({
      ...userInputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleUserInputValidation = () => {
    const { username, email, password, confirmPassword } = userInputs;
    if (username == "" || username.length < 2) {
      toast.error("Username is not valid");
      return false;
    } else if (email == "" || !email.includes("@")) {
      toast.error("Email is not valid");
      return false;
    } else if (password.length <= 6) {
      toast.error(
        "Password is too Short. Password should be greater than six characters"
      );
      return false;
    } else if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password is not matched,",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleUserInputValidation()) {
      const { username, email, password } = userInputs;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.message, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("CURRENT_USER", JSON.stringify(data.user));
        toast.success("Successfully created!");
        setTimeout(() => {
          navigate("/login");
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
            placeholder="Enter Username"
            name="username"
            onChange={handleUserInputChange}
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleUserInputChange}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Register;
