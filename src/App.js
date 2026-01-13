import './App.css';
import{BrowserRouter as Router, Routes, Route} from "react-router-dom";
import BoardList from "./pages/BoardList";
import BoardCreate from "./pages/BoardCreate";
import BoardDetail from "./pages/BoardDetail";
import BoardEdit from "./pages/BoardEdit";

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path={"/board"} element={<BoardList/>}/>
            <Route path={"/board/create"} element={<BoardCreate/>}/>
            <Route path={"/board/detail/:id"} element={<BoardDetail/>}/>
            <Route path={"/board/edit/:id"} element={<BoardEdit/>}/>
          </Routes>
        </div>
      </Router>

  );
}

export default App;
