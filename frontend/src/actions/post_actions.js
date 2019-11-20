import * as PostAPIUtil from '../util/post_api_util';

export const RECEIVE_EVENT_POSTS = "RECEIVE_EVENT_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";

const receiveEventPosts = posts => ({
  type: RECEIVE_EVENT_POSTS,
  posts
});

const receivePost = post => ({
  type: RECEIVE_POST,
  post
});

export const fetchEventPosts = id => dispatch => {
  PostAPIUtil.fetchEventPosts(id)
    .then( posts => dispatch(receiveEventPosts(posts)))
    .catch(err => console.log(err));
};

export const createPost = data => dispatch => {
  PostAPIUtil.createPost(data)
    .then(post => dispatch(receivePost(post)))
    .catch(err => console.log(err));
};
