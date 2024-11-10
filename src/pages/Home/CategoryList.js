import "../../App.css";
import '../../styleguide.css';
import News from "./CategoryList/News";


function CategoryList(){

    return(
        <div>
            <div className="space"/>
                <News />
                <div className="space"/>
                <News />
        </div>
    );
}
export default CategoryList;