import "../../App.css";
import BigBanner from "../../components/Home/BigBanner";
import Shortcut from "../../components/Home/Shortcut";
import Nav from "../../components/Navbar/Nav"
import Foot from "../../components/Footer/Foot"
import '../../styleguide.css';
import CategoryList from "./CategoryList";
import SearchPost from "../../components/Home/SearchPost";



function Home(){

    return(
      <div className="handubi">
        <div className="div">
          <div className="parent-group">
            <Nav />
            <BigBanner/>
            <div className="space"/>
            <div className="text-wrapper-7">Everything in one place</div>
            <SearchPost />
            <Shortcut/>
            <CategoryList />
          </div>
          <Foot />
        </div>
      </div>
    );
}
export default Home;