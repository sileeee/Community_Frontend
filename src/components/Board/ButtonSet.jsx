import React from "react";
import axios from "axios";
import { Button } from "antd";
import styles from "./ButtonSet.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ButtonSet({ id, page, category}) {

    const { t } = useTranslation();
    
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
                        window.alert("해당 내용이 삭제되었습니다.")
                        window.location.reload();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        if(page === "posts" || page === "real-estate"){
            axios
                .delete(`${API_BASE_URL}/${page}/delete/${id}`, {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' }
                    })
                .then((res) => {
                    if (res.status === 200) {
                        window.alert("해당 내용이 삭제되었습니다.")
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
                    {t('EDIT')}
                </Button>
            )}
            <Button
            className={styles.delete_button}
            onClick={() => deleteProcess(id)}
            >
            {t('DELETE')}
            </Button>
        </div>
    );
}

export default ButtonSet;