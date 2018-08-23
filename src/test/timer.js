import React, {Component} from 'react';

class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {time: (new Date()).toLocaleTimeString()};
	}
	
	tick() {
		this.setState({
			time: (new Date()).toLocaleTimeString()
		});
	}
	
	componentDidMount() {
		this.interval = setInterval(() => this.tick(), 1000);
	}
	
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	
	render() {
		return (
			<div>
				{this.state.time}	
			</div>
		)
	}
}

export default Timer