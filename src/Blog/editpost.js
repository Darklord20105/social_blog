import React, { Component } from "react"
import axios from "axios"
import history from "../utils/history"
import { Button } from "reactstrap"
import { connect } from "react-redux"

import { Editor } from "@tinymce/tinymce-react"

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
        axios.put("https://my-social-blog-api-server.herokuapp.com/api/put/post", data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
            .then(
                setTimeout(() => history.replace("/profile"), 700)
            )
    }

    render() {
        return (
            <Container style={{ marginTop: "5rem" }}>
                {this.props.db_profile !== null ?
                    <div>
                        <div>
                            <h2>Create New Article</h2>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    id="title"
                                    placeholder="Enter Article Title"
                                    required
                                    value={this.state.title}
                                />
                            </FormGroup>

                            <Editor
                                initialValue={this.state.body}
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar:
                                        'undo redo | formatselect | bold italic backcolor | \
                                        alignleft aligncenter alignright alignjustify | \
                                        bullist numlist outdent indent | removeformat | help'
                                }}
                                onEditorChange={this.handleEditorChange}
                            />
                            <Button className="btn btn-success" type="submit"> Submit </Button>
                            <Button className="btn btn-danger" onClick={() => history.goBack()}> Cancel </Button>
                        </form>
                    </div> : <Redirect to="/signup" />}
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        db_profile: state.auth_reducer.db_profile
    }
}

export default connect(mapStateToProps)(EditPost)

{/* <div>
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
            </div> */}