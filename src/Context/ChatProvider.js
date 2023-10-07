import React, { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [primaryColor,setPrimaryColor] = useState('#000000');
  const [primaryColor2,setPrimaryColor2] = useState('#211572');
  const [secondaryColor,setSecondaryColor] = useState('#93DEFF');
  const [secondaryColor2,setSecondaryColor2] = useState('#606470');


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        primaryColor,
        setPrimaryColor,
        primaryColor2,
        setPrimaryColor2,
        secondaryColor,
        setSecondaryColor,
        secondaryColor2,
        setSecondaryColor2,
        setNotification,
        chats,
        setChats,

      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
