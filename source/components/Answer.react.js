var React = require('react');

var answer ={
    position: 'absolute',
    top: '-35px',
    left: '0'
};

class Answer extends React.Component {
    constructor(){
        super();
        this.state = {
            ans: ''
        }
    }

    render() {
        if(this.props.done == 'true') {
            this.props.off();
            this.ans = this.props.text
            return(
                <p style={answer}>{this.ans}</p>
            )
        }
        if(this.props.done == 'C' || this.props.done == 'error') {
            return
        }
        return(
            <p style={answer}>{this.ans}</p>
        )
    }
};

module.exports = Answer;