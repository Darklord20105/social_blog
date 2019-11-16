import React, { Component } from "react"
import { connect } from "react-redux"

import { Link } from "react-router-dom";
import * as ACTIONS from "../store/actions/actions"
import axios from "axios"

import Button from "@material-ui/core/Button"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/Table"
import TableCell from "@material-ui/core/Table"
import TableHead from "@material-ui/core/Table"
import TableRow from "@material-ui/core/Table"
import Paper from "@material-ui/core/Paper"

const RenderPosts = post => {
    return (
        <TableRow>
            <TableCell>
                <Link to={{ pathname: "/post/" + post.post.pid, state: { post } }}>
                    <h4>{post.post.title}</h4>
                </Link>
                <br />
                <p>{post.post.body}</p>
            </TableCell>
        </TableRow>
    )
}

class Posts extends Component {
    componentDidMount() {
        axios.get("/api/get/allposts")
            .then(res => {
                console.log(res.data)
                this.props.set_posts(res.data)
                console.log("current store state", this.props.posts)
            })
            .catch(err => console.log(err))
    }
    render() {
        console.log(this.props.posts)
        return (
            <div>
                <br />
                <Link to="/addpost">
                    <Button color="primary">Add Post</Button>
                </Link>
                <h1>Posts</h1>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    title
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.posts ? this.props.posts.map(post =>
                                <RenderPosts key={post.pid} post={post} />
                            )
                                : null
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts_reducer.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        set_posts: (posts) => dispatch(ACTIONS.fetch_db_posts(posts))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);