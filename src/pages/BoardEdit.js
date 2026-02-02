import "../styles/BoardEdit.css"
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosRequest from "../api/Axios";

function BoardEdit() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [board, setBoard] = useState({
        title: "",
        content: ""
    });

    // 게시글 불러오기
    useEffect(() => {
        axiosRequest("get", `${id}`, {}, fn_callback);
    }, [id]);

    const fn_callback = (response) => {
        setBoard(response.data);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setBoard(prevBoard => ({
            ...prevBoard, [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosRequest("put", `${id}`, {data: board}, fn_callback2);
    };

    const fn_callback2 = (response) => {
        if (response.status === 200) {
            navigate(`/board/detail/${id}`);
        }
    }

    return (
        <div className="board-edit-container">
            <h1 className="board-edit-title">게시글 수정</h1>
            <form onSubmit={handleSubmit} className="board-edit-form">
                <div className="form-group">
                    <label htmlFor="title">제목</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={board.title}
                        onChange={handleChange}
                        placeholder="제목을 입력하세요"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">내용</label>
                    <textarea
                        id="content"
                        name="content"
                        value={board.content}
                        onChange={handleChange}
                        placeholder="내용을 입력하세요"
                        required
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="submit-button">수정 완료</button>
                    <Link to={`/board/detail/${id}`} className="cancel-button">취소</Link>
                </div>
            </form>
        </div>
    );
}

export default BoardEdit;