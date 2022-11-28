import { trpc } from "../utils/trpc";

const ChirpList = () => {
  const utils = trpc.useContext();
  const { isLoading, data: chirps, error } = trpc.chirp.list.useQuery();
  const deleteMutation = trpc.chirp.delete.useMutation({
    onSuccess: () => {
      utils.chirp.invalidate();
    },
  });
  if (error) return <div>error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  console.log("chirps:", chirps);
  return (
    <div className="mt-4">
      <ul className="flex flex-col gap-2">
        {chirps.map((chirp) => (
          <li key={chirp.id}>
            <div className="relative w-full rounded-lg bg-white px-8 py-4 text-black">
              <div className="flex items-baseline gap-2">
                <span className="font-bold">{chirp.author.name}</span>
                <span className="text-xs">
                  {new Date(chirp.createdAt).toLocaleString("da-DK")}
                </span>
              </div>
              <p>{chirp.text}</p>
              <button
                onClick={() => {
                  deleteMutation.mutate(chirp.id);
                }}
                className="absolute top-2 right-2 text-xs text-red-500"
              >
                {/* svg that's a cross / x button */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChirpList;
