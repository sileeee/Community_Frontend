import React, { useState } from "react";
import styles from "../Login.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../../../components/Navbar/Nav";
import Foot from "../../../components/Footer/Foot";

const Login = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({});

  const checkData = (obj) => {
    const urlApi = `https://localhost:8443/users/login`;
    console.log(obj);
    
    const api = axios
      .post(urlApi, obj, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }})
      .then((response) => response.data)
      .then((data) => (
        data.status==="OK" ? movePage("/home") : notify("비밀번호 또는 이메일이 틀렸습니다", "error")))
      .catch(function (error) {
        console.log(error);
        notify("비밀번호 또는 이메일이 틀렸습니다", "error");
      });
  };

  const changeHandler = (event) => {
    if (event.target.name === "IsAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    checkData(data);
  };

  const movePage = (url) => {
        navigate(url);
  };

  return (
    <div>
    <Nav />
    <div className={styles.container}>
      <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
        <h1>Login</h1>
        <div>
          <div>
            <input type="text" name="email" value={data.email} placeholder="E-mail" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
          </div>
        </div>
        <div>
          <div>
            <input type="password" name="password" value={data.password} placeholder="Password" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
          </div>
        </div>
        <div>
          <button type="submit">Login</button>
          <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
            계정이 없으신가요? <Link to="/sign-up">회원가입</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
    <Foot />
    </div>
  );
};

export default Login;