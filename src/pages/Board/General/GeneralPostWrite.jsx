import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import styles from "../Board.module.css";
import { Paper } from "@mui/material";
import { Form, Input, Row, Col, Button, Radio } from "antd";
import { getCategories } from "../../../components/Board/getCategories";
import EditorBox from "../../../components/Board/EditorBox";
import { notify } from "../../User/toast";
import { useTranslation } from "react-i18next";



function GeneralPostWrite({category, id}) {
    
    const { t } = useTranslation();
    const navigate = useNavigate();
    const subCategories = getCategories(category.toUpperCase());
    const categories_except_total = subCategories.slice(1);

    const [form] = Form.useForm();
    const [categorySelectedValue, setCategorySelectedValue] = useState();
    const [statusSelectedValue, setStatusSelectedValue] = useState();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const movePage = (url) => {
        navigate(url);
    };

    const onFinish = (value) => {
      if(id){
        axios
            .put(`${API_BASE_URL}/posts/edit/${id}`, value, {
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
            }})
            .then((data) => {
            if (data.status === 200) {
                window.confirm("게시글 수정이 완료되었습니다.");
                movePage(`/board/${category.toLowerCase()}`);
            }})
            .catch(function (error) {
                console.log(error);
                notify("게시글 수정에 실패했습니다", "error");
            });
      }
      else{
        axios
            .post(`${API_BASE_URL}/posts/new/${category.toUpperCase()}`, value, {
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
            }})
            .then((data) => {
            if (data.status === 200) {
                window.confirm("게시글 등록이 완료되었습니다.");
                movePage(`/board/${category.toLowerCase()}`);
            }})
            .catch(function (error) {
                console.log(error);
                notify("게시글 등록에 실패했습니다", "error");
            });
      };
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const [editorContent, setEditorContent] = useState('');

    useEffect(() => {
      if (id) {
          // 기존 게시글 데이터 요청
          axios.get(`${API_BASE_URL}/posts/${id}`)
              .then((response) => {
                  const data = response.data.data;
                  console.log("API Response Data:", data);
                  // 기존 데이터로 Form 초기화
                  form.setFieldsValue({
                      title: data.title,
                      subCategory: data.subCategory,
                      postStatus: data.postStatus,
                      body: data.body
                  });
                  console.log("Form Fields After Set:", form.getFieldsValue());
                  setEditorContent(data.body);
              })
              .catch((error) => {
                  console.error("Error fetching post data:", error);
              });
      }
  }, [id, form]);

  return (
    <div>
        <Paper elevation={0} square className={styles.paper}>
          <Form
            labelCol={{ span: 2 }}
            onFinish={(values) => {
              if (values.title.length > 50) {
                const confirmResult = window.confirm(
                  "제목은 50자를 초과할 수 없습니다."
                );
                if (!confirmResult) return; // 제출 중단
              }
              onFinish(values); // 정상 제출
            }}
            onFinishFailed={onFinishFailed}
            form={form}
            className={styles.formPaddingRight}>
            <table className={styles.table_}>
              <thead>
                <tr>
                    <th className={styles.table_th}>
                        {" "}
                        <Form.Item
                        label={t('TOPIC')}
                        name="title"
                        placeholder="[광고] 혹은 [도시이름]을 제목 앞에 표기해주세요.(50자 이내로 제목 작성)"
                        rules={[
                            {
                            required: true,
                            message: "필수 입력 항목입니다.",
                            },
                            {
                              max: 50,
                              message: "제목은 50자를 초과할 수 없습니다.",
                            },
                        ]}>
                            <div className={styles.formPadding}>
                                <Input />
                            </div>
                        </Form.Item>
                    </th>
                </tr>
                <tr>
                {categories_except_total.length > 0 && (
                  <th className={styles.table_th_2}>
                    <Form.Item 
                      label={t('SUBCATEGORY')}
                      name="subCategory" 
                      rules={[
                        {
                          required: true,
                          message: "필수 입력 항목입니다.",
                        },
                      ]}>
                      <div className={styles.formPadding}>
                        <Radio.Group
                          onChange={(e) => setCategorySelectedValue(e.target.value)}
                          value={categorySelectedValue}
                        >
                          {categories_except_total.map((subCategory, index) => (
                            <Radio.Button 
                              key={index} 
                              value={subCategory.value} 
                              className={`${styles.radioButton} ${categorySelectedValue === subCategory.value ? styles.selected : ""}`}
                            >
                              {t(subCategory.value)}
                            </Radio.Button>
                          ))}
                        </Radio.Group>
                      </div>
                    </Form.Item>
                  </th>
                )}
                </tr>
                <tr>
                  <th className={styles.table_th_2}>
                    {" "}
                    <Form.Item 
                        label={t('STATUS')}
                        name="postStatus" 
                        rules={[
                        {
                          required: true,
                          message: "필수 입력 항목입니다.",
                        },
                      ]}>
                        <div className={styles.formPadding}>
                        <Radio.Group 
                            onChange={(e) => {
                                setStatusSelectedValue(e.target.value);
                            }} 
                            value={statusSelectedValue}
                            >
                            <Radio.Button 
                                value="PUBLIC" 
                                className={`${styles.radioButton} ${statusSelectedValue === "PUBLIC" ? styles.selected : ""}`}
                            >
                                {t('PUBLIC')}
                            </Radio.Button>
                            <Radio.Button 
                                value="PRIVATE" 
                                className={`${styles.radioButton} ${statusSelectedValue === "PRIVATE" ? styles.selected : ""}`}
                            >
                                {t('PRIVATE')}
                            </Radio.Button>
                        </Radio.Group>
                        </div>
                    </Form.Item>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.table_td_2}>
                    <Form.Item 
                        label={t('CONTENT')}
                        name="body"
                        valuePropName="value"
                        getValueFromEvent={(content) => content}
                        rules={[
                            {
                              required: true,
                              message: "필수 입력 항목입니다.",
                            }]}>
                            <div className={styles.formPadding}>
                            <EditorBox
                                value={form.getFieldValue("body")}
                                onChange={(value) => form.setFieldsValue({ body: value })}
                                initialValue={editorContent}
                            />
                            </div>
                    </Form.Item>
                  </td>
                </tr>
              </tbody>
            </table>
            <div style={{ width: "94.5%" }}>
              <Row>
                <Col span={12}>
                  {" "}
                  <div style={{ paddingLeft: "10%" }}>
                    <Button
                      type="text"
                      onClick={() => movePage(`/board/${category.toLowerCase()}`)}
                    >
                      ← Back
                    </Button>
                  </div>
                </Col>
                <Col span={12}>
                  {" "}
                  <div
                    style={{
                      textAlign: "right",
                      marginRight: "-10%",
                    }}
                  >
                    <Form.Item>
                      <Button type="primary" htmlType="submit" style={{backgroundColor: "green"}}>
                        Submit
                      </Button>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </div>
          </Form>
        </Paper>
    </div >
  );
}

export default GeneralPostWrite;