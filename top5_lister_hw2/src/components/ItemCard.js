import React from 'react'

export default class ItemCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            index: this.props.index,
            text: this.props.text,
            editActive: false,
            draggedOver: false
        }
    }

    handleClick = (event) => {
        if (event.detail === 2) {
            this.handleToggleEdit(event);
        }
    }
    handleToggleEdit = (event) => {
        this.setState({
            editActive: !this.state.editActive
        });
    }
    handleUpdate = (event) => {
        this.setState({ text: event.target.value });
    }
    handleKeyPress = (event) => {
        if (event.code === "Enter") {
            this.handleBlur();
        }
    }
    handleBlur = () => {
        let index = this.state.index;
        let textValue = this.state.text;
        console.log("ItemCard handleBlur: " + textValue);
        this.props.renameItemCallback(index, textValue)
        this.handleToggleEdit();
    }
    handleOnDragStart = (event) => {
        event.dataTransfer.setData("text", this.state.index)
    }
    handleOnDrop = (event) => {
        event.preventDefault();
        let oldIndex = parseInt(event.dataTransfer.getData("text"));
        let newIndex = this.state.index;
        this.setState(prevState => ({
            draggedOver: false
        }), () => {
            this.props.dragItemCallback(oldIndex, newIndex);
        });
    }
    handleOnDragOver = (event) => {
        event.preventDefault();
        this.setState({ draggedOver: true });
    }
    handleOnDragLeave = (event) => {
        this.setState({ draggedOver: false });
    }

    render() {
        const { index, text } = this.props;
        if (this.state.editActive) {
            return (
                <input
                    className='top5-item'
                    type='text'
                    onKeyPress={this.handleKeyPress}
                    onBlur={this.handleBlur}
                    onChange={this.handleUpdate}
                    defaultValue={text}
                    autoFocus
                />
            );
        }
        else {
            if (this.state.draggedOver) {
                return (
                    <div 
                        className="top5-item"
                        className="top5-item-dragged-to"
                        onClick={this.handleClick}
                        draggable="true"
                        onDragStart={this.handleOnDragStart}
                        onDragOver={this.handleOnDragOver}
                        onDrop={this.handleOnDrop}
                        onDragLeave={this.handleOnDragLeave}>
                        {text}
                    </div>
                );
            }
            else {
                return (
                    <div 
                        className="top5-item"
                        onClick={this.handleClick}
                        draggable="true"
                        onDragStart={this.handleOnDragStart}
                        onDragOver={this.handleOnDragOver}
                        onDrop={this.handleOnDrop}
                        onDragLeave={this.handleOnDragLeave}>
                        {text}
                    </div>
                );
            }
        }
    }
}

