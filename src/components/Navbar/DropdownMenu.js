import React from "react";
import ReactDOM from "react-dom";

function DropdownMenu({ children, style }) {
    return ReactDOM.createPortal(
        <div style={{ ...style, zIndex: 999999 }}>
            {children}
        </div>,
        document.body
    );
}

export default DropdownMenu;
