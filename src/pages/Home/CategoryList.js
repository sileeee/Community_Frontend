import "../../App.css";
import CategorySection from "./CategoryList/CategorySection";
import TwoByTwoGrid from "./CategoryList/TwoByTwoGrid";
import React, { useEffect, useState } from "react";
import axios from "axios";


function CategoryList(){

    const [mainPosts, setMainPosts] = useState([]);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const res = await axios.get(`${API_BASE_URL}/home/posts`);
            if (res.status === 200) {
                setMainPosts(res.data.data);
            }
          } catch (error) {
            console.error("Error fetching posts:", error);
          }
        };
    
        fetchPosts();
    }, []);

    const getCategoryPosts = (category) => {
        return mainPosts.filter((post) => post.categoryType === category);
    };

    return (
        <div>
            <div className="space" />
            {mainPosts.length > 0 && (
              <>
                <CategorySection category={"news"} postList={getCategoryPosts("NEWS")} layout={1} />
                <div className="space" />
                <TwoByTwoGrid category={["free_board", "life", "child_care", "club"]} postList={[]} layout={2} />
                <div className="space" />
                <CategorySection category={"second_hand"} postList={getCategoryPosts("SECOND_HAND")} layout={1} />
                <div className="space" />
                <CategorySection category={"job_search"} postList={[]} layout={2} />
                <div className="space" />
                <CategorySection category={"asian_market"} postList={getCategoryPosts("ASIAN_MARKET")} layout={1} />
                <div className="space" />
                <CategorySection category={"travel"} postList={getCategoryPosts("TRAVEL")} layout={1} />
                <div className="space" />
                <CategorySection category={"real_estate"} postList={getCategoryPosts("REAL_ESTATE")} layout={1} />
                <div className="space" />
                <CategorySection category={"korean_company"} postList={[]} layout={2} />
                <div className="space" />
              </>
            )}
        </div>
    );
}
export default CategoryList;
