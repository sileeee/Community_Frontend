import "../../App.css";
import BigBanner from "../../components/Home/BigBanner";
import Shortcut from "../../components/Home/Shortcut";
import Nav from "../../components/Navbar/Nav"
import Foot from "../../components/Footer/Foot"
import '../../styleguide.css';
import CategoryList from "./CategoryList";
import SearchPost from "../../components/Home/SearchPost";
import { useEffect } from "react";



function Home(){

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return(
    <div className="handubi">
      <div className="div">
        <div className="parent-group">
          <Nav />
          <BigBanner/>
          <div className="space"/>
          <div className="space"/>
          <div className="text-wrapper-7">Everything in one place</div>
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