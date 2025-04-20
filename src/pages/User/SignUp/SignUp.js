import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { notify } from "../toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { validate } from "../validate";
import styles from "../Login.module.css";
import "react-toastify/dist/ReactToastify.css";
import Foot from "../../../components/Footer/Foot";
import Nav from "../../../components/Navbar/Nav";
import TopBar from "../../../components/TopBar/TopBar";

const SignUp = () => {

  const navigate = useNavigate();
  const { t } = useTranslation();

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
      <TopBar />
      <Nav />
    <div className={styles.container}>
      <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
        <h1> {t('SIGN-UP')} </h1>
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
                style={{ fontSize: "0.8rem", fontFamily: "Manrope" , lineHeight: "1rem", marginLeft: "0.5rem" }}
              >
                {t('POLICY_CONSENT')}
              </label>
              {showPolicyPopup && (
                <div className={styles.policyPopup}>
                  <h3>{t("PRIVACY_POLICY_TITLE")}</h3>
                  <p>{t("PRIVACY_POLICY_DESCRIPTION")}</p>
                  <p><b>{t("PRIVACY_POLICY_COLLECTED_ITEMS")}</b></p>
                  <p><b>{t("PRIVACY_POLICY_PURPOSE")}</b></p>
                  <p><b>{t("PRIVACY_POLICY_DURATION")}</b></p>
                  <p><b>{t("PRIVACY_POLICY_RIGHTS")}</b></p>
                  <p>
                    {t("PRIVACY_POLICY_LINK_TEXT")}
                    <Link to="/privacy-policy"> {t("PRIVACY_POLICY_TITLE")} </Link>
                  </p>
                </div>
              )}
          </div>
          {errors.IsAccepted && touched.IsAccepted && <span className={styles.error}>{errors.IsAccepted}</span>}
        </div>
        <div>
          <button type="submit">Create Account</button>
          <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%", fontFamily: "Manrope" }}>
          Have an account? <Link to="/login" style={{fontFamily: "Manrope"}}> Login</Link>
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