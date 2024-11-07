import "../App.css";
import BigBanner from "../components/BigBanner";
import Shortcut from "../components/Shortcut";
import Nav from "../components/Nav"
import '../styleguide.css';


function Home(){

    return(
      <div className="handubi">
        <div className="div">
          <Nav />
          <BigBanner/>
          <Shortcut/>
          <div className="text-wrapper-7">Everything in one place</div>
        </div>
      </div>
    );
}
export default Home;