import "../../App.css";
import BigBanner from "../../components/Home/BigBanner";
import Shortcut from "../../components/Home/Shortcut";
import Nav from "../../components/Navbar/Nav"
import Foot from "../../components/Footer/Foot"
import CategoryList from "./CategoryList";
import SearchPost from "../../components/Home/SearchPost";
import { useEffect } from "react";
import GlobalControls from "../../components/GlobalControls/GlobalControls";



function Home(){

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return(
    <div className="handubi">
      <div className="div">
        <div className="parent-group">
          <GlobalControls />
          <Nav />
          <BigBanner/>
          <div className="space"/>
          <SearchPost />
          <Shortcut/>
          <CategoryList />
          <Foot />
        </div>
      </div>
    </div>
  );
}
export default Home;