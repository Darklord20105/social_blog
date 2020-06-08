import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import * as ACTIONS from "../store/actions/actions";
import axios from "axios";

import moment from "moment";

import PostListHead from "./postListhead"
import SideBar from "./sidebar"

import {
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardText,
  CardBody,
  CardImg,
  Button,
  Container,
  Row,
  Col,
  Input,
  CardFooter
} from "reactstrap";

//we shall use a package called pagination to allow the user not to load all posts but divide them into pages
import Pagination from "react-js-pagination";


export const RenderPosts = post => {
  const articleStyles = {
    position: "relative",
    zIndex: "10",
    margin: "-30px 30px 0px",
    background: "#fff",
    paddingTop: "2rem"
  }
  return (
    <div>
      <Card style={{ boxShadow: "none" }}>
        <CardImg
          // style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 80%)" }}
          top
          width="100%"
          height="350px"
          src={`https://unsplash.it/800/600/?${Math.floor(Math.random(0, 100) * 100)}`}
          alt="Card image cap"
        />
        <CardHeader className="text-center" style={articleStyles} >
          <CardSubtitle className="small" style={{ marginBottom: "-20px" }}>Category</CardSubtitle>
          <CardTitle ><h4 className="font-weight-bold" style={{ letterSpacing: "2px", marginBottom: "0" }}>{post.post.title}</h4></CardTitle>
          <CardSubtitle>
            <Link className="small" to={{ pathname: "/user/" + post.post.author, state: { post } }}>
              By : {post.post.author}
            </Link>
          </CardSubtitle>
        </CardHeader>
        <CardBody>
          <CardText>
            <span className="text-break" style={{ overflow: "hidden" }}>
              {/* {ReactHtmlParser(post.post.body.slice(0, 200))} */}
              {post.post.body.slice(0, 200)} ...
              </span>
            <Link className="btn btn-outline-info d-block mr-auto ml-auto mt-3" style={{ width: "max-content" }} to={{ pathname: "/post/" + post.post.pid, state: { post } }}>Continue Reading</Link>
          </CardText>
        </CardBody>
        <CardFooter className="small d-flex justify-content-between" style={{ borderTop: "1px #dedede solid", borderBottom: "1px #dedede solid", padding: "1rem 1.25rem" }}>
          <div>
            <span><i className="now-ui-icons ui-2_time-alarm mr-1"></i>{moment(post.post.date_created).format("MMM DD, YYYY | h:mm a")}</span>
            <span style={{
              marginLeft: "1rem",
              marginRight: "1rem",
              borderRight: "1px solid #dedede"
            }}></span>
            <span><i className="now-ui-icons ui-2_like mr-1"></i> likes : {post.post.likes}</span>
          </div>

          <div>
            <a><i className="now-ui-icons ui-2_favourite-28 mr-1"></i></a>
            <a><i className="now-ui-icons ui-2_settings-90 mr-1"></i></a>
            <a><i className="now-ui-icons ui-1_settings-gear-63 mr-1"></i></a>
            <a><i className="now-ui-icons ui-1_zoom-bold mr-1"></i></a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

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
      .get("https://my-social-blog-api-server.herokuapp.com/api/get/allposts")
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
      return null;
    });
  };

  handleSearch = event => {
    const search_query = event.target.value;
    console.log(search_query)

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
      return null;
    });
  };

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });

    setTimeout(() => this.slice_posts(), 50);
    setTimeout(() => this.animate_posts(), 100);
  };


  render() {
    console.log(this.props.posts);
    return (
      <Container style={{ marginTop: "5rem" }}>
        <Row><h1>All Posts</h1></Row>
        {/* <Row className="justify-content-center mb-5">
          <PostListHead />
        </Row> */}

        {/* render posts list */}
        <Row style={{ opacity: this.state.opacity, transition: "opacity 2s ease" }}>
          <Col md="8">
            {this.state.posts ? (
              <div>
                {this.state.posts_motion.map(post => (
                  <RenderPosts key={post.pid} post={post} />
                ))}
              </div>
            ) : null}

          </Col>
          <Col md="4">
            <SideBar />
          </Col>
        </Row>

        {/* Pagination */}
        <Row>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={5}
            totalItemsCount={this.state.num_posts}
            pageRangeDisplayed={this.state.page_range}
            onChange={this.handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
        </Row>

      </Container>
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

//  {/* search UI */}
//         {/* <Row>
//           <div>
//             <Input
//               type="text"
//               id="search"
//               placeholder="Search"
//               onChange={this.handleSearch}
//             />
//           </div>
//           <div>
//             {this.state.posts_search ? (
//               <div>
//                 {this.state.posts_search_motion.map(post => (
//                   <this.RenderPosts key={post.pid} post={post} />
//                 ))}
//               </div>
//             ) : null}
//           </div>
//         </Row> */}

// {/* add post button */}
// <Row style={{ opacity: this.state.opacity, transition: "opacity 2s ease" }}>
// <br />
// {this.props.is_authenticated ? (
//   <Link to="/addpost">
//     <Button color="primary" variant="contained">
//       Add Post
//         </Button>
//   </Link>
// ) : (
//     <Link to="/signup">
//       <Button color="primary" variant="contained">
//         SignUp to add post
//         </Button>
//     </Link>
//   )
// }
// </Row>
