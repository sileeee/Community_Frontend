import React from "react";
import axios from "axios";
import { Button } from "antd";
import styles from "./ButtonSet.module.css";
import { useNavigate } from "react-router-dom";

function ButtonSet({ id, page, category}) {
    
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const moveToEditPage = () => {
        let currentId = id + "";
        navigate(`/board/edit/${category}/${currentId}`);
    };

    const deleteProcess = (id) => {
        if(page === "comments"){
            axios
                .delete(`${API_BASE_URL}/comments/${id}`, {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' }
                    })
                .then((res) => {
                    if (res.status === 200) {
                        window.confirm("해당 내용이 삭제되었습니다.")
                        window.location.reload();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        if(page === "posts"){
            axios
                .delete(`${API_BASE_URL}/posts/delete/${id}`, {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' }
                    })
                .then((res) => {
                    if (res.status === 200) {
                        window.confirm("해당 내용이 삭제되었습니다.")
                        navigate(`/board/${category}`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        if(page === "real_estate_posts"){
            axios
                .delete(`${API_BASE_URL}/real-estate/delete/${id}`, {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' }
                    })
                .then((res) => {
                    if (res.status === 200) {
                        window.confirm("해당 내용이 삭제되었습니다.")
                        navigate(`/board/${category}`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }   
    }

    return (
        <div className={styles.container}>
            {(page === "posts" || page === "real_estate_posts") && (
                <Button className={styles.edit_button} onClick={moveToEditPage}>
                    편집
                </Button>
            )}
            <Button
            className={styles.delete_button}
            onClick={() => deleteProcess(id)}
            >
            삭제
            </Button>
        </div>
    );
}

export default ButtonSet;