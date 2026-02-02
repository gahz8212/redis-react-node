import { useEffect, useState, useContext } from "react";
import style from "./RecieveMessage.module.scss";
import "./RecieveMessage.css";
import instance from "../../api/instance";
import { useMessageStore } from "../../store/messageStore";
import { TripList } from "../../contexts/tripList";

const RecieveMessage = () => {
  const [active, setActive] = useState(true);
  const { nextMessage, clearMessage, messages, latestMessage } =
    useMessageStore();

  const { updateTripList } = useContext(TripList);

  useEffect(() => {
    console.log("messages", messages);
    if (latestMessage) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [messages]);

  if (!latestMessage) return null;

  const confirm = async () => {
    try {
      const res = await instance.post("/companion/group", {
        tripId: latestMessage.tripId,
      });
      if (res.data.message === "ok") {
        updateTripList(true);
        nextMessage();
      } else {
        alert(res.data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const abort = async () => {
    nextMessage();
  };
  return (
    <div>
      <div className={`recieve_message_wrapper ${active ? "active" : ""}`}>
        <div className={style.header}>
          <b>메세지</b>
        </div>
        <div className={style.body}>
          {messages.map((message) => (
            <div className={style.contents}>
              <div>
                <b>{message.from}</b>님이
              </div>
              <span>
                <b>{message.location}</b>사진을 보냈습니다.
              </span>
            </div>
          ))}
        </div>
        <div className={style.buttons}>
          <button onClick={confirm}>확인</button>
          <button onClick={abort}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default RecieveMessage;
