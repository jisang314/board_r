import "../styles/BoardList.css"
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

function BoardList() {
    const [boardList, setBoardList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const boardListPerPage = 10;

    useEffect(() => {
        const getBoardList = () => {
            axios.get(`${process.env.REACT_APP_API_URL}/board`, {
                params: {
                    page: currentPage - 1,
                    size: boardListPerPage
                }
            })
                .then(response => {
                    console.log('게시글 목록 조회 성공: ', response.data);
                    setBoardList(response.data.boardList);
                    setTotalPages(Math.ceil(response.data.totalCount / 10));
                })
                .catch(error => {
                    console.error('게시글 목록 조회 실패: ', error);
                });
        };
        getBoardList();
    }, [currentPage]);

    // 전체 페이지 번호 배열 생성
    const pageNumbers = Array.from({length: totalPages}, (_, index) => index + 1);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="board-list-container">
            <h1 className="board-list-title">게시글 목록</h1>
            <div className="board-list">
                {
                    boardList.map(board => (
                        <div key={board.id} className="board-card">
                            <h2 className="board-title">
                                <Link to={`/board/detail/${board.id}`}>{board.title}</Link>
                            </h2>
                            <p className="board-content">{board.content}</p>
                        </div>)
                    )
                }
            </div>

            {/* 페이지 번호 네비게이션 */}
            <div className="pagination">
                {
                    pageNumbers.map(number => (
                        <button key={number}
                                className={`page-btn ${number === currentPage ? 'active' : ''}`}
                                onClick={() => handlePageChange(number)}
                        >
                            {number}
                        </button>)
                    )
                }
            </div>

            <Link to="/board/create" className="create-link">게시글 작성하기</Link>
        </div>
    );
}

export default BoardList;