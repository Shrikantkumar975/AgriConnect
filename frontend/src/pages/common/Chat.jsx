import { useState, useEffect, useContext, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SocketContext } from '../../context/SocketContext';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

const Chat = () => {
    const { socket } = useContext(SocketContext);
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [typingUser, setTypingUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState(new Set());
    const typingTimeoutRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const initializeView = async () => {
            await fetchChats();
            if (location.state?.userId) {
                await initChat(location.state.userId);
            }
            if (location.state?.cropOfInterest) {
                const { name, price, unit } = location.state.cropOfInterest;
                setNewMessage(`Hi, I'm interested in your ${name} listed at ₹${price}/${unit}. Is it still available?`);
            }
        };
        initializeView();
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('receive_message', (message) => {
                if (currentChat && message.chatId === currentChat._id) {
                    setMessages((prev) => {
                        const isMyMessage = message.sender === user._id || message.sender._id === user._id;
                        if (isMyMessage) {
                            // Replace optimistic message
                            const newMessages = prev.filter(m => !(m.isOptimistic && m.content === message.content));
                            return [...newMessages, message];
                        }

                        return [...prev, message];
                    });
                    socket.emit('mark_read', { chatId: currentChat._id });
                    scrollToBottom();
                }
                fetchChats();
            });

            socket.on('typing', ({ chatId, userId }) => {
                if (currentChat && currentChat._id === chatId && userId !== user._id) {
                    setTypingUser(userId);
                }
            });

            socket.on('stop_typing', ({ chatId, userId }) => {
                if (currentChat && currentChat._id === chatId && userId !== user._id) {
                    setTypingUser(null);
                }
            });

            socket.on('user_status', ({ userId, status }) => {
                setOnlineUsers(prev => {
                    const newSet = new Set(prev);
                    if (status === 'online') newSet.add(userId);
                    else newSet.delete(userId);
                    return newSet;
                });
            });

            socket.on('online_users', (users) => {
                setOnlineUsers(new Set(users));
            });

            socket.on('notification', (data) => {
                if (data.type === 'new_message') {
                    fetchChats();
                }
            });

            socket.on('messages_read', ({ chatId }) => {
                if (currentChat && currentChat._id === chatId) {
                    setMessages(prev => prev.map(msg => ({ ...msg, isRead: true })));
                }
            });
        }
        return () => {
            if (socket) {
                socket.off('receive_message');
                socket.off('typing');
                socket.off('stop_typing');
                socket.off('user_status');
                socket.off('online_users');
                socket.off('notification');
                socket.off('messages_read');
            }
        };
    }, [socket, currentChat, user]);

    const getOtherParticipant = (chat) => {
        return chat.participants.find(p => p._id !== user._id) || {};
    };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const fetchChats = async () => {
        try {
            const res = await api.get('/chats');
            setChats(res.data.data);
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    };

    const initChat = async (userId) => {
        try {
            const res = await api.post('/chats', { userId });
            const chat = res.data.data;

            setChats(prev => {
                if (!prev.find(c => c._id === chat._id)) {
                    return [chat, ...prev];
                }
                return prev;
            });

            selectChat(chat);
        } catch (error) {
            console.error('Error initializing chat:', error);
        }
    };

    const deleteChat = async (chatId) => {
        try {
            await api.delete(`/chats/${chatId}`);
            setChats(prev => prev.filter(c => c._id !== chatId));
            if (currentChat && currentChat._id === chatId) {
                setCurrentChat(null);
            }
        } catch (error) {
            console.error('Error deleting chat:', error);
            alert('Failed to delete chat');
        }
    };

    const selectChat = async (chat) => {
        setCurrentChat(chat);
        setTypingUser(null); // Reset typing status
        if (socket) {
            socket.emit('join_chat', chat._id);
            socket.emit('mark_read', { chatId: chat._id }); // Mark as read when opening
        }
        try {
            const res = await api.get(`/chats/${chat._id}`);
            setMessages(res.data.data.messages || []);
            scrollToBottom();
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleTyping = (e) => {
        setNewMessage(e.target.value);
        if (!socket || !currentChat) return;

        if (!isTyping) {
            setIsTyping(true);
            socket.emit('typing', { chatId: currentChat._id, receiverId: getOtherParticipant(currentChat)._id });
        }

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            socket.emit('stop_typing', { chatId: currentChat._id, receiverId: getOtherParticipant(currentChat)._id });
        }, 2000);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentChat || !socket) return;

        const receiver = getOtherParticipant(currentChat); // Helper function usage
        const content = newMessage;

        // Optimistic Update
        const tempId = Date.now().toString(); // Temporary ID
        const optimisticMessage = {
            _id: tempId,
            sender: user, // Full user object so it renders correctly
            content: content,
            timestamp: new Date().toISOString(),
            isRead: false,
            chatId: currentChat._id,
            isOptimistic: true
        };

        setMessages(prev => [...prev, optimisticMessage]);
        setNewMessage('');
        scrollToBottom();

        socket.emit('send_message', {
            chatId: currentChat._id,
            content: content,
            receiverId: receiver._id
        });
    };

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };



    return (
        <div className="flex h-[calc(100vh-80px)] bg-gray-100 dark:bg-gray-900 antialiased transition-colors duration-300">
            {/* Sidebar - Chat List */}
            <div className="w-full md:w-1/3 lg:w-1/4 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-300">
                {/* Sidebar Header */}
                <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Chats</h2>
                    <button onClick={() => navigate('/')} className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium">
                        Back to Market
                    </button>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto">
                    {chats.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                            <p>No conversations yet.</p>
                        </div>
                    ) : (
                        chats.map((chat) => {
                            const otherUser = getOtherParticipant(chat);
                            const isActive = currentChat?._id === chat._id;
                            return (
                                <div
                                    key={chat._id}
                                    onClick={() => selectChat(chat)}
                                    className={`flex items-center p-4 cursor-pointer border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${isActive ? 'bg-green-50 dark:bg-green-900/20 hover:bg-green-50 dark:hover:bg-green-900/30' : ''
                                        }`}
                                >
                                    <div className="relative">
                                        <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center overflow-hidden">
                                            {otherUser.profilePicture && otherUser.profilePicture !== 'no-photo.jpg' ? (
                                                <img src={otherUser.profilePicture} alt={otherUser.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <span className="text-lg font-bold text-gray-600 dark:text-gray-300">{otherUser.name?.charAt(0).toUpperCase()}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="ml-4 flex-1 min-w-0 group relative">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{otherUser.name}</h3>
                                            <div className="flex items-center space-x-2">
                                                {chat.lastMessage && (
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {new Date(chat.lastMessage.timestamp || chat.lastMessage).toLocaleDateString()}
                                                    </span>
                                                )}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (window.confirm('Are you sure you want to delete this chat?')) {
                                                            deleteChat(chat._id);
                                                        }
                                                    }}
                                                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-all font-bold"
                                                    title="Delete Chat"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mt-1">
                                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate flex-1">
                                                {chat.lastMessage?.content ||
                                                    (chat.messages && chat.messages.length > 0
                                                        ? chat.messages[chat.messages.length - 1].content
                                                        : 'Start a conversation')}
                                            </p>
                                            {onlineUsers.has(otherUser._id) && (
                                                <span className="h-2 w-2 bg-green-500 rounded-full ml-2" title="Online"></span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Chat Window */}
            <div className={`flex-1 flex flex-col bg-[#e5ded8] dark:bg-gray-900 ${!currentChat ? 'hidden md:flex' : ''} transition-colors duration-300`}>
                {currentChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center shadow-sm z-10 transition-colors duration-300">
                            <button
                                onClick={() => setCurrentChat(null)}
                                className="md:hidden mr-3 text-gray-600 dark:text-gray-300"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center overflow-hidden">
                                {getOtherParticipant(currentChat).profilePicture && getOtherParticipant(currentChat).profilePicture !== 'no-photo.jpg' ? (
                                    <img src={getOtherParticipant(currentChat).profilePicture} alt={getOtherParticipant(currentChat).name} className="h-full w-full object-cover" />
                                ) : (
                                    <span className="text-sm font-bold text-gray-600 dark:text-gray-300">{getOtherParticipant(currentChat).name?.charAt(0).toUpperCase()}</span>
                                )}
                            </div>
                            <div className="ml-3">
                                <h2 className="text-md font-semibold text-gray-800 dark:text-white">
                                    {getOtherParticipant(currentChat).name}
                                </h2>
                                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                    {onlineUsers.has(getOtherParticipant(currentChat)._id) ? (
                                        <>
                                            <span className="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
                                            Online
                                        </>
                                    ) : (
                                        getOtherParticipant(currentChat).role === 'farmer' ? 'Farmer' : 'Buyer'
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] dark:bg-[url('')] dark:bg-gray-900 bg-repeat bg-center">
                            {messages.map((msg, index) => {
                                const isMe = msg.sender._id === user._id || msg.sender === user._id;
                                return (
                                    <div
                                        key={index}
                                        className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[75%] md:max-w-[60%] px-4 py-2 rounded-lg shadow-sm relative ${isMe
                                                ? 'bg-[#dcf8c6] dark:bg-green-700 text-gray-800 dark:text-white rounded-tr-none'
                                                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-tl-none'
                                                }`}
                                        >
                                            <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                                            <div className="flex items-center justify-end mt-1 space-x-1">
                                                <span className={`text-[10px] ${isMe ? 'text-gray-500 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>
                                                    {formatTime(msg.timestamp)}
                                                </span>
                                                {isMe && (
                                                    <span className={`${msg.isRead ? 'text-blue-500 dark:text-blue-300' : 'text-gray-400 dark:text-gray-500'}`}>
                                                        {/* Double tick SVG */}
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                                                            <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                                                            <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
                                                        </svg>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                            {typingUser && (
                                <div className="flex justify-start text-xs text-gray-400 dark:text-gray-500 ml-4 italic mb-2">
                                    {getOtherParticipant(currentChat).name} is typing...
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
                            <form onSubmit={sendMessage} className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={handleTyping}
                                    placeholder="Type a message"
                                    className="flex-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                />
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim()}
                                    className="bg-green-600 text-white rounded-full p-2 hover:bg-green-700 dark:hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg className="h-6 w-6 transform rotate-90 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 border-b-8 border-green-500">
                        <div className="text-center">
                            <h1 className="text-3xl font-light text-gray-600 dark:text-gray-300 mb-4">AgriConnect Chat</h1>
                            <p className="text-gray-500 dark:text-gray-400">Select a chat to start messaging.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
