import React, {Component} from 'react';

class HelloMessage extends Component {
	componentDidMount() {
		if (window.Notification && Notification.permission !== "denied") {
		    Notification.requestPermission().then(() => {
				const n = new Notification(`Hello ${this.props.name}`, {body: 'Have a nice day!'});
				setTimeout(n.close.bind(n), 5000);
		    })
		}
	}
	
	render() {
		return (
			<div>
				Hello {this.props.name}
			</div>
		)
	}
}

export default HelloMessage