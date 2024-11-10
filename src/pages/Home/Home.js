import "../../App.css";
import BigBanner from "./BigBanner";
import Shortcut from "./Shortcut";
import Nav from "../../components/Navbar/Nav"
import '../../styleguide.css';
import CategoryList from "./CategoryList";


function Home(){

    return(
      <div className="handubi">
        <div className="div">
          <div className="parent-group">
            <Nav />
            <BigBanner/>
            <div className="space"/>
            <div className="text-wrapper-7">Everything in one place</div>
            <Shortcut/>
          <CategoryList />
          </div>
        </div>
      </div>
    );
}
export default Home;