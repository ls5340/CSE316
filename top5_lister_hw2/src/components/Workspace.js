import React from "react";
import ItemCard from "./ItemCard";
import ListCard from "./ListCard";

export default class Workspace extends React.Component {
    render() {
        const { currentList, 
                renameItemCallback,
                dragItemCallback } = this.props;
        console.log(currentList);
        return (
            <div id="top5-workspace">
                <div id="workspace-edit">
                    <div id="edit-numbering">
                        <div className="item-number">1.</div>
                        <div className="item-number">2.</div>
                        <div className="item-number">3.</div>
                        <div className="item-number">4.</div>
                        <div className="item-number">5.</div>
                    </div>
                    <div id="edit-items">
                        { 
                            currentList !== null ? (
                                currentList.items.map((item, index) => (
                                    <ItemCard 
                                        key={index}
                                        index={index}
                                        text={item}
                                        renameItemCallback={renameItemCallback}
                                        dragItemCallback={dragItemCallback}
                                    />
                                ))
                            ) : (console.log("NOTHING"))
                        }
                    </div>
                </div>
            </div>
        )
    }
}