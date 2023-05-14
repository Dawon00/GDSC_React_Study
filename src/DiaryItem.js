import React, { useEffect, useRef, useState } from "react";

function DiaryItem({
    author,
    content,
    created_date,
    emotion,
    id,
    onRemove,
    onEdit,
}) {
    useEffect(() => {
        console.log(`${id}번째 아이템 렌더`);
    });
    function handleRemove() {
        console.log(id);
        if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
            onRemove(id);
        }
    }
    const [isEdit, setIsEdit] = useState(false);
    function toggleIsEdit() {
        setIsEdit(!isEdit);
    }
    const localContentInput = useRef();

    function handleQuitEdit() {
        setIsEdit(false);
        setLocalContent(content);
    }

    function handleEdit() {
        if (localContent.length < 5) {
            localContentInput.current.focus();
            return;
        }
        if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
            onEdit(id, localContent);
            toggleIsEdit();
        }
    }
    const [localContent, setLocalContent] = useState(content);
    return (
        <div className="DiaryItem">
            <div className="info">
                <span>
                    작성자 : {author} | 감정점수 : {emotion}{" "}
                </span>
                <br></br>
                <span className="date">
                    작성시간(ms) : {new Date(created_date).toLocaleString()}
                </span>
            </div>
            <div className="content">
                일기 :
                {isEdit ? (
                    <>
                        <textarea
                            ref={localContentInput}
                            value={localContent}
                            onChange={(e) => {
                                setLocalContent(e.target.value);
                            }}
                        ></textarea>
                    </>
                ) : (
                    <>{content}</>
                )}
            </div>
            {isEdit ? (
                <>
                    {" "}
                    <button onClick={handleQuitEdit}>수정 취소</button>
                    <button onClick={handleEdit}>수정 완료</button>
                </>
            ) : (
                <>
                    {" "}
                    <button onClick={handleRemove}>삭제하기</button>
                    <button onClick={toggleIsEdit}>수정하기</button>
                </>
            )}
        </div>
    );
}

export default React.memo(DiaryItem);
