import React, {Component} from 'react';
const Push = require('push.js')

class HelloMessage extends Component {
	componentDidMount() {
		Push.create('Hello world!', {
			body: "How's it hangin?",
			timeout: 4000,
			onClick() {
				window.focus()
				this.close()
			}
		})
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