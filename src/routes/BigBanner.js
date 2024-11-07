import "../App.css";
import '../styleguide.css';
import { useLocation } from 'react-router-dom';


function Home(){

    const location = useLocation();
    console.log(location);

    return(
        <div className="overlap">
          <div className="group">
            <div className="overlap-group">
              <div className="div-wrapper">
                <div className="text-wrapper-2">채용 정보</div>
              </div>
              <div className="overlap-2">
                <div className="text-wrapper-2">사업</div>
              </div>
              <div className="overlap-3">
                <div className="text-wrapper-2">교육</div>
              </div>
              <div className="overlap-4">
                <div className="text-wrapper-2">부동산</div>
              </div>
              <div className="overlap-5">
                <div className="text-wrapper-2">UAE 여행</div>
              </div>
              <div className="component">
                <div className="text-wrapper-2">한인 마트</div>
              </div>
            </div>
          </div>
          <div className="korean-dreams-in">
            Korean Life <br />
            in Dubai
          </div>
          <div className="overlap-wrapper">
            <div className="overlap-6">
              <div className="group-wrapper">
                <div className="group-2">
                  <div className="text-wrapper-5">Search</div>
                  <img className="search" alt="Search" src="/static/img/search.png" />
                </div>
              </div>
              <div className="text-wrapper-6">Search “Jobs”</div>
            </div>
          </div>
        </div>
    );
}
export default Home;