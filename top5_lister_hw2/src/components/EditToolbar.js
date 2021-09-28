import React from "react";

export default class EditToolbar extends React.Component {
    render() {
        const { closeCallback, 
                undoCallback, 
                redoCallback } = this.props;
        return (
            <div id="edit-toolbar">
                <input 
                    type="button"
                    id='undo-button' 
                    className="top5-button"
                    className="disabled"
                    onClick={undoCallback}
                    value="&#x21B6;"/>
                <input
                    type="button"
                    id='redo-button'
                    className="top5-button"
                    className="disabled"
                    onClick={redoCallback}
                    value="&#x21B7;"
                />
                <input 
                    type="button" 
                    id="close-button"
                    className="top5-button" 
                    className="disabled"
                    value="&#x24E7;"
                    onClick={closeCallback}/>
            </div>
        )
    }
}