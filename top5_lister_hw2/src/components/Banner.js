import React from "react";
import EditToolbar from "./EditToolbar";

export default class Banner extends React.Component {
    render() {
        const { title, 
                closeCallback, 
                undoCallback, 
                redoCallback, 
                undoDisabled, 
                redoDisabled, 
                closeDisabled } = this.props;
        return (
            <div id="top5-banner">
                {title}
                <EditToolbar
                    closeCallback={closeCallback}
                    undoCallback={undoCallback}
                    redoCallback={redoCallback}
                    undoDisabled={undoDisabled}
                    redoDisabled={redoDisabled}
                    closeDisabled={closeDisabled}/>
            </div>
        );
    }
}