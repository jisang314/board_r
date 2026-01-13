import "../styles/BoardCreate.css"
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function BoardCreate() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });

    const onChangeFormData = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    };

    const onClickSubmit = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/board`, formData)
            .then(response => {
                console.log('게시글 등록 성공: ', response.data);
                navigate('/board');
            })
            .catch(error => {
                console.error('게시글 등록 실패: ', error);
            });
    };

    return (
        <div className="board-create-container">
            <h1 className="board-create-title">게시글 작성</h1>
            <form className="board-create-form">
                <div className="form-group">
                    <label htmlFor="title">제목</label>
                    <input id="title" name="title" type="text" placeholder="제목을 입력하세요" onChange={onChangeFormData}/>
                </div>
                <div className="form-group">
                    <label htmlFor="content">내용</label>
                    <textarea id="content" name="content" placeholder="내용을 입력하세요" onChange={onChangeFormData}/>
                </div>
                <div className="button-group">
                    <button type="button" className="submit-button" onClick={onClickSubmit}>등록</button>
                    <Link to={`/board`} className="cancel-button">취소</Link>
                </div>
            </form>
        </div>
    );
}

export default BoardCreate;