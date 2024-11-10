import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import styles from "./NewsBoard.module.css";
import { Paper } from "@mui/material";
import { Table } from "antd";
import WriteButton from "../../components/common/WriteButton";
import SubCategoryButton from "../../components/common/SubCategoryButton";

function BoardList() {
  const history = useHistory();
  
  const [noticeList, setNoticeList] = useState();
  const [subCategory, setSubCategory] = useState("TOTAL");

  const getFilteredPosts = (selected) => {
    setSubCategory(selected);
    console.log(selected);
  };

  const movePage = (item) => {
    let id = item.id + "";
    history.push({
      pathname: `/posts/${id}`,
      state: { id: id, prev: item.prev, next: item.next },
    });
  };

  const convertToStringDate = (param) => {
    let result = param.substr(0,10);
    return result;
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "id",
      align: "center",
      width: "6%",
    },
    {
      title: "Title",
      dataIndex: "title",
      align: "center",
      width: "40%"
    },
    {
      title: "Author",
      dataIndex: "author",
      align: "center",
      width: "10%"
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      align: "center",
      width: "10%"
    },
  ];

  useEffect(() => {
    axios
      .get(`http://localhost:8080/posts?category=NEWS&subCategory=${subCategory}`)
      .then((res) => {
        if (res.status === 200) {
          let totalElements = res.data.data.length;
          let tmp = res.data.data;
          console.log(tmp);
          tmp.map((item, index) => {
            item.key = index;
            item.id = totalElements - index;
            item.createdAt = convertToStringDate(item.createdAt);
          });
          tmp && setNoticeList(tmp);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [subCategory]);

  return (
    <div className={styles.datagrid}>
      <Paper elevation={0} square className={styles.paper}>
        <div className={styles.buttonContainer}>
            <SubCategoryButton
                onSubCategoryChange={getFilteredPosts}
            />
            <WriteButton />
        </div>
        {noticeList && (
            <Table
                columns={columns}
                dataSource={noticeList}
                rowClassName={styles.tableRow}
                size="middle"
                pagination={{
                position: ["none", "bottomRight"],
                }}
                onRow={(record, rowIndex) => {
                return {
                    onClick: (event) => {
                    movePage(record);
                    },
                };
                }}
          />
        )}
      </Paper>
    </div>
  );
}

export default BoardList;