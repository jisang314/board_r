import "../styles/BoardDetail.css"
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function PostDetail() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [board, setBoard] = useState({
        title: "",
        content: ""
    });

    useEffect(() => {
        const getBoard = () => {
            axios.get(`${process.env.REACT_APP_API_URL}/board/${id}`)
                .then(response => {
                    console.log('게시글 조회 성공: ', response.data);
                    setBoard(response.data);
                })
                .catch(error => {
                    console.error('게시글 조회 실패: ', error);
                });
        };
        getBoard();
    }, []);

    const handleDelete = () => {
        if (!window.confirm("정말 이 게시글을 삭제하시겠습니까?")) {
            return;
        }

        axios.delete(`${process.env.REACT_APP_API_URL}/board/${id}`)
            .then(response => {
                console.log('게시글 삭제 성공: ', response.data);
                alert('게시글이 삭제되었습니다.');
                navigate('/board');
            })
            .catch(error => {
                console.error('게시글 삭제 실패: ', error);
                alert('게시글 삭제에 실패했습니다.');
            });
    };

    return (
        <div className="board-detail-container">
            <h1 className="board-detail-title">{board.title}</h1>
            <p className="board-detail-content">{board.content}</p>
            <div className="button-group">
                <Link to={`/board/edit/${id}`} className="edit-button">
                    수정하기
                </Link>
                <button onClick={handleDelete} className="delete-button">
                    삭제하기
                </button>
            </div>
            <Link to="/board" className="back-link">목록으로 돌아가기</Link>
        </div>
    );
}

export default PostDetail;