import React, {useEffect, useState} from 'react';
import "./chat.css";
import {Avatar} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {AttachFile, MoreVert, SearchOutlined} from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"
import {useParams} from 'react-router-dom';
import db from "./firebase";
import {useStateValue} from "./StateProvider";
import firebase from "firebase";
function Chat() {
    const [seed, setseed] = useState("");
    const [input, setInput] = useState("");
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    const {roomId} = useParams();
    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) => setRoomName(snapshot.data().name))
            db.collection('rooms').doc(roomId).collection("message").orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))

        }
    }, [roomId])
    useEffect(() => {
        setseed(Math.floor(Math.random() * 5000))
    }, [roomId])
    const sendMessage = (e) => {
        e.preventDefault()
db.collection('rooms').doc(roomId).collection('message').add({
    message:input,
    name:user.displayName,
    timestamp:firebase.firestore.FieldValue.serverTimestamp(),


})

        setInput("")

    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className={"chat__headerInfo"}>
                    <h3>{roomName}</h3>
                    <p>last seen at{''}
                        {new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className={"chat__headerRight"}>
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>

            <div className={"chat__body"}>
                {messages.map((messages) => (
                    <p className={`chatMessage ${messages.name === user.displayName && 'chat__reciever'}`}>
                        <span className={"Chat__Name"}>{messages.name}</span>
                        {messages.message}

                        <span className={"chat__timestamp"}> {new Date(messages.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
            </div>
            <div className={"chat__footer"}>
                <IconButton>

                    <InsertEmoticonIcon/>
                </IconButton>
                <form>
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                           placeholder="type a message"/>
                    <button type={"submit"} onClick={sendMessage}>Send a message</button>
                </form>
                <IconButton>

                    <MicIcon/>
                </IconButton>
            </div>
        </div>
    )
}

export default Chat;
