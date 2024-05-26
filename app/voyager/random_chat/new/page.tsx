import Sidebar from "@/app/components/random_chat_components/Sidebar";
import CategoriesAndGenderDetailsPopup from "@/app/components/random_chat_components/CategoriesAndGenderDetailsPopup";

const NewRandomChat = () => {
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <div className="flex flex-col justify-between h-[100vh] w-full ml-[25%] bg-[#35374B]">
        <div className="p-2 m-5 h-full overflow-auto">
          <CategoriesAndGenderDetailsPopup />
        </div>
        <div className="w-full ">
          <div className="w-[95%] mx-auto mb-4">
            <input
              type="text"
              id="default-input"
              className={`text-gray-50 text-sm rounded-lg block p-2.5 w-full bg-[#61677A] outline-none`}
              placeholder="Enter text here..."
              disabled={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRandomChat;
