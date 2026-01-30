import { useEffect, useState } from "react";
import style from "./RecieveMessage.module.scss";
import "./RecieveMessage.css";
const RecieveMessage = () => {
  const [active, setActive] = useState(true);
  // useEffect(() => {
  //   setActive(false);
  //   // 2. 컴포넌트가 나타난 직후에 true로 변경
  //   // setActive(true);
  // }, []);
  return (
    <div>
      <div className={`recieve_message_wrapper ${active ? "active" : ""}`}>
        <button onClick={() => setActive(false)}>확인</button>
        <button onClick={() => setActive(false)}>취소</button>
      </div>
    </div>
  );
};

export default RecieveMessage;
