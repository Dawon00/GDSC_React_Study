import { useEffect, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

// https://jsonplaceholder.typicode.com/comments

function App() {
    const [data, setData] = useState([]);
    const dataId = useRef(0); //0번 인덱스부터
    const getData = async () => {
        const res = await fetch(
            "https://jsonplaceholder.typicode.com/comments"
        ).then((res) => res.json());
        const initData = res.slice(0, 20).map((item) => {
            return {
                author: item.email,
                content: item.body,
                emotion: Math.floor(Math.random() * 5) + 1, // 0~4 사이의 난수
                created_date: new Date().getTime(),
                id: dataId.current++,
            };
        });
        setData(initData);
    };

    useEffect(() => {
        getData(); // mount 될 때
    }, []);

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
