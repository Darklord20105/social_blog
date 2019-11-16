import React, { Component } from "react"
import axios from "axios"
import history from "../utils/history"
import TextFiled from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { connect } from "react-redux"

class EditPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: "",
            body: ""
        }
    }

    componentDidMount() {
        console.log(this.props)
        this.setState({
            title: this.props.location.state.post.post.title,
            body: this.props.location.state.post.post.body,
        })
    }

    handleTitleChange = event => {
        this.setState({ ...this.state, title: event.target.value })
    }

    handleBodyChange = event => {
        this.setState({ ...this.state, body: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const uid = this.props.db_profile[0].uid
        const username = this.props.db_profile[0].username
        const pid = this.props.location.state.post.post.pid
        const title = event.target.title.value
        const body = event.target.body.value

        const data = {
            title: title,
            body: body,
            pid: pid,
            uid: uid,
            username: username
        }
        axios.put("/api/put/post", data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
            .then(
                setTimeout(() => history.replace("/profile"), 700)
            )
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <TextFiled
                        id="title"
                        label="title"
                        margin="normal"
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                    />
                    <TextFiled
                        id="body"
                        label="body"
                        multiline
                        rows='4'
                        margin="normal"
                        value={this.state.body}
                        onChange={this.handleBodyChange}
                    />
                    <Button type="submit"> Submit </Button>
                </form>
                <button onClick={() => history.goBack()}> Cancel </button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        db_profile: state.auth_reducer.db_profile
    }
}

export default connect(mapStateToProps)(EditPost)