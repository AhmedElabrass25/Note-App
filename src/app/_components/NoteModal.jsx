"use client";
import React, { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import { NoteContext } from "../_context/NoteContext";

const NoteModal = ({ openModal, setOpenModal }) => {
  const { addNoteFunc, loading } = useContext(NoteContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const form = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      toast.error("Note title and content cannot be empty!", {
        position: "top-center",
      });
      return;
    }
    addNoteFunc(name, description);
    setName("");
    setDescription("");
  }

  return (
    <>
      {openModal && (
        <div
          id="crud-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center w-full bg-[rgba(0,0,0,0.6)]"
        >
          <div className="relative p-3 w-full max-w-md max-h-full bg-[#f6f6f6] shadow-lg">
            <div className="relative bg-white rounded-md shadow-sm dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Create New Note
                </h3>
                <button
                  onClick={() => setOpenModal(false)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="crud-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <form className="p-4 md:p-5" onSubmit={handleSubmit} ref={form}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-[16px] font-medium text-gray-900"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="block p-2 w-full text-[16px] text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:outline-none"
                      placeholder="Note Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-[16px] font-medium text-gray-900 dark:text-white"
                    >
                      Note Content
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      className="block p-2 w-full text-[16px] text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:outline-none"
                      placeholder="Write Note Content here"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                {/* Add Note Button */}
                <div className="w-full text-center mt-6">
                  <button
                    disabled={loading}
                    type="submit"
                    className="text-white inline-flex items-center bg-[#4070f4] hover:bg-[#3360db] font-bold rounded-sm text-[17px] px-5 py-2 text-center tracking-[1px] transition-all duration-300"
                  >
                    {loading ? (
                      <div role="status" className="w-full flex justify-center">
                        <svg
                          aria-hidden="true"
                          className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                    ) : (
                      "Add Note"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteModal;
