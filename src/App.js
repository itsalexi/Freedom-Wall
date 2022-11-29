import { msgs } from './components/messages';
import Draggable from 'react-draggable';
import { useEffect, useState } from 'react';
import { db } from './firebase';
import {
    collection,
    query,
    doc,
    serverTimestamp,
    setDoc,
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function App() {
    const [viewportSize, setViewportSize] = useState({});
    const [messages, setMessages] = useState([]);

    const postsRef = collection(db, 'posts');
    const q = query(postsRef);

    const [posts] = useCollectionData(q);

    console.log(posts);

    useEffect(() => {
        const height = window.innerHeight - 200;
        const width = window.innerWidth - 200;
        setViewportSize({ height, width });
    }, []);

    const handlePost = async (e) => {
        e.preventDefault();
        const newPostRef = doc(postsRef);
        const id = newPostRef.id;
        const postData = {
            id,
            text: e.target[0].value,
            color: e.target[1].value,
            createdAt: serverTimestamp(),
        };
        console.log(postData);

        await setDoc(newPostRef, postData);
    };

    const getRandomPosition = () => {
        const { height, width } = viewportSize;

        const randomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        return {
            x: Math.abs(randomInt(0, width)),
            y: Math.abs(randomInt(0, height)),
        };
    };

    useEffect(() => {
        let positionedMessages = [];

        !isNaN(getRandomPosition().x)
            ? posts?.forEach((msg) => {
                  positionedMessages.push({
                      msg,
                      position: getRandomPosition(),
                  });
              })
            : console.log('window not loaded ');
        setMessages(positionedMessages);
    }, [viewportSize, posts]);

    return (
        <div className="app">
            <div className="freedom-top">
                <h1 className="freedom-wall-title">FREEDOM WALL</h1>
                <form className="submit-post" onSubmit={handlePost}>
                    <input
                        type="text"
                        name="text"
                        className="freedom-form-input"
                        placeholder="Write about anything!"
                    />
                    <select name="color" className="freedom-form-input">
                        <option value="lightblue">Light Blue</option>
                        <option value="limegreen">Light Green</option>
                        <option value="pink">Pink</option>
                        <option value="yellow" selected>
                            Yellow
                        </option>
                    </select>
                </form>
            </div>
            <div className="freedom-wall">
                <div className="posts">
                    {messages.map(({ msg, position }) => {
                        return (
                            <Draggable defaultPosition={position} key={msg.id}>
                                <div
                                    className="post"
                                    style={{ backgroundColor: msg.color }}
                                >
                                    <div className="post-text">{msg.text}</div>
                                </div>
                            </Draggable>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
