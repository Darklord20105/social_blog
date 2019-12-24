import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import * as ACTIONS from "../store/actions/actions";
import axios from "axios";

import moment from "moment";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";

//we shall use a package called pagination to allow the user not to load all posts but divide them into pages
import Pagination from "react-js-pagination";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //these are for transition
      posts: [],
      opacity: 0,

      //these are for pagination
      num_posts: 0,
      page_range: 0,
      activePage: 1,
      posts_per_page: 5,
      posts_slice: [],
      posts_motion: [],

      //these are for search Engine
      posts_search: [],
      posts_search_motion: []
    };
  }
  componentDidMount() {
    this.handleTransition();
    axios
      .get("/api/get/allposts")
      .then(res => {
        console.log(res.data);
        this.props.set_posts(res.data);
        console.log("current store state", this.props.posts);
      })
      .then(() => this.add_posts_to_state(this.props.posts))
      .catch(err => console.log(err));
  }
  // a helper function to apply transitiion
  handleTransition = () => {
    setTimeout(() => this.setState({ opacity: 1 }), 400);
  };

  // SEARCH FUNCTIONS
  // add search posts to state
  add_search_posts_to_state = posts => {
    this.setState({ posts_search: [] });
    this.setState({ posts_search: [...posts] });

    this.animate_search_posts();
  };

  animate_search_posts = () => {
    this.setState({
      posts_search_motion: []
    });
    let i = 1;
    this.state.posts_search.map(post => {
      setTimeout(
        () =>
          this.setState({
            posts_search_motion: [...this.state.posts_search_motion, post]
          }),
        400 * i
      );
      i++;
    });
  };

  handleSearch = event => {
    const search_query = event.target.value;

    axios
      .get("/api/get/searchpost", {
        params: { search_query: search_query }
      })
      .then(res => this.props.posts_success(res.data))
      .then(() => this.add_search_posts_to_state(this.props.search_posts))
      .catch(err => console.log(err));
  };

  // a helper function to add posts to the state
  add_posts_to_state = posts => {
    this.setState({ posts: [...posts] });
    this.setState({
      num_posts: this.state.posts.length,
      page_range: this.state.num_posts / 5
    });

    this.slice_posts();
    this.animate_posts();
  };
  // a helper function to help decide where to slice our posts array and make a new page
  slice_posts = () => {
    const indexOfLastPost = this.state.activePage * this.state.posts_per_page;
    const indexOfFirstPost = indexOfLastPost - this.state.posts_per_page;

    this.setState({
      posts_slice: this.state.posts.slice(indexOfFirstPost, indexOfLastPost)
    });
  };

  // a helper function to animate each post seperately
  animate_posts = () => {
    this.setState({
      posts_motion: []
    });
    let i = 1;
    this.state.posts_slice.map(post => {
      setTimeout(
        () =>
          this.setState({ posts_motion: [...this.state.posts_motion, post] }),
        400 * i
      );
      i++;
    });
  };

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });

    setTimeout(() => this.slice_posts(), 50);
    setTimeout(() => this.animate_posts(), 100);
  };

  RenderPosts = post => {
    return (
      <div className="CardStyles">
        <Card
          style={{
            width: "500px",
            height: "200px",
            marginBottom: "10px",
            paddingBottom: "80px"
          }}
        >
          <CardHeader
            title={
              <Link
                to={{ pathname: "/post/" + post.post.pid, state: { post } }}
              >
                {post.post.title}
              </Link>
            }
            subheader={
              <div className="FlexColumn">
                <div className="FlexRow">
                  {moment(post.post.date_created).format(
                    "MMM DD, YYYY | h:mm a"
                  )}
                  <br />
                  <Link
                    style={{ paddingLeft: "5px", textDecoration: "none" }}
                    to={{
                      pathname: "/user/" + post.post.author,
                      state: { post }
                    }}
                  >
                    By : {post.post.author}
                  </Link>
                </div>
                <div className="FlexRow">
                  <i className="material-icons">thumb_up</i>
                  <div className="notification-num-posts">
                    {post.post.likes}
                  </div>
                </div>
              </div>
            }
          />
          {/* <br /> */}
          <CardContent>
            <span style={{ overflow: "hidden" }}>{post.post.body}</span>
          </CardContent>
        </Card>
      </div>
    );
  };

  render() {
    console.log(this.props.posts);
    return (
      <div>
        <div
          style={{ opacity: this.state.opacity, transition: "opacity 2s ease" }}
        >
          <br />

          {this.props.is_authenticated ? (
            <Link to="/addpost">
              <Button color="primary" variant="contained">
                Add Post
              </Button>
            </Link>
          ) : (
            <Link to="/signup">
              <Button color="primary" variant="contained">
                SignUp to add post
              </Button>
            </Link>
          )}
        </div>

        {/* search UI */}
        <div>
          <TextField
            id="search"
            label="Search"
            margin="normal"
            onChange={this.handleSearch}
          />
        </div>
        <div>
          {this.state.posts_search ? (
            <div>
              {this.state.posts_search_motion.map(post => (
                <this.RenderPosts key={post.pid} post={post} />
              ))}
            </div>
          ) : null}
        </div>

        <div
          style={{ opacity: this.state.opacity, transition: "opacity 2s ease" }}
        >
          <h1>All Posts</h1>
          <div>
            {this.state.posts ? (
              <div>
                {this.state.posts_motion.map(post => (
                  <this.RenderPosts key={post.pid} post={post} />
                ))}
              </div>
            ) : null}
          </div>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={5}
            totalItemsCount={this.state.num_posts}
            pageRangeDisplayed={this.state.page_range}
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts_reducer.posts,
    is_authenticated: state.auth_reducer.is_authenticated,
    search_posts: state.posts_reducer.search_posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    set_posts: posts => dispatch(ACTIONS.fetch_db_posts(posts)),
    // for search functionality
    posts_success: posts => dispatch(ACTIONS.fetch_search_posts(posts)),
    posts_failure: () => dispatch(ACTIONS.remove_search_posts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
