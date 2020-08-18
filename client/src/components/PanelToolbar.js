import React from "react";

const PanelToolbar = () => {
    return (
        <div className="panel-toolbar">
            <a
                onClick={(e) => e.preventDefault()}
                href="/#"
                className="action-item"
            >
                Create Room
            </a>
            <br />
            <a
                onClick={(e) => e.preventDefault()}
                href="/#"
                className="action-item"
            >
                Create Space
            </a>
        </div>
    );
};

export default PanelToolbar;
