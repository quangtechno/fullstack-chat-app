
import { useEffect } from "react";
import ChatContainer from "../component/ChatContainer.jsx";
import Sidebar from "../component/Sidebar.jsx";
import NoChatSelected from "../component/NoChatSelected";
import { useChatStore } from "../store/useChatStore";
const HomePage = () => {
  const { users, selectedUser, getUsers } = useChatStore();
  const getUsersTemp = async () => {
    await getUsers(); // getUsers return data
  };
  useEffect(() => {
    getUsersTemp();
  }, []);


  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
