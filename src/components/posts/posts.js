/* eslint-disable */
import React from 'react';
import { Link } from "react-router-dom";

import { Row, Col, Container, Card } from 'reactstrap';
import HeaderBanner from '../banner/banner';

const BlogComponent = ({ posts, deletePost, isAuthenticated }) => {
    const getBlogPreview = (text) => {
        console.log(text);
        return text.substring(0, 100);
        
    }

    return (
        <div>
            <HeaderBanner/>
            <div className="blog-home2 spacer">
                <Container>
                    <Row className="m-t-40 ">
                        {posts.length < 1 && <div key="empty">No posts yet!</div>}
                        {posts.map(post => (
                            <div key={post.key}>
                                <Row className="m-t-40">
                                    <Col md="12">
                                        <Card>
                                            <h2><Link to={`/post/${post.slug}`}>{post.title}</Link></h2>
                                            <h5 className="font-medium m-t-30"><a href="#" className="link">{ getBlogPreview(post.content.ops[0].insert) } ...</a></h5>
                                            <Link to={`/post/${post.slug}`} className="linking text-themecolor m-t-10">View Blog Post <i className="ti-arrow-right"></i></Link>
                                            {isAuthenticated && (
                                                <p>
                                                    <Link to={`/edit/${post.slug}`}>Edit</Link>
                                                    {" | "}
                                                    <button
                                                    className="linkLike"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        deletePost(post);
                                                    }}
                                                    >
                                                    Delete
                                                    </button>
                                                </p>
                                            )}
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default BlogComponent;

