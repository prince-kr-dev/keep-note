import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromNotes } from "../redux/KeepNoteSlice";
import toast from "react-hot-toast";

export default function Notes() {
  const notes = useSelector((state) => state.notes.notes);

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = notes.filter((note) => {
    if (!note || !note.title) return false;
    return note.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  function handleDelete(noteId) {
    dispatch(removeFromNotes(noteId));
  }
  const handleShare = (note) => {
    const shareText = `${note.title}\n\n${note.content}`;
    if (navigator.share) {
      navigator
        .share({
          title: note.title,
          text: shareText,
          url: window.location.href,
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      toast.info("Share not supported on this device.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-black text-white p-4">
        <div className="w-full max-w-4xl">
          {/* Search Bar */}
          <div className="bg-gray-900 px-4 py-3 rounded-md mb-6">
            <input
              type="text"
              placeholder="Search question here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-b border-gray-500 focus:outline-none py-2 px-2 text-lg placeholder-gray-400"
            />
          </div>

          {/* All Pastes Heading */}
          <h2 className="text-3xl font-bold mb-4">All Notes</h2>

          {/* Notes Container */}
          <div className="flex flex-col gap-4">
            {filteredData.length > 0 &&
              filteredData.map((note, index) => (
                <div
                  key={index}
                  className="bg-black border border-gray-700 rounded-lg p-5"
                >
                  <h3 className="text-2xl font-bold mb-2">{note.title}</h3>
                  <p className="mb-4 text-gray-300">
                    {note.content.slice(0, 100)}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <button>
                      <a href={`/?noteId=${note?._id}`}>
                        <i className="ri-edit-line hover:bg-gray-900 transition-all border px-2 py-1 rounded-md text-xl font-extralight"></i>
                      </a>
                    </button>

                    <button>
                      <a href={`notes/${note?._id}`}>
                        <i className="ri-eye-line hover:bg-gray-900 transition-all border px-2 py-1 rounded-md text-xl font-extralight"></i>
                      </a>
                    </button>

                    <button onClick={() => handleDelete(note?._id)}>
                      <i className="ri-delete-bin-6-line hover:bg-gray-900 transition-all border px-2 py-1 rounded-md text-xl font-extralight"></i>
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(note?.content);
                        toast.success("Copied to clipboard");
                      }}
                    >
                      <i className="ri-clipboard-line hover:bg-gray-900 transition-all border px-2 py-1 rounded-md text-xl font-extralight"></i>
                    </button>

                    <button onClick={handleShare}>
                      <i className="ri-share-line hover:bg-gray-900 transition-all border px-2 py-1 rounded-md text-xl font-extralight"></i>
                    </button>
                  </div>

                  <div className="flex items-center text-sm text-gray-400">
                    <span className="mr-2">
                      <i className="ri-calendar-line text-lg"></i>
                    </span>
                    <span>{new Date(note.createDate).toLocaleString()}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
