import React, { Component } from "react";
import axios from "axios";
import "./userhome.css";
import Post from "../Post/Post";
import Sidebar from "../Sidebar/Sidebar";
import { Menu, Dropdown, Button } from "antd";
import Banner from "../../Components/Banner/Banner";

class UserHome extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      loggedUser: "",
      filteredPosts: [],
      category: ""
    };
    this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
    axios.get("/api/posts/").then(response => {
      console.log("all posts-----------------------------", response);
      this.setState({ posts: response.data, filteredPosts: response.data });
    });

    axios.get(`/api/check-session/`).then(data => {
      console.log("session res", data);
      this.setState({ loggedUser: data.data.username });
    });
  }

  deletePost(id) {
    axios.delete(`/api/deletepost/${id}`).then(data => {
      console.log("data.data in delete in profile:", data.data);
      this.setState({ posts: data.data.data });
    });
  }
  selectCategory(category) {
    console.log(this.state.posts);
    console.log("category-------------", category);
    const filteredPosts = this.state.posts.filter(el => {
      return el.category === category;
    });
    console.log("filtered posts----------", filteredPosts);
    this.setState({ filteredPosts: filteredPosts });
    console.log("filtered posts---------------------", this.state);
  }

  render() {
    const allPosts = this.state.filteredPosts.map((el, i) => {
      return (
        <div className="d-posts-wrapper">
          <div className="d-posts-content">
            <Post
              loggedUser={this.state.loggedUser}
              key={i}
              post_id={el.post_id}
              title={el.title}
              body={el.body}
              user_id={el.user_id}
              date={el.date}
              tracker={el.tracker}
              deletePostFn={this.deletePost}
            />
          </div>
        </div>
      );
    });
    const menu = (
      <Menu>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              this.setState({ category: "motivation" });
              this.selectCategory("motivation");
            }}
          >
            Motivation
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              this.setState({ category: "resources" });
              this.selectCategory("resources");
            }}
          >
            Resources
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              this.setState({ category: "family" });
              this.selectCategory("family");
            }}
          >
            Family
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              this.setState({ category: "nutrition" });
              this.selectCategory("nutrition");
            }}
          >
            Nutrition
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              this.setState({ category: "health" });
              this.selectCategory("health");
            }}
          >
            Health
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              this.setState({ category: "financial" });
              this.selectCategory("financial");
            }}
          >
            Financial
          </a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <Banner text1={"Connect."} text2={"Inspire."} text3={"Thrive."} />

        <div className="category-dropdown">
          <Dropdown overlay={menu} placement="bottomCenter">
            <Button>Categories</Button>
          </Dropdown>
          <div className="category-current">
            <button className="category-button">
              Current Category is {this.state.category}
            </button>
          </div>
          <Button
            onClick={() =>
              this.setState({
                filteredPosts: this.state.posts
              })
            }
          >
            Reset
          </Button>
        </div>

        {allPosts}
      </div>
    );
  }
}
export default UserHome;
