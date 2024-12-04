import React, { useState } from "react";
import styles from "../Login.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../../../components/Navbar/Nav";
import Foot from "../../../components/Footer/Foot";
import { useAuth } from '../../../components/common/AuthContext';

const Login = () => {

  const navigate = useNavigate();
  const { checkSession } = useAuth();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({});
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const checkData = async(obj) => {
    const urlApi = `${API_BASE_URL}/users/login`;
    
    try {
      const response = await axios.post(urlApi, obj, {
          withCredentials: true,
          headers: {
              'Content-Type': 'application/json',
          },
      });

      const { status } = response.data;

      if (status === "OK") {
          checkSession(); // 세션 상태 업데이트
          movePage("/"); // 홈으로 이동
      } else {
          notify("비밀번호 또는 이메일이 틀렸습니다", "error");
      }
    } catch (error) {
        console.error("Login error:", error.message || error);
        notify("비밀번호 또는 이메일이 틀렸습니다", "error");
    }
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