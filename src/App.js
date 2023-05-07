import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

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

    // 작성 완료 눌렀을 때 데이터 추가하는 함수
    const onCreate = useCallback((author, content, emotion) => {
        const created_date = new Date().getTime();
        const newItem = {
            author,
            content,
            emotion,
            created_date,
            id: dataId.current,
        };
        dataId.current += 1;
        setData((data) => [newItem, ...data]); // 항상 최신의 state 를 참조할 수 있도록 도와주는 함수형 업데이트
    }, []); // mount 되는 시점에 한번만 생성되고, 그 다음부터는 함수를 재사용할 수 있도록 함.

    const onRemove = (targetId) => {
        console.log(`${targetId}가 삭제되었습니다`);
        const newDiaryList = data.filter((item) => item.id !== targetId);
        console.log(newDiaryList);
        setData(newDiaryList);
    };

    function onEdit(targetId, newContent) {
        setData(
            data.map((item) =>
                item.id === targetId ? { ...item, content: newContent } : item
            )
        );
    }

    const getDiaryAnalysis = useMemo(
        // useMemo 는 값을 리턴함.
        // 복잡한 연산이 필요이상으로 여러번 일어나는 것을 방지
        () => {
            console.log("일기 분석 시작");
            const goodCount = data.filter((item) => item.emotion >= 3).length; // 기분 좋은 일기의 개수
            const badCount = data.length - goodCount;
            const goodRatio = (goodCount / data.length) * 100;
            return { goodCount, badCount, goodRatio };
        },
        [data.length] // data.length 가 변화할때만 callback 함수가 다시 실행됨.
    );

    const { goodCount, badCount, goodRatio } = getDiaryAnalysis; // useMemo 는 값을 리턴함.
    return (
        <div className="App">
            <DiaryEditor onCreate={onCreate}></DiaryEditor>
            <div>전체 일기 : {data.length}</div>
            <div>기분 좋은 일기 개수 : {goodCount}</div>
            <div>기분 나쁜 일기 개수 : {badCount}</div>
            <div>기분 좋은 일기 비율 : {goodRatio}</div>
            <DiaryList
                onRemove={onRemove}
                diaryList={data}
                onEdit={onEdit}
            ></DiaryList>
        </div>
    );
}

export default App;
