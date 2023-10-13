import React, { useState } from "react";
import axios from "axios";

const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: "", body: "" });

    const fetchPosts = async () => {
        try {
            const response = await axios.get("https://dummyjson.com/posts");
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const createPost = async () => {
        try {
            await axios.post("https://dummyjson.com/posts", newPost);
            setPosts([...posts, newPost]);
            setNewPost({ title: "", body: "" });
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost({ ...newPost, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost();
    };

    return (
        <div>
            <h2>Posts</h2>
            <button onClick={fetchPosts}>Load Posts</button>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
            <h3>Create a New Post</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={newPost.title}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Body:
                    <input
                        type="text"
                        name="body"
                        value={newPost.body}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default PostsPage;
