"use client";
import React, { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import NoteModal from "./NoteModal";
import NoteCard from "./NoteCard";
import { redirect, useRouter } from "next/navigation";
import { UserContext } from "../_context/UserContext";
import Loading from "../loading";
import { NoteContext } from "../_context/NoteContext";

const Home = () => {
  let { loading, notes, getNotesFunc } = useContext(NoteContext);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    getNotesFunc();
  }, []);

  return (
    <section className="w-full min-h-[100vh] pt-24 bg-[#fff]">
      <button
        onClick={() => setOpenModal(true)}
        className="bg-[#4070f4] hover:bg-[#386af4] hover:scale-105 transition-all duration-300 text-white text-lg w-10 h-10 rounded-full flex items-center justify-center fixed bottom-5 right-5"
      >
        <FaPlus />
      </button>
      <div className="container w-full h-full">
        {/* Note Modal */}
        <NoteModal openModal={openModal} setOpenModal={setOpenModal} />
        {/* Show loading while fetching notes */}
        {loading && <Loading />}
        {notes?.length > 0 && (
          <div className="row justify-center gap-5">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}
        {!loading && notes?.length == 0 && (
          <div
            className=" w-full text-center p-4 text-2xl text-gray-800 rounded-lg bg-gray-100"
            role="alert"
          >
            No notes available.
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
