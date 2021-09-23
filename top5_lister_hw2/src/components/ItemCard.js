import React from 'react'

export default class ItemCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text,
            editActive: false
        }
    }

    handleClick() {

    }

    render() {
        const { text } = this.props;
        return (
            <div className="top5-item">
                {text}
            </div>
        );
    }
}

