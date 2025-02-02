import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';

export default function Research() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const fetchPosts = async (page) => {
        try {
            const response = await axios.get(`/api/posts/research?page=${page - 1}`);
            setPosts(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('데이터를 불러오는데 실패했습니다:', error);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    let paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(
            <Pagination.Item 
                key={i} 
                active={i === currentPage}
                onClick={() => handlePageClick(i)}
            >
                {i}
            </Pagination.Item>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">연구 자료</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>
                                <Link to={`/research/${post.id}`}>
                                    {post.title}
                                </Link>
                            </td>
                            <td>{post.author}</td>
                            <td>{post.createdDate}</td>
                            <td>{post.views}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="d-flex justify-content-center mt-4">
                <Pagination>{paginationItems}</Pagination>
            </div>
        </div>
    );
}