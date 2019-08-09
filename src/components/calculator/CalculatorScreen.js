import React, { Component } from 'react';

class CalculatorScreen extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default CalculatorScreen;