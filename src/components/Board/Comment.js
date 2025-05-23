import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Comment.module.css";
import { CommentOutlined } from '@ant-design/icons';
import ButtonSet from "./ButtonSet";
import { useAuth } from '../common/AuthContext';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Comment({ postId, onCommentsCountChange }) {

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [replyInputVisible, setReplyInputVisible] = useState(null);
    const [replyText, setReplyText] = useState("");
    const { isLoggedIn, name, userRole } = useAuth();
    const { t } = useTranslation();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const navigate = useNavigate();
    
    useEffect(() => {
        axios
        .get(`${API_BASE_URL}/comments?post_id=${postId}`)
        .then((response) => {
            if (response.status === 200) {
            setComments(response.data.data);
            onCommentsCountChange && onCommentsCountChange(response.data.data.length);
            }
        })
        .catch((error) => console.error("Failed to fetch comments:", error));
    }, [postId, onCommentsCountChange]);

    
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return; // 빈 입력 방지

        if (!isLoggedIn && window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
            navigate(`/login`);
            return;
        }

        axios
        .post(`${API_BASE_URL}/comments`, {postId, content:newComment, preCommentId: null}, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }})
        .then((response) => {
            if (response.status === 200) {
                axios
                    .get(`${API_BASE_URL}/comments?post_id=${postId}`)
                    .then((response) => {
                        if (response.status === 200) {
                            setComments(response.data.data);
                            onCommentsCountChange && onCommentsCountChange(response.data.data.length);
                        }
                    }).catch((error) => console.error("Failed to fetch comments:", error));
                setNewComment("");
            }
        })
        .catch((error) => console.error("Failed to post comment:", error));
    };

    const handleReply = (commentId) => {
        setReplyInputVisible((prev) => (prev === commentId ? null : commentId)); // 클릭된 댓글 ID로 토글
        setReplyText(""); // 대댓글 입력창 초기화
    };

    const handleReplySubmit = (e, parentId) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        if(!isLoggedIn && window.confirm("로그인 후 댓글작성이 가능합니다.")){
            navigate(`/login`);
            return;
        }

        axios
            .post(`${API_BASE_URL}/comments`, {postId, content:replyText, preCommentId:parentId}, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }})
            .then((response) => {
                if (response.status === 200) {
                    axios
                        .get(`${API_BASE_URL}/comments?post_id=${postId}`)
                        .then((response) => {
                            if (response.status === 200) {
                                setComments(response.data.data);
                            }
                        }).catch((error) => console.error("Failed to fetch comments:", error));
                    setReplyText("");
                    setReplyInputVisible(null);
                }
            })
            .catch((error) => console.error("Failed to post reply:", error));
    };

    function formatDate(dateString) {
        const date = new Date(dateString); // Date 객체로 변환
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0"); // 월(0-11)이므로 +1 필요
        const dd = String(date.getDate()).padStart(2, "0");
        const hh = String(date.getHours()).padStart(2, "0");
        const min = String(date.getMinutes()).padStart(2, "0");
    
        return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
    }

    function checkUser(comment, name){
        if(userRole=='ADMIN'){
            return <ButtonSet id={comment.id} page={"comments"} />
        }
        if(!comment.deleted && comment.author===name){
            return <ButtonSet id={comment.id} page={"comments"} />
        }
    }


    return (
        <div className={styles.commentSection}>
        <div className={styles.title}>
            <CommentOutlined/>&nbsp;&nbsp;Comment ({comments.length})
        </div>

        <div className={styles.commentContainer}>
        {comments
            .filter((comment) => comment.preCommentId === 0) // 최상위 댓글만 필터링
            .map((comment) => (
                <div key={`comment-${comment.id}`} className={styles.commentBoxwithReply}>
                <div className={styles.commentBox}>
                    <div className={styles.comment}>
                        <div className={styles.author}>{comment.author}</div>
                        {comment.deleted ? (
                            <div className={styles.deletedComment}>{t('DELETED_REPLY')}</div>):(<div className={styles.content}>{comment.content}</div>)}
                        <div className={styles.createdAt}>{formatDate(comment.createdAt)}</div>
                        <button
                            className={styles.replyButton}
                            onClick={() => handleReply(comment.id)}
                        >
                            {t('REPLY')}
                        </button>
                    </div>
                    {checkUser(comment, name)}
                </div>
                {comments
                    .filter((reply) => reply.preCommentId === comment.id) // 현재 댓글의 대댓글만 필터링
                    .map((reply) => (
                    <div key={`reply-${reply.id}`} className={styles.replyBox}>
                        <div className={styles.comment}>
                            <div className={styles.author}>{reply.author}</div>
                            {reply.deleted ? (
                            <div className={styles.deletedComment}>{t('DELETED_REPLY')}</div>):(<div className={styles.content}>{reply.content}</div>)}
                            <div className={styles.createdAt}>{formatDate(reply.createdAt)}</div>
                        </div>
                        {checkUser(reply, name)}
                    </div>
                ))}

                {replyInputVisible === comment.id && (
                    <div className={styles.replyTextBox}>
                        <textarea
                            className={styles.replyInput}
                            placeholder={t('RE_REPLY')}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                        />
                        <button
                            className={styles.replySubmitButton}
                            onClick={(e) => handleReplySubmit(e, comment.id)}>
                            {t('REPLY_SUBMIT')}
                        </button>
                    </div>
                )}
            
            </div>
            ))}
        </div>
        
        <form className={styles.commentForm}onSubmit={(e) => {
            if (newComment.length > 200) {
            const confirmResult = window.confirm(
                "댓글은 200자 이내로 작성해 주세요."
            );
            if (!confirmResult) {
                e.preventDefault(); // 폼 제출 방지
                return;
            }}
            handleCommentSubmit(e);
            }}>
            <textarea
            className={styles.input}
            placeholder={t('REPLY_DESCRIPTION')}
            maxLength={200}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            />
            <div className={styles.footer}>
            <button type="submit" className={styles.submitButton}>
                {t('REPLY_SUBMIT')}
            </button>
            </div>
        </form>
        </div>
    );
}

export default Comment;