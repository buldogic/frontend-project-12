import { useContext } from 'react';
import { SocketContext } from '../context/index.js';

const useChatApi = () => useContext(SocketContext);

export default useChatApi;
