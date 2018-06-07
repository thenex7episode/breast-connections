import React, { Component } from "react";
import "./forums.css";
import { Link } from "react-router-dom";
import Banner from "../Components/Banner/Banner";

class Forums extends Component {
  constructor() {
    super();

    this.state = {
      categories: []
    };
  }
  render() {
    return (
      <div>
        <Banner text1={"Connect."} text2={"Inspire."} text3={"Thrive."} />

        <div className="section-a-wrapper">
          <div className="section-a">
            <h1>
              <strong>FAMILY</strong>
            </h1>

            <div className="family-content">
              <p>
                {" "}
                It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <Link to="/dashboard/family">
                <button>see posts</button>
              </Link>
            </div>
          </div>

          <div className="section-b">
            <h1>
              <strong>RESOURCES</strong>
            </h1>
            <div className="family-content">
              <p>
                {" "}
                It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <Link to="/dashboard/resources">
                <button>see posts</button>
              </Link>
            </div>
          </div>
          <div className="section-c">
            <h1>
              <strong>NUTRITION</strong>
            </h1>
            <div className="family-content">
              <p>
                {" "}
                It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <Link to="/dashboard/nutrition">
                <button>see posts</button>
              </Link>
            </div>
          </div>
          <div className="section-d">
            <h1>
              <strong>MOTIVATION</strong>
            </h1>
            <div className="family-content">
              <p>
                {" "}
                It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <Link to="/dashboard/motivation">
                <button>see posts</button>
              </Link>
            </div>
          </div>
          <div className="section-e">
            <h1>
              <strong>HEALTH</strong>
            </h1>
            <div className="family-content">
              <p>
                {" "}
                It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <Link to="/dashboard/health">
                <button>see posts</button>
              </Link>
            </div>
          </div>
          <div className="section-f">
            <h1>
              <strong>FINANCIAL</strong>
            </h1>
            <div className="family-content">
              <p>
                {" "}
                It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <Link to="/dashboard/financial">
                <button>see posts</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Forums;
