"use client";
import axios from "axios";
import toast from "react-hot-toast";

const { createContext, useState, useEffect } = require("react");

export const NoteContext = createContext(0);
function NoteContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  // <<<<<<<<<<<<<<<<<<<
  // Add Note Func
  // >>>>>>>>>>>>>>>>>>
  async function addNoteFunc(name, description) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/notes",
        { title: name, content: description },
        { headers: { token: localStorage.getItem("token") } }
      );
      getNotesFunc();
      toast.success("The note was added successfully!", {
        position: "top-center",
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to add note. Please try again.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }
  // <<<<<<<<<<<<<<<<<<<
  // Get Notes Func
  // >>>>>>>>>>>>>>>>>>
  async function getNotesFunc() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://note-sigma-black.vercel.app/api/v1/notes",
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      setNotes(data?.notes);
    } catch (error) {
      if (error?.response?.data?.msg === "not notes found") {
        setNotes([]); // If no notes exist, set empty array
      } else {
        console.log("Error fetching notes:", error);
      }
    } finally {
      setLoading(false);
    }
  }
  //<<<<<<<<<<<<<<<<
  // Delete Note Func
  //  >>>>>>>>>>>>>
  async function deleteNoteFunc(noteId) {
    try {
      setLoading(true);
      let { data } = await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      getNotesFunc();
      toast.success("The Note is deleted successsfully !", {
        position: "top-center",
        style: {
          zIndex: "999",
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  //<<<<<<<<<<<<<<<<
  // Update Note Func
  //  >>>>>>>>>>>>>
  async function updateNoteFunc(id, title, content, setUpdateNote) {
    try {
      setLoading(true);
      let { data } = await axios.put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
        { title, content },
        { headers: { token: localStorage.getItem("token") } }
      );
      toast.success("The Note is updated successfully!", {
        position: "top-center",
      });
      getNotesFunc();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setUpdateNote(false);
    }
  }
  useEffect(() => {
    getNotesFunc();
  }, []);
  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        getNotesFunc,
        deleteNoteFunc,
        updateNoteFunc,
        addNoteFunc,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}
export default NoteContextProvider;
