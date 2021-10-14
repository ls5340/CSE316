import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [draggedTo, setDraggedTo] = useState(0);
    const [editActive, setEditActive] = useState(false);
    const [value, setValue] = useState("?")

    function handleClick(event) {
        handleToggleEdit(event);
    }

    function handleToggleEdit(event) {
        setEditActive(!editActive);
    }

    function handleUpdate(event) {
        setValue(event.target.value);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            handleBlur();
        }
    }
    function handleBlur() {
        let { index } = props;
        store.addChangeItemTransaction(index, value);
        handleToggleEdit();
    }

    function handleDragStart(event) {
        event.dataTransfer.setData("item", event.target.id);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveItemTransaction(sourceId, targetId);
    }

    let { index } = props;
    let itemClass = "top5-item";
    if (draggedTo) {
        itemClass = "top5-item-dragged-to";
    }

    let itemElement = 
        <div
            id={'item-' + (index + 1)}
            className={itemClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true" 
        >
            <input
                type="button"
                id={"edit-item-" + index + 1}
                className="list-card-button"
                value={"\u270E"}
                onClick={handleClick}
                onChange={handleUpdate}
                onKeyPress={handleKeyPress}
            />
            {props.text}
        </div>
    
    if (editActive) {
        itemElement = 
            <input
                type="text"
                id={"item-textbox-" + index + 1}
                className="top5-item"
                onChange={handleUpdate}
                onKeyPress={handleKeyPress}
                onBlur={handleBlur}
                defaultValue={value}
                autoFocus
            />

    }
    return (itemElement)
}

export default Top5Item;