import "../../App.css";
import '../../styleguide.css';
import CategorySection from "./CategoryList/CategorySection";
import React, { useEffect, useState } from "react";
import axios from "axios";


function CategoryList(){

    const [mainPosts, setMainPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const res = await axios.get(`https://localhost:8443/home/posts`);
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
                <CategorySection category={"asian_market"} postList={getCategoryPosts("ASIAN_MARKET")} layout={1} />
                <div className="space" />
                <CategorySection category={"life"} postList={getCategoryPosts("LIFE")} layout={2} />
                <div className="space" />
                <CategorySection category={"second_hand"} postList={getCategoryPosts("SECOND_HAND")} layout={1} />
                <div className="space" />
                <CategorySection category={"real_estate"} postList={getCategoryPosts("REAL_ESTATE")} layout={1} />
                <div className="space" />
                <CategorySection category={"job_search"} postList={getCategoryPosts("JOB_SEARCH")} layout={2} />
                <div className="space" />
                <CategorySection category={"child_care"} postList={getCategoryPosts("CHILD_CARE")} layout={2} />
                <div className="space" />
                <CategorySection category={"travel"} postList={getCategoryPosts("TRAVEL")} layout={1} />
                <div className="space" />
                <CategorySection category={"club"} postList={getCategoryPosts("CLUB")} layout={2} />
                <div className="space" />
                <CategorySection category={"free_board"} postList={getCategoryPosts("FREE_BOARD")} layout={2} />
                <div className="space" />
              </>
            )}
        </div>
    );
}
export default CategoryList;
