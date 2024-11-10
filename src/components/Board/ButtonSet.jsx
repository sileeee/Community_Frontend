import React from "react";
import axios from "axios";
import { Button } from "antd";
import styles from "./ButtonSet.module.css";
import { useNavigate } from "react-router-dom";

function ButtonSet({ id }) {
    
    const navigate = useNavigate();

    const moveToEditPage = () => {
        let currentId = id + "";
        navigate("/posts/edit/" + currentId, { state: { id: id} });
    };

    const deleteProcess = (id) => {
        
        axios
            .delete(`http://localhost:8080/posts/delete/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    alert("해당 내용이 삭제되었습니다.");
                    window.location.reload();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className={styles.container}>
            <Button className={styles.edit_button} onClick={moveToEditPage}>
            편집
            </Button>
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