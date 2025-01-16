import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { notify } from "../toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { validate } from "../validate";
import styles from "../Login.module.css";
import "react-toastify/dist/ReactToastify.css";
import Foot from "../../../components/Footer/Foot";
import Nav from "../../../components/Navbar/Nav";

const SignUp = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    IsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [showPolicyPopup, setShowPolicyPopup] = useState(false);

  useEffect(() => {
    setErrors(validate(data, "signUp"));
  }, [data, touched]);

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

  const urlApi = `${API_BASE_URL}/users/sign-up`;
      const pushData = async () => {
        const response = await axios.post(urlApi, data, {
          headers: {
              'Content-Type': 'application/json',
          }
        });
        if (response.data.status === "CREATED") {
          window.confirm("가입이 완료되었습니다");
          movePage("/");
        } else if (response.data.errorMessage === "There is already a user with that email"){
          window.confirm("이미 계정이 존재합니다. 로그인을 시도해보세요.");
          movePage("/login");
        } else {
          window.confirm("회원가입에 실패하였습니다. 입력란을 확인해보세요.");
        }
      };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      pushData();
    } else {
      notify("입력란을 확인해주세요", "error");
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        phone: true,
        birthday: "",
        IsAccepted: false,
      });
    }
  };

  const movePage = (url) => {
    navigate(url);
  };  

  return (
    <div>
      <Nav />
    <div className={styles.container}>
      <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
        <h1> 회원가입 </h1>
        <div>
          <div className={errors.name && touched.name ? styles.unCompleted : !errors.name && touched.name ? styles.completed : undefined}>
            <input 
            type="text" 
            name="name" 
            value={data.name} 
            placeholder="Name" 
            onChange={changeHandler} 
            onFocus={focusHandler} 
            autoComplete="off" />
            
          </div>
          {errors.name && touched.name && <span className={styles.error}>{errors.name}</span>}
        </div>
        <div>
          <div className={errors.email && touched.email ? styles.unCompleted : !errors.email && touched.email ? styles.completed : undefined}>
            <input 
            type="text" 
            name="email" 
            value={data.email} 
            placeholder="E-mail" 
            onChange={changeHandler} 
            onFocus={focusHandler} 
            autoComplete="off" />
            
          </div>
          {errors.email && touched.email && <span className={styles.error}>{errors.email}</span>}
        </div>
        <div>
          <div className={errors.password && touched.password ? styles.unCompleted : !errors.password && touched.password ? styles.completed : undefined}>
            <input 
            type="password" 
            name="password" 
            value={data.password} 
            placeholder="Password" 
            onChange={changeHandler} 
            onFocus={focusHandler} 
            autoComplete="off" />
            
          </div>
          {errors.password && touched.password && <span className={styles.error}>{errors.password}</span>}
        </div>
        <div>
          <div className={errors.confirmPassword && touched.confirmPassword ? styles.unCompleted : !errors.confirmPassword && touched.confirmPassword ? styles.completed : !errors.confirmPassword && touched.confirmPassword ? styles.completed : undefined}>
            <input 
            type="password" 
            name="confirmPassword" 
            placeholder="Confirm Password" 
            onChange={changeHandler} 
            onFocus={focusHandler} 
            autoComplete="off" />
            
          </div>
          {errors.confirmPassword && touched.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
        </div>

        <div>
          <div className={errors.phone && touched.phone ? styles.unCompleted : !errors.phone && touched.phone ? styles.completed : !errors.phone && touched.phone ? styles.completed : undefined}>
            <input 
            type="text" 
            name="phone" 
            value={data.phone} 
            placeholder="Phone" 
            onChange={changeHandler} 
            onFocus={focusHandler} 
            autoComplete="off" />
          </div>
          {errors.phone && touched.phone && <span className={styles.error}>{errors.phone}</span>}
        </div>

        <div>
      <div className={errors.birthday && touched.birthday ? styles.unCompleted : !errors.birthday && touched.birthday ? styles.completed : undefined}>
        <input
          type="date"
          name="birthday"
          value={data.birthday}
          onChange={changeHandler}
          onFocus={focusHandler}
          autoComplete="off"
        />
      </div>
        {errors.birthday && touched.birthday && <span className={styles.error}>{errors.birthday}</span>}
      </div>

        <div>
          <div className={styles.terms}
          onMouseEnter={() => setShowPolicyPopup(true)}
          onMouseLeave={() => setShowPolicyPopup(false)}>
            <input 
            type="checkbox" 
            name="IsAccepted" 
            value={data.IsAccepted} 
            id="accept" 
            onChange={changeHandler} 
            onFocus={focusHandler} />
            <label
                htmlFor="accept"
              >
                개인정보 보호정책 약관에 동의합니다.
              </label>
              {showPolicyPopup && (
                <div className={styles.policyPopup}>
                  <h3>개인정보 보호정책</h3>
                  <p>
                    한두비(이하 "Handubi")는 회원님의 개인정보를 소중히 보호하며, 
                    이를 안전하게 관리하기 위해 노력합니다. 
                  </p>
                  <p>
                    <b>- 수집 항목:</b> 이름, 이메일, 전화번호, 생년월일 등
                  </p>
                    <p><b>- 수집 목적: </b>회원 가입 및 관리, 서비스 제공 및 개선, 사이트 사용 분석 </p>
                    <p><b>- 보유 기간: </b>회원 탈퇴 후 6개월 또는 관련 법령에 따른 기간</p>
                    <p><b>- 이용자의 권리: </b>개인정보 조회, 수정 및 삭제 요청, 동의 철회 요청</p>
                  <p>
                    자세한 내용은 사이트의 
                    <Link to="/privacy-policy"> 개인정보 보호정책 전문</Link>을 확인하세요.
                  </p>
                </div>
              )}
          </div>
          {errors.IsAccepted && touched.IsAccepted && <span className={styles.error}>{errors.IsAccepted}</span>}
        </div>
        <div>
          <button type="submit">Create Account</button>
          <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%", fontFamily: "Manrope" }}>
            이미 계정이 있으신가요? <Link to="/login" style={{fontFamily: "Manrope"}}> Login</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
      </div>
      <Foot />
    </div>
  );
};

export default SignUp;