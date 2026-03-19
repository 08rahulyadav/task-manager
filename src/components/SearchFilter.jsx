import { Search, X } from "lucide-react";

export default function SearchFilter({ search, setSearch, filter, setFilter }) {

  const filters = ["all", "completed", "pending"];

  return (

    <div className="mb-6">

      {/* Search Box */}
      <div className="relative mb-4">

        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border pl-10 pr-10 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}

      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">

        {filters.map((item) => (

          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-4 py-1 rounded-full text-sm border transition
              
              ${
                filter === item
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }

            `}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>

        ))}

      </div>

    </div>

  );

}