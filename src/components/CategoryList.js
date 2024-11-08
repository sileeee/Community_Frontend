import "../App.css";
import '../styleguide.css';
import News from "./Category/News";


function CategoryList(){

    return(
        <div className="parent-group">
            <div className="space"/>
                <News />
                <div className="space"/>
                <News />
        </div>
    );
}
export default CategoryList;