import React from "react";

export default class EditToolbar extends React.Component {
    render() {
        const { closeCallback, 
                undoCallback, 
                redoCallback, 
                undoDisabled, 
                redoDisabled, 
                closeDisabled } = this.props;
        return (
            <div id="edit-toolbar">
                <div 
                    id='undo-button' 
                    className="top5-button"
                    onClick={undoCallback}>
                        &#x21B6;
                </div>
                <div
                    id='redo-button'
                    className="top5-button"
                    onClick={redoCallback}>
                        &#x21B7;
                </div>
                <input type="button" 
                className="top5-button" 
                value="&#x24E7;"
                onClick={closeCallback}/>
            </div>
        )
    }
}