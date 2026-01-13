import "../styles/BoardEdit.css"
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function PostEdit() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [board, setBoard] = useState({
        title: "",
        content: ""
    });

    // 게시글 불러오기
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/board/${id}`)
            .then(response => {
                console.log('게시글 가져오기 성공:', response.data);
                setBoard(response.data);
            })
            .catch(error => {
                console.error('게시글 가져오기 실패:', error);
                alert("게시글을 불러오는 데 실패했습니다.");
            });
    }, [id]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setBoard(prevBoard => ({
            ...prevBoard, [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`${process.env.REACT_APP_API_URL}/board/${id}`, board)
            .then(response => {
                console.log('게시글 수정 성공: ', response.data);
                alert('게시글이 수정되었습니다.');
                navigate(`/board/detail/${id}`);
            })
            .catch(error => {
                console.error('게시글 수정 실패: ', error);
                alert('게시글 수정에 실패했습니다.');
            });
    };

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

export default PostEdit;