import React, { Component } from 'react'
import Remarkable from 'remarkable'

class MarkdownEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { value: 'Hello, **world**!' }
        this.handleChange = this.handleChange.bind(this)
    }

    getRawMarkup() {
        const md = new Remarkable()
        return { __html: md.render(this.state.value) }
    }

    handleChange(e) {
        this.setState({ value: e.target.value })
	}
	
	render() {
		return (
			<div className="markdown-section">
				<div className="markdown-editor">
					<h3>Input</h3>
					<label htmlFor="markdown-content">
						Enter some markdown here
					</label>
					<textarea
						id="markdown-content"
						rows="10"
						onChange={this.handleChange}
						defaultValue={this.state.value}>
						</textarea>
				</div>
				<div className="html-result">
					<h3>Output</h3>
					<div dangerouslySetInnerHTML={this.getRawMarkup()}></div>
				</div>
			</div>
		)
	}

}

export default MarkdownEditor