import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import firebase from "./firebase";
import SimpleStorage from "react-simple-storage";

import NavBar from "./components/navbar/navbar";

import Footer from "./components/footer/footer";
import Message from "./components/message/message";
import Posts from "./components/posts/posts";
import Post from "./components/post/post";
import PostForm from "./components/postForm/postForm";
import Login from "./views/Login/Login";
import NotFound from "./views/NotFound/NotFound";

import "./App.css";

class App extends Component {
  state = {
    isAuthenticated: false,
    posts: [],
    message: null,
    email: ""
  };

  onLogin = (email, password) => {
    console.log(email, password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ 
            isAuthenticated: true,
            message: "loggedIn", 
            email: email 
        });
        this.getPosts(email);
        setTimeout(() => {
            this.setState({ message: null });
        }, 1600);
      })
      .catch(error => console.error(error));
  };

  onLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ 
            isAuthenticated: false,
            message: "loggedOut",
            email: ""
        });
        setTimeout(() => {
            this.setState({ message: null });
        }, 1600);
      })
      .catch(error => console.error(error));
  };

  getPosts = (email) => {
    console.log(this.state.email);
    const postsRef = firebase.database().ref("posts").orderByChild("email").equalTo(email);
    postsRef.on("value", snapshot => {
        const posts = snapshot.val();
        const newStatePosts = [];
        for (let key in posts) {
        newStatePosts.push({
            key: key,
            slug: posts[key].slug,
            title: posts[key].title,
            content: posts[key].content,
            email: posts[key].email
        });
        }
        this.setState({ posts: newStatePosts });
    });
  }

  getNewSlugFromTitle = title =>
    encodeURIComponent(
      title
        .toLowerCase()
        .split(" ")
        .join("-")
    );

  addNewPost = post => {
    const postsRef = firebase.database().ref("posts");
    post.slug = this.getNewSlugFromTitle(post.title);
    post.email = this.state.email;
    delete post.key;
    postsRef.push(post);

    this.setState({
      message: "saved"
    });
    setTimeout(() => {
      this.setState({ message: null });
    }, 1600);
  };

  updatePost = post => {
    const postRef = firebase.database().ref("posts/" + post.key);
    postRef.update({
      slug: this.getNewSlugFromTitle(post.title),
      title: post.title,
      content: post.content
    });
    this.setState({ message: "updated" });
    setTimeout(() => {
      this.setState({ message: null });
    }, 1600);
  };

  deletePost = post => {
    if (window.confirm("Delete this post?")) {
      const postRef = firebase.database().ref("posts/" + post.key);
      postRef.remove();
      this.setState({ message: "deleted" });
      setTimeout(() => {
        this.setState({ message: null });
      }, 1600);
    }
  };

  render() {
    return (
      <div id="main-wrapper">
        <div className="page-wrapper ">
          <div className="container-fluid">
            <Router>
              <div className="App">
                <SimpleStorage parent={this} />
                <NavBar
                  isAuthenticated={this.state.isAuthenticated}
                  onLogout={this.onLogout}
                />
                {this.state.message && <Message type={this.state.message} />}
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <Posts
                        isAuthenticated={this.state.isAuthenticated}
                        posts={this.state.posts}
                        deletePost={this.deletePost}
                      />
                    )}
                  />
                  <Route
                    path="/post/:postSlug"
                    render={props => {
                      const post = this.state.posts.find(
                        post => post.slug === props.match.params.postSlug
                      );
                      if (post) {
                        return <Post post={post} />;
                      } else {
                        return <Redirect to="/" />;
                      }
                    }}
                  />
                  <Route
                    exact
                    path="/login"
                    render={() =>
                      !this.state.isAuthenticated ? (
                        <Login onLogin={this.onLogin} />
                      ) : (
                        <Redirect to="/" />
                      )
                    }
                  />
                  <Route
                    exact
                    path="/new"
                    render={() =>
                      this.state.isAuthenticated ? (
                        <PostForm
                          addNewPost={this.addNewPost}
                          post={{ key: null, slug: "", title: "", content: "" }}
                        />
                      ) : (
                        <Redirect to="/" />
                      )
                    }
                  />
                  <Route
                    path="/edit/:postSlug"
                    render={props => {
                      const post = this.state.posts.find(
                        post => post.slug === props.match.params.postSlug
                      );
                      if (post && this.state.isAuthenticated) {
                        return (
                          <PostForm updatePost={this.updatePost} post={post} />
                        );
                      } else {
                        return <Redirect to="/" />;
                      }
                    }}
                  />
                  <Route component={NotFound} />
                </Switch>
                <Footer />
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
