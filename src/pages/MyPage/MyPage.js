import React, { useEffect, useState } from "react";
import styles from "./MyPage.module.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Nav from "../../components/Navbar/Nav";
import Foot from "../../components/Footer/Foot";
import { useAuth } from '../../components/common/AuthContext';
import { validate } from "../User/validate";
import { notify } from "../User/toast";



const MyPage = () => {

    const [data, setData] = useState({
        name: "",
        password: "",
        phone: ""
    });
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const { userId } = useAuth();

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
        if (!Object.keys(errors).length) {
            pushData();
        } else {
            notify("입력란을 확인해주세요", "error");
            setTouched({
              name: true,
              password: true,
              confirmPassword: true,
              phone: true,
            });
          }
        };
    
        const pushData = async () => {

            try {
                const response = await axios.put(`https://localhost:8443/users/update/${userId}`, data, {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' }
                })
                .then((response) => {
                    if (response.data.status === "OK") {
                        alert("회원 정보가 수정되었습니다", "success");
                        window.location.reload();
                    } else {
                        throw new Error("Update failed");
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        // 서버에서 반환한 에러 응답
                        const errorMessage = error.response.data.errorMessage || "An error occurred";
                        if (errorMessage === "There is already a user with that name") {
                            alert("해당 닉네임은 이미 사용중입니다.");
                        }
                    }
                });
            } catch (error) {
                notify("회원 정보 수정에 실패했습니다. 다시 시도해주세요.", "error");
            }
        };
    
    useEffect(() => {
        setErrors(validate(data, "update"));
      }, [data, touched]);

    useEffect(() => {
        axios
        .get(`https://localhost:8443/users/${userId}`, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
            })
        .then((response) => {
            if (response.status === 200) {
            setUserInfo(response.data.data);
            }
        })
        .catch((error) => 
            console.error("Failed to fetch comments:", error));
    }, [userId]);

    useEffect(() => {
        if (userInfo.name || userInfo.phone) {
            setData({
                name: userInfo.name || "",
                password: "",
                phone: userInfo.phone || "",
            });
        }
    }, [userInfo]);
    
    return (
        <div>
        <Nav />
        <div className={styles.container}>
        <form className={styles.formMyPage} onSubmit={submitHandler} autoComplete="off">
            <h1>회원 정보 수정</h1>
            <div>
                <div>
                    <input 
                        type="text" 
                        name="name" 
                        value={data.name} 
                        placeholder={data.name} 
                        onChange={changeHandler} 
                        onFocus={focusHandler} 
                        autoComplete="off" />
                </div>
                {errors.name && touched.name && <span className={styles.error}>{errors.name}</span>}
            </div>
            <div>
                <div>
                    <input 
                    type="password" 
                    name="password" 
                    value={data.password} 
                    placeholder="새 비밀번호" 
                    onChange={changeHandler} 
                    onFocus={focusHandler} 
                    autoComplete="off" />
                    
                </div>
                {errors.password && touched.password && <span className={styles.error}>{errors.password}</span>}
            </div>
            <div>
            <div>
                <input 
                type="password" 
                name="confirmPassword" 
                placeholder="새 비밀번호 확인" 
                onChange={changeHandler} 
                onFocus={focusHandler} 
                autoComplete="off" />
            </div>
            {errors.confirmPassword && touched.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
            </div>
                <div>
                    <div>
                        <input 
                            type="phone" 
                            name="phone" 
                            value={data.phone} 
                            placeholder={data.phone} 
                            onChange={changeHandler} 
                            onFocus={focusHandler} 
                            autoComplete="off" />
                    </div>
                    {errors.phone && touched.phone && <span className={styles.error}>{errors.phone}</span>}
                </div>
                <div>
                    <button type="submit">변경하기</button>
                </div>
            </form>
            </div>
        <Foot />
        </div>
    );
};

export default MyPage;