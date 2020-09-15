import React, { Component, useState } from "react";
import { Container } from "../components/Grid";
import axios from "axios";
import Discuss from "../components/Discuss";
import "./style.css";

class discussion extends Component {
  state = {
    bookTitle: "",
    headline: "",
    review: "",
    discussions: [],
  };

  componentDidMount() {
    this.getData();
  }
  getData(){
    axios
      .get("/api/discussion")
      .then((response) => {
        this.setState({
          discussions: response.data,
        });
      })
      .catch((e) => {});
  }

  clearForm(){
    this.setState({
      bookTitle: "",
      headline: "",
      review: "",
    })
  }


  render() {
    return (
      <Container>
        <Discuss>  
        </Discuss>
        <div class="card-body">
            <div className="form-group">
            <label className="label" id="discuss">Book Title</label>
              <input
                className="form-control"
                type="text"
                placeholder="Book name"
                value = {this.state.bookTitle}
                onChange={(e) => {
                  this.setState({ bookTitle: e.currentTarget.value }); }}  />
            <br/>
            <label className="label" id="discuss">Headline</label>
              <input
                className="form-control"
                type="text"
                placeholder="Review Title"
                value = {this.state.headline}
                onChange={(e) => {
                  this.setState({ headline: e.currentTarget.value }); }} />

            <br/>
                <label className="label" id="discuss">Review</label>
                  <textarea
                    id="review"
                    className="form-control"
                    rows="2"
                    // style={{ width: "60%" }}
                    placeholder="What did you like or dislike?"
                    defaultValue={""}
                    value = {this.state.review}
                    onChange={(e) => {
                      this.setState({ review: e.currentTarget.value }); }} />
              <br/>
              <div className="field is-grouped">
                <div className="control">
                  <button
                    className="btn"
                    id="post"
                    onClick={() => {
                      // axios.post
                      // here we do a POST to /api/reviews with the data of this.state
                      const payload = {
                        bookTitle: this.state.bookTitle,
                        headline: this.state.headline,
                        review: this.state.review,
                      };
                      axios
                        .post("/api/discussion", payload)
                        .then((d) => {
                          this.clearForm();
                          this.getData();
                        })
                        .catch((e) => {
                          console.log(e);
                        });
                    }}
                  >
                    Post
                  </button>
                </div>
              </div>
              <br />
              {/* <figure className="image">
                <img
                  width={1680}
                  height={50}
                  src="assets/reviews.png"
                  frameBorder={0}
                  allowFullScreen
                />
              </figure> */}
              <br />
              {this.state.discussions.map(
                ({ _id, bookTitle, headline, review }) => {
                  return (
                    <article className="media">
                      <div className="media-content">
                        <div className="content">
                          <p>
                            <strong>{bookTitle}</strong>{" "}
                            <small>{headline}</small>
                            <br />
                            {review}
                          </p>
                          <button
                            onClick={() => {
                              // axios.post
                              // here we do a POST to /api/reviews with the data of this.state
                              axios
                                .delete("/api/discussion/" + _id)
                                .then((d) => {
                                  this.getData();
                                })
                                .catch((e) => {
                                  console.log(e); }); }} >
                            Delete
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                }
              )}
            </div>
            </div>
      </Container>
    );
  }
}

export default discussion;
