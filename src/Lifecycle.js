import React, { useEffect, useState } from "react";

function UnmountTest() {
    useEffect(() => {
        console.log("mount!");

        return () => {
            // unmount 시점에 실행됨
            console.log("unmount!");
        };
    }, []);
    return <div>Unmount Testing Component</div>;
}

function Lifecycle() {
    const [isVisible, setIsVisible] = useState();
    function toggle() {
        setIsVisible(!isVisible);
    }
    return (
        <div style={{ padding: 20 }}>
            <button onClick={toggle}>ON/OFF</button>
            {isVisible && <UnmountTest></UnmountTest>}
        </div>
    );
}

export default Lifecycle;
