import React from "react"

import { Link } from "react-router-dom";
import history from "../../utils/history";
import axios from "axios";
import moment from "moment";
import ReactHtmlParser from "react-html-parser"

import { Editor } from "@tinymce/tinymce-react";

// reactstrap components
import {
    Modal,
    ModalBody,
    ModalHeader,
    Container,
    Row,
    Col,
    Button,
    FormGroup,
    Input
} from "reactstrap";


export const ProfileTabInfoPostListRenderer = (postList) => {
    console.log(postList)
    const [modal1, setModal1] = React.useState(false);
    const [modal2, setModal2] = React.useState(false);
    const [post_pid, setPost_pid] = React.useState(null);

    const deletePost = () => {
        const post_id = post_pid;
        axios
            .delete("/api/delete/postcomments", { data: { post_id: post_id } })
            .then(() =>
                axios
                    .delete("/api/delete/post", { data: { post_id: post_id } })
                    .then(res => console.log(res))
            )
            .catch(err => console.log(err))
            .then(setTimeout(() => history.replace("/"), 700));
    };



    const SinglePost = (post) => {
        const [post_title, setPost_title] = React.useState(post.post.title);
        const [post_body, setPost_body] = React.useState(post.post.body);

        const handlePostTitleChange = (event) => {
            setPost_title(event.target.value)
        }
        const handlePostBodyChange = (content, editor) => {
            console.log(content)
            setPost_body(content)
        }

        const handlePostEditSubmit = (event) => {
            event.preventDefault()
            const title = post_title
            const body = post_body
            const pid = post.post.pid
            const uid = postList.postList.extraData[0].uid
            const username = postList.postList.extraData[0].username

            const data = {
                title: title,
                body: body,
                pid: pid,
                uid: uid,
                username: username
            }
            console.log(data)
            axios.put("/api/put/post", data)
                .then(res => console.log(res))
                .catch(err => console.log(err))
                .then(() => {
                    setModal1(false)
                })
                .then(
                    setTimeout(() => history.replace("/profile"), 700)
                )
        }

        console.log(post)
        return (
            <div class="card" style={{ boxShadow: "none", borderTop: "1px solid #dedede", borderBottom: "1px solid #dedede", padding: ".25rem 0" }}>
                <h4 class="card-header" style={{ marginTop: "0" }}>{post.post.title}</h4>
                <div class="card-body">
                    <h5 class="card-title">By : {post.post.author}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                        {moment(post.post.date_created).format("MMM DD, YYYY | h:mm a")}</h6>
                    <div class="card-text">
                        <span style={{ overflow: "hidden" }}>
                            {ReactHtmlParser(post.post.body.slice(0, 200))}
                        </span>
                        <div className="d-flex justify-content-between pt-4">
                            <Link className="btn btn-outline-info" to={{ pathname: "/post/" + post.post.pid, state: { post } }}> Continue reading</Link>
                            <div>
                                <Button color="info" onClick={() => {
                                    setModal1(true)
                                    setPost_pid(post.post.pid)
                                }}>
                                    Edit
                        </Button>
                                <Button color="info" onClick={() => {
                                    setModal2(true)
                                    setPost_pid(post.post.pid)
                                }}>
                                    Delete
                        </Button>
                            </div>
                        </div>

                    </div>
                </div>
                {/* DIALOG EDIT POPUP */}
                <Modal
                    modalClassName=" modal-regular"
                    toggle={() => setModal1(false)}
                    isOpen={modal1}

                >
                    <ModalHeader>Modify The selected Post</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handlePostEditSubmit}>
                            <Row>
                                <Col lg="6" sm="12">
                                    <FormGroup>
                                        <Input
                                            id="title"
                                            value={post_title}
                                            placeholder="Title"
                                            type="text"
                                            style={{ width: "450px" }}
                                            required
                                            onChange={handlePostTitleChange}
                                        ></Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Editor
                                            initialValue={post_body}
                                            init={{
                                                height: 400,
                                                width: 450,
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
                                            onEditorChange={handlePostBodyChange}
                                        />

                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button
                                // className="btn-info"
                                outline
                                color="info"
                                type="submit"
                                onSubmit={() => {
                                    console.log("modify Runs")
                                    handlePostEditSubmit()
                                }}
                            >
                                Modify
                        </Button>
                            <Button
                                outline
                                // className="btn-info"
                                color="info"
                                type="button"
                                onClick={() => setModal1(false)}
                            >
                                Cancel
                        </Button>
                        </form>

                    </ModalBody>
                </Modal>
                {/* DIALOG EDIT POPUP END */}

                {/* DIALOG DELETE POPUP */}
                <Modal
                    modalClassName="modal-mini modal-info"
                    toggle={() => setModal2(false)}
                    isOpen={modal2}
                >
                    <div className="modal-header justify-content-center">
                        <div className="modal-profile">
                            <i className="now-ui-icons users_circle-08"></i>
                        </div>
                    </div>
                    <ModalBody>
                        <p>Are You Sure You want to delete this post ?  </p>
                    </ModalBody>
                    <div className="modal-footer">
                        <Button
                            className="btn-neutral"
                            color="link"
                            type="button"
                            onClick={() => {
                                deletePost()
                                console.log("delete Runs")
                                setModal2(false)
                            }}
                        >
                            Delete
                        </Button>
                        <Button
                            className="btn-neutral"
                            color="link"
                            type="button"
                            onClick={() => setModal2(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </Modal>
            </div>
        )
    }
    return (
        <Row>
            <Container>
                <Col md="12">
                    <div className="pl-4">
                        <Link className="btn btn-info mb-3" to="/addpost">Add New Posts</Link>
                        {postList.postList.posts.length === 0 ? <p>No posts yet </p>
                            : postList.postList.posts.map(post => {
                                return <SinglePost post={post} key={post.pid} />
                            })}
                    </div>
                </Col>
            </Container>
        </Row>
    )
}

// regular form implementation
{/* <Input
    id="body"
    value={post_body}
    placeholder="body"
    type="textarea"
    name="text"
    style={{ width: "450px" }}
    required
    onChange={handlePostBodyChange}
>
</Input>  */}