import React from "react";
import DiaryItem from "./DiaryItem";

function DiaryList({ diaryList, onRemove, onEdit }) {
    // console.log(diaryList);
    return (
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList.map((item) => (
                    <DiaryItem
                        key={item.id}
                        {...item}
                        onDelete={onRemove}
                        onEdit={onEdit}
                    ></DiaryItem> // item 의 모든 속성을 전달함
                ))}
            </div>
        </div>
    );
}

DiaryList.defaultProps = {
    diaryList: [],
};

export default DiaryList;
