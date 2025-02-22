import React, { useContext, useState } from "react";
import { NoteContext } from "../_context/NoteContext";

const UpdateCard = ({ note, setUpdateNote }) => {
  const { updateNoteFunc, loading } = useContext(NoteContext);
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  function handleUpdate(e) {
    e.preventDefault();
    updateNoteFunc(note?._id, title, content, setUpdateNote);
  }

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center w-full bg-[rgba(0,0,0,0.6)]">
      <div className="relative p-4 w-full max-w-md max-h-full bg-[#f6f6f6] shadow-lg">
        <div className="relative bg-white rounded-md shadow-sm">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-black/80">Update Note</h3>
            <button
              onClick={() => setUpdateNote(false)}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-500 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            >
              ✖
            </button>
          </div>

          {/* Modal body */}
          <form className="p-4" onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block mb-2 text-[16px] font-medium text-gray-900">
                Title
              </label>
              <input
                type="text"
                className="block p-2 w-full text-[16px] text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:outline-none"
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-[16px] font-medium text-gray-900">
                Content
              </label>
              <textarea
                className="block p-2 w-full text-[16px] text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:outline-none"
                rows="4"
                placeholder="Write note content here"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            {/* Update Note Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all"
            >
              {loading ? (
                <div role="status" className="w-full flex justify-center">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Update Note"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCard;
