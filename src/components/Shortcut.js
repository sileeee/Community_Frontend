import "../App.css";
import '../styleguide.css';
import { Frame } from "./Frame";

function Shortcut(){

    return(
        <div>
            <Frame className="frame-1" />
            <Frame className="frame-instance" text="News" />
            <Frame className="design-component-instance-node" divClassName="frame-1-instance" text="Second-Hand Market" />
            <Frame className="frame-2" text="Real Estate" />
            <Frame className="frame-3" divClassName="frame-1-instance" text="Asian Market" />
            <Frame className="frame-4" text="Travel" />
            <Frame className="frame-5" text="UAE LIFE" />
            <Frame className="frame-6" text="Education" />
            <Frame className="frame-7" text="Club" />
            <Frame className="frame-8" divClassName="frame-1-instance" text="Freeboard" />
            <Frame className="frame-9" text="Business" />
        </div>
    );
}
export default Shortcut;