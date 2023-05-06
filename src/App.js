import { useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import Lifecycle from "./Lifecycle";

function App() {
    const [data, setData] = useState([]);
    const dataId = useRef(0); //0번 인덱스부터

    function onCreate(author, content, emotion) {
        const created_date = new Date().getTime();
        const newItem = {
            author,
            content,
            emotion,
            created_date,
            id: dataId.current,
        };
        dataId.current += 1;
        setData([newItem, ...data]);
    }

    function onRemove(targetId) {
        console.log(`${targetId}가 삭제되었습니다`);
        const newDiaryList = data.filter((item) => item.id !== targetId);
        console.log(newDiaryList);
        setData(newDiaryList);
    }

    function onEdit(targetId, newContent) {
        setData(
            data.map((item) =>
                item.id === targetId ? { ...item, content: newContent } : item
            )
        );
    }
    return (
        <div className="App">
            <Lifecycle></Lifecycle>
            <DiaryEditor onCreate={onCreate}></DiaryEditor>
            <DiaryList
                onDelete={onRemove}
                diaryList={data}
                onEdit={onEdit}
            ></DiaryList>
        </div>
    );
}

export default App;
