import { useState } from "react";
import { trpc } from "../utils/trpc";

const AddChirp = () => {
  const utils = trpc.useContext();
  const [text, setText] = useState("");
  const addMutation = trpc.chirp.add.useMutation({
    onSuccess: () => {
      utils.chirp.invalidate();
      setText("");
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addMutation.mutate({ text });
      }}
      className=""
    >
      <textarea
        className="w-full rounded-lg bg-white px-2 py-2 text-3xl text-gray-800"
        onChange={(event) => setText(event.target.value)}
        value={text}
      />
      <button className=" block rounded-lg bg-red-400 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 px-4 text-white">
        Chirp
      </button>
    </form>
  );
};

export default AddChirp;
