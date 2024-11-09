import "../App.css";
import BigBanner from "../components/Home/BigBanner";
import Shortcut from "../components/Home/Shortcut";
import Nav from "../components/Nav"
import '../styleguide.css';
import CategoryList from "../components/Home/CategoryList";


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