import React from "react"
import { Container, Row, Col, Input } from "reactstrap"

import { connect } from "react-redux"
import * as ACTIONS from "../store/actions/actions";
import axios from "axios"

import { RenderPosts } from "./posts"

class SearchResults extends React.Component {
    componentDidMount = () => {
        if (this.props.location.state) {
            this.setState({ keyword: this.props.location.state })
            this.AxiosSearchCall(this.props.location.state)
        } else {
            this.handleSearch()
        }
        return
    }
    state = {
        //these are for search Engine
        keyword: "",
        posts_search: [],
    };

    add_search_posts_to_state = posts => {
        this.setState({ posts_search: [...posts] });
    };

    handleSearch = event => {
        this.setState({ keyword: event.target.value })
        this.AxiosSearchCall(this.state.keyword)
    };
    AxiosSearchCall = (search_query) => {
        console.log(search_query)
        axios
            .get("/api/get/searchpost", {
                params: { search_query: search_query }
            })
            .then(res => {
                this.props.posts_success(res.data)
                console.log(res.data)
            })
            .then(() => this.add_search_posts_to_state(this.props.search_posts))
            .catch(err => console.log(err));
    }
    render() {
        console.log(this.state)
        console.log(this.props)

        return (
            <Container>
                {/* search UI */}
                <Row>
                    <Col md="8">
                        <div>
                            <Input
                                type="text"
                                id="search"
                                placeholder="Search"
                                value={this.state.keyword}
                                onChange={this.handleSearch}
                            />
                        </div>
                        <div>
                            {/* render result here */}
                            {this.state.posts_search ? (
                                <div>
                                    {this.state.posts_search.map(post => (
                                        <RenderPosts key={post.pid} post={post} />
                                    ))}
                                </div>
                            ) : <p>there is no results for your search  {this.state.keyword}</p>}
                        </div>
                    </Col>
                    <Col>
                        sidebar
                   </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        search_posts: state.posts_reducer.search_posts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        posts_success: posts => dispatch(ACTIONS.fetch_search_posts(posts)),
        posts_failure: () => dispatch(ACTIONS.remove_search_posts())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResults)


