import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewNote() {
  const { id } = useParams();

  const allNotes = useSelector((state) => state.notes.notes);

  const note = allNotes.filter((p) => p._id === id)[0];

  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-start bg-black text-white p-6">
        <div className="w-full max-w-4xl bg-gray-950 border border-gray-700 rounded-lg p-2 md:p-6 space-y-2">
          {/* Title with Back Button */}
          <div className="flex items-center gap-4 border-b border-gray-500 pb-2 mb-2 flex-wrap">
            <button
              onClick={() => navigate(-1)}
              className="hover:bg-gray-700 px-3 py-1 rounded-md text-lg font-medium transition"
            >
              <i className="ri-arrow-left-line"></i>
            </button>
            <h1 className="font-medium text-xl md:text-2xl break-words">
              {note.title || "Untitled Note"}
            </h1>
          </div>

          {/* Created date */}
          <p className="text-sm text-gray-400">
            Created on: {new Date(note.createDate).toLocaleString()}
          </p>

          {/* Content */}
          <div className="whitespace-pre-wrap p-1 rounded-md bg-black text-base md:text-lg text-gray-200 leading-relaxed break-words">
            {note.content || "No content"}
          </div>
        </div>
      </div>
    </>
  );
}
