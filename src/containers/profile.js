import React, { Component } from "react";
import { connect } from "react-redux";

import * as ACTIONS from "../store/actions/actions";
import history from "../utils/history";
import axios from "axios";
import { Link } from "react-router-dom";

import Layout from "../functional/layout"
import { ProfileTabInfo } from "./profileTabInfo"

import { ProfileImg } from "./profile/ProfileImg"
import { ProfileWork } from "./profile/ProfileWork"

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      post_id: null,
      posts: [],
      messages: []
    };
  }
  componentDidMount() {
    if (this.props.db_profile !== null) {
      return this.Launch()
    } else {
      return null
    }
  }

  Launch() {
    const user_id = this.props.db_profile[0].uid;
    const username = this.props.db_profile[0].username;
    console.log(user_id, username);
    axios
      .get("/api/get/userposts", { params: { user_id: user_id } })
      .then(res => {
        console.log(res.data);
        this.setState({
          ...this.state,
          posts: res.data
        });
      })
      .then(() => {
        this.props.set_user_posts(this.state.posts);
        console.log("current store state", this.props.user_posts);
      })
      .catch(err => console.log(err));

    axios
      .get("/api/get/usermessages", {
        params: { username: username }
      })
      .then(res => {
        console.log(res.data)
        this.add_message_to_state(res.data)
        console.log(this.state.messages)
      })
      .catch(err => console.log(err));
  }

  handleClickOpen = pid => {
    this.setState({ open: true, post_id: pid });
  };

  handleClickClose = () => {
    this.setState({ open: false, post_id: null });
  };

  add_message_to_state = messages => {
    console.log(messages);
    this.setState({ messages: [...messages] });
  };

  RenderProfile = props => {
    console.log(props)
    console.log(this.state.messages)
    return (
      <Card>
        <CardBody>
          <Row>
            <Col md="4" xl="4">
              <ProfileImg />
              <ProfileWork />
            </Col>
            <Col md="8" xl="8" >
              <ProfileTabInfo data={props} messages={this.state.messages} />
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }

  deletePost = () => {
    const post_id = this.state.post_id;
    axios
      .delete("/api/delete/postcomments", { data: { post_id: post_id } })
      .then(() =>
        axios
          .delete("/api/delete/post", { data: { post_id: post_id } })
          .then(res => console.log(res))
      )
      .catch(err => console.log(err))
      .then(() => this.handleClickClose())
      .then(setTimeout(() => history.replace("/"), 700));
  };

  render() {
    console.log(this.props.db_profile, "db profile");
    console.log(this.props.profile, "profile");
    console.log(this.state.posts);

    return (
      <Layout>
        <Container style={{ marginTop: "5rem" }}>
          {this.props.db_profile !== null ?
            <this.RenderProfile profile={this.props.profile} posts={this.state.posts} extraData={this.props.db_profile} /> :
            <p>Bad request please <Link to="/signup">Log In</Link> again</p>
          }
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.auth_reducer.profile,
    user_posts: state.posts_reducer.user_posts,
    db_profile: state.auth_reducer.db_profile,
    user_messages: state.user_reducer.UserMessages
  };
};

const mapDispatchToprops = dispatch => {
  return {
    set_user_posts: posts => dispatch(ACTIONS.fetch_user_posts(posts)),
    set_user_messages: message => dispatch(ACTIONS.set_user_messages(message))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToprops
)(Profile);
