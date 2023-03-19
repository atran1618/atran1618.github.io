var React = require('react');
var Answer = require('./Answer.react')
var {StyleSheet, css} = require('aphrodite');

var commonStyle = {
    width: "50px",
    height: "50px",
    fontSize: "24px",
    margin: "5px",
    borderRadius: "5px",
    backgroundColor: "#f1f1f1",
    border: "none",
    cursor: "pointer",
    verticalAlign: 'middle',
    transition: 'background-color 0.2s ease-in-out',
    ':hover': {
        backgroundColor: '#ddd'
    }
}

var answerContainer = {
    position: 'relative',
}

var styles = StyleSheet.create({
    button: {
        ...commonStyle,
    },

    change: {
        ...commonStyle,
        fontSize: '16px'
    }
});

class Application extends React.Component {
    constructor() {
        super();
        this.state = {
            value: "",
            errorFlag: false,
            done: 'false',
            prevAns: ''
        };

        this.handleClick = this.handleClick.bind(this);
        this.off = this.off.bind(this);
    }

    off() {
        this.state.done = 'false';
    }

    handleClick(event) {
        const value = event.target.value;

        //If it's error, then you have to click clear, if not, nothing happened
        if(this.state.value == 'Error' && value != 'C') {
            return
        }

        // Handle the case depend on the value
        switch(value) {
            // The value is clear
            case 'C':
                this.setState({
                    value: '',
                    errorFlag: false,
                    done: 'C',
                });
                break;
            // Calculate the expression
            case '=':
                try {
                    
                    if(this.state.errorFlag == true){
                        throw "no multiple multiplications";
                    };
                    const result = eval(this.state.value.replace(/\^/g, '**').replace(/Ans/g, this.state.prevAns));

                    this.setState({
                        value: result.toString(),
                        done: 'true',
                        prevAns: result.toString()
                    });
                } catch(error) {
                    this.setState({
                        value: 'Error', 
                        done: 'error'
                    });
                }
                break;

            // handle the case when click the ^ button
            case '**':
            case 'Ans':
            case '*':
            case '-':
            case '+':
            case '/':
                if(this.state.value == '') {
                    if(value == '**') {
                        this.setState({
                            value: 'Ans^'
                        });
                        break;
                    }
                    if(value == 'Ans') {
                        this.setState({
                            value:'Ans'
                        });
                        break;
                    }
                    this.setState({
                        value: 'Ans' + value
                    });
                    break;
                };

            // Any other value we just add to the current value.
            default:
                if(value == '*' && this.state.value[this.state.value.length - 1] == '*') {
                    this.setState({
                        errorFlag: true,
                        value: this.state.value + value,
                    })
                    break;
                }
                if(value == '**') {
                    this.setState({
                        value: this.state.value + '^',
                    });
                    break;
                }
                if(value == 'Ans' && !['/', '*', '-', '+','^', '('].includes(this.state.value[this.state.value.length - 1])) {
                    this.setState({
                        errorFlag: true,
                        value: this.state.value + value,
                    });
                } else {
                    this.setState({
                        value: this.state.value + value,
                    });
                }
                break;
        }
    }

    render() {
        var ans = this.state.value
        if(this.state.done == 'true'){
            this.state.value = '';
        }
        return(
            <div>
                <h1>Simple Calculator</h1>
                <div style={answerContainer}>
                    <Answer done={this.state.done} text={ans} off={this.off}/>
                </div>
                <input type="text" value={this.state.value} readOnly/>

                <div>
                    <button onClick={this.handleClick} value="7" className={css(styles.button)}>7</button>
                    <button onClick={this.handleClick} value="8" className={css(styles.button)}>8</button>
                    <button onClick={this.handleClick} value="9" className={css(styles.button)}>9</button>
                    <button onClick={this.handleClick} value="/" className={css(styles.button)}>/</button>
                    <button onClick={this.handleClick} value="Ans" className={css(styles.button)}>Ans</button>
                </div>

                <div>
                    <button onClick={this.handleClick} value="4" className={css(styles.button)}>4</button>
                    <button onClick={this.handleClick} value="5" className={css(styles.button)}>5</button>
                    <button onClick={this.handleClick} value="6" className={css(styles.button)}>6</button>
                    <button onClick={this.handleClick} value="*" className={css(styles.button)}>x</button>
                </div>

                <div>
                    <button onClick={this.handleClick} value="1" className={css(styles.button)}>1</button>
                    <button onClick={this.handleClick} value="2" className={css(styles.button)}>2</button>
                    <button onClick={this.handleClick} value="3" className={css(styles.button)}>3</button>
                    <button onClick={this.handleClick} value="-" className={css(styles.button)}>-</button>
                </div>

                <div>
                    <button onClick={this.handleClick} value="0" className={css(styles.button)}>0</button>
                    <button onClick={this.handleClick} value="." className={css(styles.button)}>.</button>
                    <button onClick={this.handleClick} value="C" className={css(styles.change)}>Clear</button>
                    <button onClick={this.handleClick} value="+" className={css(styles.button)}>+</button>
                </div>

                <div>
                <button onClick={this.handleClick} value="(" className={css(styles.button)}>(</button>
                <button onClick={this.handleClick} value=")" className={css(styles.button)}>)</button>
                <button onClick={this.handleClick} value="=" className={css(styles.change)}>enter</button>
                <button onClick={this.handleClick} value="**" className={css(styles.button)}>^</button>
                </div>
            </div>
        )
    }
}

module.exports = Application;