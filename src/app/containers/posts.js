import React, { Component } from 'react';
import { connect } from 'react-redux';

import Posts from '../components/posts';
import { prefix, getArticle, getPosts } from '../actions';

class PostsContainer extends Component {
    constructor(props) {
        super(props);
    }

    static fetchData(dispatch, params) {
        let cate = params.cate;
        let tag = params.tag;

        if (cate) {
            return dispatch(getPosts('cate', cate, prefix));
        }
        if (tag) {
            return dispatch(getPosts('tag', tag, prefix));
        }
        return dispatch(getPosts(null, null, prefix));
    }

    componentDidMount() {
        const { params, dispatch, getPosts, posts } = this.props;
        let cate = params.cate;
        let tag = params.tag;

        if (!posts || !posts.length) {
            if (cate) {
                dispatch(getPosts('cate', cate));
            } else if (tag) {
                dispatch(getPosts('tag', tag));
            } else {
                dispatch(getPosts());
            }
        }
    }

    render() {
        const { posts, fetchArticle } = this.props;

        if (posts && posts.length) {
            return (
                <Posts posts={posts} getArticle={fetchArticle} />
            );
        }
        return (<div>loading...</div>);
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts.list,
    }
};

const mapDispatchToProps = dispatch => ({
    dispatch,
    getPosts,
    fetchArticle: id => dispatch(getArticle(id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PostsContainer);

