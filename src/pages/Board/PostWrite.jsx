import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import styles from "./Board.module.css";
import { Paper } from "@mui/material";
import { Form, Input, Row, Col, Button, Radio } from "antd";
import Nav from "../../components/Navbar/Nav";
import Foot from "../../components/Footer/Foot";
import { getCategories } from "../../components/Board/getCategories";
import EditorBox from "../../components/Board/EditorBox";
import { notify } from "../User/toast";



function PostWrite() {
    const navigate = useNavigate();
    const { category, id } = useParams();
    const subCategories = getCategories(category.toUpperCase());
    const categories_except_total = subCategories.slice(1);

    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');
    
    const [categorySelectedValue, setCategorySelectedValue] = useState();
    const [statusSelectedValue, setStatusSelectedValue] = useState();
    
    const onFormLayoutChange = ({ layout }) => {
        setFormLayout(layout);
    };

    const movePage = (url) => {
        navigate(url);
    };

    const onFinish = (value) => {
      if(id){
        axios
            .put(`https://localhost:8443/posts/edit/${id}`, value, {
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
            }})
            .then((data) => {
            if (data.status === 200) {
                alert("게시글 수정이 완료되었습니다.");
                movePage(`/board/${category.toLowerCase()}`);
            }})
            .catch(function (error) {
                console.log(error);
                notify("게시글 수정에 실패했습니다", "error");
            });
      }
      else{
        axios
            .post(`https://localhost:8443/posts/new/${category.toUpperCase()}`, value, {
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
            }})
            .then((data) => {
            if (data.status === 200) {
                alert("게시글 등록이 완료되었습니다.");
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
          axios.get(`https://localhost:8443/posts/${id}`)
              .then((response) => {
                  const data = response.data.data;
                  console.log("API Response Data:", data);
                  // 기존 데이터로 Form 초기화
                  form.setFieldsValue({
                      title: data.title,
                      subCategory: data.subCategory,
                      status: data.status,
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
        <Nav />
        <div className={styles.writeContainer}>
            <div className={styles.paper}>
                <h1>새 글 쓰기</h1>
            </div>
        <Paper elevation={0} square className={styles.paper}>
          <Form
            labelCol={{ span: 2 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
            style={{ paddingRight: "40px" }}>
            <table className={styles.table_}>
              <thead>
                <tr>
                    <th className={styles.table_th}>
                        {" "}
                        <Form.Item
                        label="제목"
                        name="title"
                        rules={[
                            {
                            required: true,
                            message: "필수 입력 항목입니다.",
                            },
                        ]}>
                            <div className={styles.formPadding}>
                                <Input />
                            </div>
                        </Form.Item>
                    </th>
                </tr>
                <tr>
                  <th className={styles.table_th_2}>
                    {" "}
                    <Form.Item 
                        label="서브 카테고리" 
                        name="subCategory" 
                        rules={[
                        {
                          required: true,
                          message: "필수 입력 항목입니다.",
                        },
                      ]}>
                        <div className={styles.formPadding}>

                        <Radio.Group
                            onChange={(e) => {
                                setCategorySelectedValue(e.target.value);
                              }}
                            value={categorySelectedValue}
                            >
                            {categories_except_total.map((subCategory, index) => (
                                <Radio.Button 
                                    key={index} 
                                    value={subCategory.value} 
                                    className={`${styles.radioButton} ${categorySelectedValue === subCategory.value ? styles.selected : ""}`}
                                >
                                {subCategory.label}
                                </Radio.Button>
                            ))}
                            </Radio.Group>
                        </div>
                    </Form.Item>
                  </th>
                </tr>
                <tr>
                  <th className={styles.table_th_2}>
                    {" "}
                    <Form.Item 
                        label="공개여부" 
                        name="status" 
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
                                공개
                            </Radio.Button>
                            <Radio.Button 
                                value="PRIVATE" 
                                className={`${styles.radioButton} ${statusSelectedValue === "PRIVATE" ? styles.selected : ""}`}
                            >
                                비공개
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
                        label="내용" 
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
      </div>
      <div style={{ paddingTop: "10%" }} />
      <Foot />
    </div >
  );
}

export default PostWrite;