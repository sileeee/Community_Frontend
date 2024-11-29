import React from "react";
import ReactDOM from "react-dom";
import styles from "./Nav.module.css";

function DropdownMenu({ children, style }) {
    return ReactDOM.createPortal(
        <div className={styles.dropdownMenu} style={style}>
            {children}
        </div>,
        document.body
    );
}

export default DropdownMenu;
