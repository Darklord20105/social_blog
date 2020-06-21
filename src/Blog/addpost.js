import React, { Component } from "react"
import axios from "axios"

import history from '../utils/history'
import { Input, Container, FormGroup, Button } from "reactstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom"

import { Editor } from "@tinymce/tinymce-react"


class AddPost extends Component {
    state = {
        body: ""
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const user_id = this.props.db_profile[0].uid
        const username = this.props.db_profile[0].username
        const data = {
            title: event.target.title.value,
            // body: event.target.body.value,
            body: this.state.body,
            username: username,
            uid: user_id
        }
        axios.post("https://my-social-blog-api-server.herokuapp.com/api/post/posttodb", data)
            .then(res => console.log(res))
            .catch((err) => console.log(err))
            .then(setTimeout(() => history.replace("/posts"), 700))
    }

    handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
        this.setState({ body: content })
    }
    render() {
        console.log(this.state.body)
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
                                />
                            </FormGroup>
                            {/* <FormGroup>
                            <Input
                                type="textarea"
                                id="body"
                                rows="4"
                                placeholder="Article Content Here"
                                required
                            />
                            </FormGroup> */}
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

export default connect(mapStateToProps)(AddPost);