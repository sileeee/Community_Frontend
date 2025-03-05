import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import styles from "../Board.module.css";
import { Paper } from "@mui/material";
import { Form, Input, Row, Col, Button, Radio } from "antd";
import { getCategories } from "../../../components/Board/getCategories";
import EditorBox from "../../../components/Board/EditorBox";
import { notify } from "../../User/toast";
import { getProductStatus } from "../../../components/Board/getProductStatus";
import { getProductType } from "../../../components/Board/getProductType";
import { getLocation } from "../../../components/Board/getLocation";



function RealEstatePostWrite({category, id}) {

    const navigate = useNavigate();
    const subCategories = getCategories(category.toUpperCase());
    const categories_except_total = subCategories.slice(1);
    const productType = getProductType(category.toUpperCase());
    const productStatus = getProductStatus(category.toUpperCase());
    const productLocation = getLocation(category.toUpperCase());

    const [form] = Form.useForm();
    const [categorySelectedValue, setCategorySelectedValue] = useState();
    const [statusSelectedValue, setStatusSelectedValue] = useState();
    const [productTypeSelectedValue, setproductTypeSelectedValue] = useState();
    const [productStatusSelectedValue, setproductStatusSelectedValue] = useState();
    const [productLocationSelectedValue, setproductLocationSelectedValue] = useState();
    

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const movePage = (url) => {
        navigate(url);
    };

    const onFinish = (value) => {

        const thumbnailUrl = form.getFieldValue("thumbnailUrl");
        const payload = { ...value, thumbnailUrl };
      if(id){
        axios
            .put(`${API_BASE_URL}/real-estate/edit/${id}`, payload, {
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
            .post(`${API_BASE_URL}/real-estate/new/${category.toUpperCase()}`, payload, {
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

    const extractFirstImageUrl = (htmlString) => {
        const srcRegex = /<img[^>]*src=['"]?([^'">]+)['"]?/;
        const match = htmlString.match(srcRegex);
        return match ? match[1] : null;
      };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const [editorContent, setEditorContent] = useState('');

    useEffect(() => {
      if (id) {
          // 기존 게시글 데이터 요청
          axios.get(`${API_BASE_URL}/real-estate/${id}`)
              .then((response) => {
                  const data = response.data.data;
                  
                  // 기존 데이터로 Form 초기화
                  form.setFieldsValue({
                      title: data.title,
                      subCategory: data.subCategory,
                      postStatus: data.postStatus,
                      body: data.body,
                      innerArea: data.innerArea,
                      totalArea: data.totalArea,
                      state: data.state,
                      price: data.price,
                      productStatus: data.productStatus,
                      thumbnailUrl: data.thumbnailUrl
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
                        label="제목"
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
                          onChange={(e) => setCategorySelectedValue(e.target.value)}
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
                )}
                </tr>
                <tr>
                  <th className={styles.table_th_2}>
                    {" "}
                    <Form.Item 
                        label="공개여부" 
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
                {/* product type */}
                <tr>
                {productType.length > 0 && (
                  <th className={styles.table_th_2}>
                    <Form.Item 
                      label="건물 종류" 
                      name="productType" 
                      rules={[
                        {
                          required: true,
                          message: "필수 입력 항목입니다.",
                        },
                      ]}>
                      <div className={styles.formPadding}>
                        <Radio.Group
                          onChange={(e) => setproductTypeSelectedValue(e.target.value)}
                          value={productTypeSelectedValue}
                        >
                          {productType.map((type, index) => (
                            <Radio.Button 
                              key={index} 
                              value={type.value} 
                              className={`${styles.radioButton} ${productTypeSelectedValue === type.value ? styles.selected : ""}`}
                            >
                              {type.label}
                            </Radio.Button>
                          ))}
                        </Radio.Group>
                      </div>
                    </Form.Item>
                  </th>
                )}
                </tr>
                <tr>
                {productStatus.length > 0 && (
                  <th className={styles.table_th_2}>
                    <Form.Item 
                      label="매물 상태" 
                      name="productStatus">
                      <div className={styles.formPadding}>
                        <Radio.Group
                          onChange={(e) => setproductStatusSelectedValue(e.target.value)}
                          value={productStatusSelectedValue}
                        >
                          {productStatus.map((status, index) => (
                            <Radio.Button 
                              key={index} 
                              value={status.value} 
                              className={`${styles.radioButton} ${productStatusSelectedValue === status.value ? styles.selected : ""}`}
                            >
                              {status.label}
                            </Radio.Button>
                          ))}
                        </Radio.Group>
                      </div>
                    </Form.Item>
                  </th>
                )}
                </tr>

                <tr>
                    <th className={styles.table_th}>
                        {" "}
                        <Form.Item
                        label="실내면적(sqf)"
                        name="innerArea"
                        placeholder="실내면적을 입력해주세요."
                        rules={[
                            {
                                pattern: /^\d+$/,
                                message: "숫자만 입력 가능합니다.",
                            }
                          ]}>
                            <div className={styles.formPadding}>
                                <Input className={styles.inputSmall} />
                            </div>
                        </Form.Item>
                    </th>
                </tr>
                <tr>
                    <th className={styles.table_th}>
                        {" "}
                        <Form.Item
                        label="전체면적(sqf)"
                        name="totalArea"
                        placeholder="전체면적을 입력해주세요."
                        rules={[
                            {
                                pattern: /^\d+$/,
                                message: "숫자만 입력 가능합니다.",
                            }
                          ]}>
                            <div className={styles.formPadding}>
                                <Input className={styles.inputSmall} />
                            </div>
                        </Form.Item>
                    </th>
                </tr>
                <tr>
                {productLocation.length > 0 && (
                  <th className={styles.table_th_2}>
                    <Form.Item 
                      label="위치(지역)" 
                      name="state">
                      <div className={styles.formPadding}>
                        <Radio.Group
                          onChange={(e) => setproductLocationSelectedValue(e.target.value)}
                          value={productLocationSelectedValue}
                        >
                          {productLocation.map((location, index) => (
                            <Radio.Button 
                              key={index} 
                              value={location.value} 
                              className={`${styles.radioButton} ${productLocationSelectedValue === location.value ? styles.selected : ""}`}
                            >
                              {location.label}
                            </Radio.Button>
                          ))}
                        </Radio.Group>
                      </div>
                    </Form.Item>
                  </th>
                )}
                </tr> 
                <tr>
                    <th className={styles.table_th}>
                        {" "}
                        <Form.Item
                        label="가격(AED)"
                        name="price"
                        placeholder="가격을 입력해주세요."
                        rules={[
                            {
                                pattern: /^\d+$/,
                                message: "숫자만 입력 가능합니다.",
                            }
                          ]}
                          >
                            <div className={styles.formPadding}>
                                <Input className={styles.inputSmall} />
                            </div>
                        </Form.Item>
                    </th>
                </tr> 
              </thead>
              <tbody>
                <tr>
                  <td className={styles.table_td_2}>
                    <Form.Item name="thumbnailUrl" style={{ display: "none" }}>
                        <Input />
                    </Form.Item>
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
                                onChange={(value) => {
                                    const thumbnailUrl = extractFirstImageUrl(value); 
                                    form.setFieldsValue({ 
                                        body: value, 
                                        thumbnailUrl: thumbnailUrl
                                    });
                                }}
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

export default RealEstatePostWrite;