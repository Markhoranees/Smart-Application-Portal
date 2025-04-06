import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../assets/styles/Blogs.css'; 
import blogBackground from '../assets/image/blog_background.jpg'; 
import RecentBlog from '../components/RecentBlog';
import Footer from '../components/Footer';
import Subscribe from '../components/Subscribe';

const Blogs = () => {
  return (
    <>
 
      <Header />

      
      <section 
        className="blog-hero" 
        style={{ backgroundImage: `url(${blogBackground})` }} >
        <div className="overlay"></div>
        <div className="breadcrumb">
          <nav>
            <Link to="/" className="breadcrumb-link">Home</Link> &gt;
            <span className="breadcrumb-active"> blog</span>
        <h1>Blog</h1>
          </nav>
        
        </div>
      </section>
      <RecentBlog/>
      <Subscribe/>
       <Footer/>
    
    </>
  );
};

export default Blogs;
