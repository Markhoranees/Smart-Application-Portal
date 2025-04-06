import React from "react";
import "../assets/styles/RecentBlog.css";
import scholarship from "../assets/image/scholarship.png";
import backendDeveloper from "../assets/image/backend_developer.png";
import scholarship2 from "../assets/image/scholarship2.png";
import developer1 from "../assets/image/developer1.png";
import searching from "../assets/image/searching.png";
import searching2 from "../assets/image/searching2.png";

const blogPosts = [
  {
    image: scholarship,
    date: "March 10, 2024",
    admin: "Admin",
    comments: 5,
    title: "Scholarship Opportunities for 2024",
    description: "Discover new scholarships available for students worldwide. Apply now!",
  },
  {
    image: backendDeveloper,
    date: "March 15, 2024",
    admin: "Admin",
    comments: 8,
    title: "How to Secure a Scholarship Abroad",
    description: "A complete guide on applying for scholarships in top universities.",
  },
  {
    image: scholarship2,
    date: "December 2, 2018",
    admin: "Admin",
    comments: 3,
    title: "Even the all-powerful Pointing has no control",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    image: developer1,
    date: "December 2, 2018",
    admin: "Admin",
    comments: 3,
    title: "Even the all-powerful Pointing has no control",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    image: searching,
    date: "December 2, 2018",
    admin: "Admin",
    comments: 3,
    title: "Even the all-powerful Pointing has no control",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    image: searching2,
    date: "December 2, 2018",
    admin: "Admin",
    comments: 3,
    title: "Even the all-powerful Pointing has no control",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const RecentBlog = () => {
  return (
    <section className="recent-blog">
      <h3>Our Blog</h3>
      <h2>Recent <strong>Blog</strong></h2>
      <div className="blog-container">
        {blogPosts.map((post, index) => (
          <div className="blog-card" key={index}>
            <div className="blog-image">
              <img src={post.image} alt="Blog" />
            </div>
            <div className="blog-content">
              <p className="blog-meta">{post.date} &nbsp; | &nbsp; {post.admin} &nbsp; | &nbsp; 💬 {post.comments}</p>
              <h4>{post.title}</h4>
              <p>{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentBlog;
