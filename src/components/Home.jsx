import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToNotes, updateToNotes } from "../redux/KeepNoteSlice";

export default function Home() {
  const [title, setTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const noteId = searchParams.get("noteId");
  const allNotes = useSelector((state) => state.notes.notes);

  const dispatch = useDispatch();

  function createNote() {
    const notes = {
      title: title,
      content: noteContent,
      _id: noteId || Date.now().toString(36),
      createDate: new Date().toISOString(),
    };

    if (noteId) {
      // Updating note
      dispatch(updateToNotes(notes));
    } else {
      // Create note
      dispatch(addToNotes(notes));
    }

    setTitle("");
    setNoteContent("");
    setSearchParams("");
  }

  useEffect(() => {
  if (noteId && allNotes.length > 0) {
    const note = allNotes.find((p) => p._id === noteId);
    if (note) {
      setTitle(note.title);
      setNoteContent(note.content);
    } else {
      setTitle("");
      setNoteContent("");
    }
  }
}, [noteId, allNotes]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-black text-white p-6">
      {/* Title & Button Container */}
      <div className="w-full max-w-4xl bg-gray-900 border border-gray-700 rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <input
            type="text"
            placeholder="Enter title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="font-medium text-xl flex-grow bg-transparent border-b border-gray-500 focus:bg-gray-700 outline-0 rounded-lg py-2 px-3 placeholder-gray-400"
          />
          <button
            onClick={createNote}
            className="bg-violet-700 hover:bg-violet-800 px-6 py-2 rounded-md text-white font-medium transition"
          >
            {noteId ? "Update" : "Create"}
          </button>
        </div>
      </div>

      {/* Textarea */}
      <div className="w-full max-w-4xl">
        <textarea
          placeholder="Enter content here..."
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          className="w-full h-64 md:h-80 bg-gray-900 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none resize-none"
        />
      </div>
    </div>
  );
}
