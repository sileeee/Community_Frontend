import "../../../App.css";
import '../../../styleguide.css';
import { Frame } from "../../../components/common/Frame";
import frameStyle  from "../../../components/common/Frame.module.css";


function News(){

    return(
        <div className="group-18">
            <div className="flex-start">
        <div className="text-wrapper-8">News</div>
          <Frame className={frameStyle["frame-2"]} divClassName="frame-text-2" text="View All" />
        </div>
        <div className="overlap-14">
          <div className="overlap-15">
            <div className="group-19">
              <div className="overlap-group-4">
                <div className="text-wrapper-42">Business</div>
              </div>
            </div>
          </div>
          <p className="GDRFA-dubai-receives">
            GDRFA Dubai receives over 100 visa violators in first half hour as Amnesty&nbsp;&nbsp;begins
          </p>
          <p className="text-wrapper-43">
            gravida Sed nisl. elementum urna gravida non. In felis, facilisis ipsum nec elit at, lacus tincidunt
            lobortis, vitae quis venenatis enim. laoreet ullamcorper
          </p>
        </div>
        <div className="overlap-16">
          <div className="overlap-17">
            <div className="group-20">
              <div className="overlap-group-4">
                <div className="text-wrapper-42">Business</div>
              </div>
            </div>
          </div>
          <div className="group-21">
            <div className="group-22">
              <p className="GDRFA-dubai-receives-2">
                GDRFA Dubai receives over 100 visa violators in first half hour as Amnesty&nbsp;&nbsp;begins
              </p>
              <p className="text-wrapper-44">
                gravida Sed nisl. elementum urna gravida non. In felis, facilisis ipsum nec elit at, lacus tincidunt
                lobortis, vitae quis venenatis enim. laoreet ullamcorper
              </p>
            </div>
          </div>
        </div>
        <div className="overlap-18">
            <div className="overlap-19">
              <div className="group-23">
                <div className="overlap-group-4">
                  <div className="text-wrapper-42">Business</div>
                </div>
              </div>
            </div>
            <div className="group-21">
              <div className="group-22">
                <p className="GDRFA-dubai-receives-2">
                  GDRFA Dubai receives over 100 visa violators in first half hour as Amnesty&nbsp;&nbsp;begins
                </p>
                <p className="text-wrapper-44">
                  gravida Sed nisl. elementum urna gravida non. In felis, facilisis ipsum nec elit at, lacus tincidunt
                  lobortis, vitae quis venenatis enim. laoreet ullamcorper
                </p>
              </div>
            </div>
          </div>
        </div>
    );
}
export default News;