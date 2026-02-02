import "../styles/BoardDetail.css"
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosRequest from "../api/Axios";

function BoardDetail() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [board, setBoard] = useState({
        title: "",
        content: ""
    });

    useEffect(() => {
        getBoard();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const getBoard = () => {
        axiosRequest("get", `${id}`, {}, fn_callback);
    };

    const fn_callback = (response) => {
        setBoard(response.data);
    }

    const handleDelete = () => {
        if (!window.confirm("정말 이 게시글을 삭제하시겠습니까?")) {
            return;
        }

        axiosRequest("delete", `${id}`, {}, fn_callback2);
    };

    const fn_callback2 = (response) => {
        if (response.status === 200) {
            navigate('/board');
        }
    }

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

export default BoardDetail;