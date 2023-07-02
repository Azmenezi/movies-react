import { useGetWatchlist } from "../../api/watchlist";
import { FakeCard } from "../Loading/FakeCard";
import WatchlistCard from "./WatchlistCard";

function Watchlist() {
  const { data: watchlistData, error, isLoading, isError } = useGetWatchlist();

  const watchlist = watchlistData?.movies;

  if (isError || watchlist?.length === 0) {
    return (
      <div className="flex justify-center h-[90vh]">
        <div className="flex items-center font-bold text-lg">
          {error?.response.data.error.message || "your watchlist is empty!"}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col space-y-4">
      {isLoading ? (
        <>
          <div className="grid grid-cols-3 gap-2 m-3">
            <FakeCard />
          </div>
        </>
      ) : (
        <>
          <WatchlistCard watchlist={watchlist} error={error} />
        </>
      )}
    </div>
  );
}

export default Watchlist;
