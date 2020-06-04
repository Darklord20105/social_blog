import React, { Component } from "react"
import { connect } from "react-redux"

import * as ACTIONS from "../store/actions/actions"
import axios from "axios"
import history from "../utils/history"

import { Link } from "react-router-dom"
import ReactHtmlParser from "react-html-parser"

import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Input,
    FormGroup,
    Modal,
    ModalBody,
    ModalHeader,
} from "reactstrap"

class ShowPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            comment: "",
            cid: "",
            //styling
            opacity: 0,
            comments_arr: [],
            comments_motion: [],
            delete_comment_id: 0,
            // likes
            likes: this.props.location.state.post.post.likes,
            like_user_id: this.props.location.state.post.post.like_user_id,
            like_post: true
        }
    }
    componentDidMount() {
        console.log(this.props)
        axios.get("/api/get/allpostcomments", {
            params: {
                post_id: this.props.location.state.post.post.pid
            }
        })
            .then(res => {
                console.log(res)
                this.props.set_comments(res.data)
            })
            .then(() => this.add_comments_to_state(this.props.comments))
            .catch(err => console.log(err))
        this.handleTransition();
    }

    handleClickOpen = (cid, comment) => {
        this.setState({ open: true, comment: comment, cid: cid })
    }
    handleClose = () => {
        this.setState({ open: false, comment: "", cid: "" })
    }
    handleCommentChange = (event) => {
        this.setState({ comment: event.target.value })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({ comment: "" })
        const comment = event.target.comment.value
        const user_id = this.props.db_profile[0].uid
        const post_id = this.props.location.state.post.post.pid
        const username = this.props.db_profile[0].username
        //temprarley
        const temp_cid = 65166
        const justnow = "Just Now"

        const data = {
            comment: comment,
            post_id: post_id,
            user_id: user_id,
            username: username
        }

        const submitted_comment = {
            cid: temp_cid,
            comment: comment,
            user_id: user_id,
            author: username,
            date_created: justnow
        }

        axios.post("/api/post/commenttodb", data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        window.scroll({ top: 0, left: 0, behavior: "smooth" })
        this.handleCommentSubmit(submitted_comment)
    }

    handleUpdate = () => {
        const comment = this.state.comment
        const cid = this.state.cid
        const user_id = this.props.db_profile[0].uid
        const post_id = this.props.location.state.post.post.pid
        const username = this.props.db_profile[0].username

        const justnow = "Just Now"
        const data = {
            cid: cid,
            comment: comment,
            post_id: post_id,
            user_id: user_id,
            username: username
        }
        const editedComment = {
            cid,
            comment,
            post_id,
            user_id,
            author: username,
            date_created: justnow,
            isEdited: true
        }

        axios.put("/api/put/commenttodb", data)
            .then(res => console.log(res, "added"))
            .catch(err => console.log(err))
        this.handleCommentUpdate(editedComment)
    }

    handleDelete = (comment_id) => {
        const cid = comment_id
        console.log("delete runs", cid)

        axios.delete("/api/delete/comment", { data: { cid: cid } })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        this.handleCommentDelete(cid)
        // this.setState({ open: false })
    }

    RenderComments = (comment) => {
        console.log("coomment", comment)
        return (
            <div className={this.state.delete_comment_id === comment.comment.cid ? "FadeOutComment" : "CommentStyle"}>
                <h3>{comment.comment.comment}</h3>
                <small>
                    {comment.comment.date_created === "Just Now" ?
                        <div>{comment.comment.isEdited ? <span>Edited</span> : <span>Just Now</span>}</div>
                        : comment.comment.date_created
                    }</small>
                <p>By : {comment.comment.author}</p>
                {comment.cur_user_id === comment.comment.user_id
                    ? (
                        <div>
                            <Button onClick={() => this.handleClickOpen(comment.comment.cid, comment.comment.comment)}>
                                Edit
                            </Button>
                            <Button onClick={() => this.handleDelete(comment.comment.cid)}>
                                Delete
                            </Button>
                        </div>
                    ) : null}
            </div>
        )
    }

    //styling functions
    // a helper function to apply transitiion
    handleTransition = () => {
        setTimeout(() => this.setState({ opacity: 1 }), 400)
    }
    // a helper function to add posts to the state
    add_comments_to_state = (comments) => {
        this.setState({ comments_arr: [...comments] })
        this.animate_comments()

    }
    // animate each comment
    animate_comments = () => {
        let i = 1
        this.state.comments_arr.map(comment => {
            setTimeout(() => {
                this.setState({ comments_motion: [...this.state.comments_motion, comment] })
            }, 400 * i)
            i++;
        })
    }
    // the following functions deals only with front end styling only
    handleCommentSubmit = (submitted_comment) => {
        setTimeout(() => {
            this.setState({ comments_motion: [submitted_comment, ...this.state.comments_motion] })
        }, 50)
    }
    handleCommentUpdate = (comment) => {
        const commentIndex = this.state.comments_motion.findIndex(com => com.cid === comment.cid)
        let newArray = [...this.state.comments_motion]
        newArray[commentIndex] = comment
        this.setState({
            comments_motion: newArray
        })
    }
    handleCommentDelete = (cid) => {
        this.setState({ delete_comment_id: cid })
        const newArr = this.state.comments_motion.filter(com => com.cid !== cid)
        setTimeout(() => this.setState({ comments_motion: newArr }), 2000)
    }

    handleLikes = () => {
        const user_id = this.props.db_profile[0].uid
        const post_id = this.props.location.state.post.post.pid
        const data = { uid: user_id, post_id: post_id }

        axios.put("/api/put/likes", data)
            .then(!this.state.like_user_id.includes(user_id) && this.state.like_post
                ? this.setState({ likes: this.state.likes + 1 }) : null)
            .then(this.setState({ like_post: false }))
            .catch(err => console.log(err))
    }

    render() {
        console.log(this.props)
        console.log(this.state)
        return (
            <Container >
                <Row>
                    <Col md="8">
                        <div className="mx-3" style={{ marginTop: "5rem" }}>
                            <h4>{this.props.location.state.post.post.title}</h4>
                            <p>{this.props.location.state.post.post.author}</p>
                            <br />
                            <div>{ReactHtmlParser(this.props.location.state.post.post.body)}</div>
                            <a className="btn btn-outline-success ml-2" style={{ cursor: "pointer" }} onClick={this.props.isAuthenticated
                                ? () => (this.handleLikes()) : () => history.replace("/signup")
                            }>
                                <i className="now-ui-icons ui-2_like mr-1"></i>
                                <span className="notification-num-showpost">{this.state.likes}</span>
                            </a>
                            <a className="btn btn-outline-success ml-2">Share</a>
                        </div>
                        <Row className="mx-3" style={{ opacity: this.state.opacity, transition: "ease-out 2s" }}>
                            <Col>
                                <h2>Comments :</h2>
                                {this.props.db_profile !== null ?
                                    (this.props.comments
                                        ? this.state.comments_motion.map(comment =>
                                            <this.RenderComments
                                                comment={comment}
                                                cur_user_id={this.props.db_profile[0].uid}
                                                key={comment.cid}
                                            />) : null) :
                                    this.props.comments
                                        ? this.state.comments_motion.map(comment =>
                                            <this.RenderComments
                                                comment={comment}
                                            />) : null
                                }
                            </Col>
                        </Row>
                        <Row className="mx-3">
                            <form onSubmit={this.handleSubmit}>
                                <Input
                                    type="text"
                                    placeholder="Comment"
                                    id="comment"
                                    required
                                />
                                <br />
                                {this.props.isAuthenticated
                                    ? <Button color="info" type="submit">
                                        Add Comment
                                        </Button>
                                    : <Link to="/signup">
                                        <Button color="primary" variant="contained">
                                            SignUp to add comment
                                        </Button>
                                    </Link>}

                            </form>
                        </Row>
                    </Col>
                    <Col> Sidebar</Col>
                </Row>
                {/*Edit Comment PopUp */}

                <Modal
                    modalClassName=" modal-regular"
                    toggle={() => this.setState({ open: false })}
                    isOpen={this.state.open}

                >
                    <ModalHeader>Add new Comment</ModalHeader>
                    <ModalBody>
                        <form
                        // onSubmit={this.handleCommentUpdate}
                        >
                            <Row>
                                <Col lg="6" sm="12">
                                    <FormGroup>
                                        <Input
                                            id="title"
                                            value={this.state.comment}
                                            placeholder="Type Your Comment here ...."
                                            type="text"
                                            style={{ width: "450px" }}
                                            required
                                            onChange={this.handleCommentChange}
                                        ></Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button
                                className="btn-info"
                                outline
                                color="info"
                                onClick={() => {
                                    console.log("Editing comments Runs")
                                    this.handleUpdate()
                                    this.setState({ open: false })
                                }}
                            >
                                Edit Comment
                            </Button>
                            <Button
                                outline
                                // className="btn-info"
                                color="info"
                                type="button"
                                onClick={() => this.setState({ open: false })}
                            >
                                Cancel
                        </Button>
                        </form>

                    </ModalBody>
                </Modal>

                {/* End Edit Popup */}
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        comments: state.posts_reducer.comments,
        db_profile: state.auth_reducer.db_profile,
        isAuthenticated: state.auth_reducer.is_authenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        set_comments: (comments) => dispatch(ACTIONS.fetch_post_comments(comments))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);




//   <div>
//                     <Dialog
//                         open={this.state.open}
//                         onClose={this.handleClose}
//                         aria-labelledby="alert-dialog-title"
//                         aria-describedby="alert-dialog-description"
//                     >
//                         <DialogTitle id="alert-dialog-title">Edit Comment</DialogTitle>
//                         <DialogContent>
//                             <DialogContentText id="alert-dialog-description">
//                                 <input type="text" value={this.state.comment} onChange={this.handleCommentChange} />
//                             </DialogContentText>
//                             <DialogActions>
//                                 <Button onClick={() => {
//                                     this.handleUpdate()
//                                     this.setState({ open: false })
//                                 }}>
//                                     Agree
//                                 </Button>
//                                 <Button onClick={() => this.handleClose()}>
//                                     Cancel
//                                 </Button>
//                                 <Button onClick={() => this.handleDelete()}>
//                                     Delete
//                                 </Button>
//                             </DialogActions>
//                         </DialogContent>
//                     </Dialog>
//                 </div> 