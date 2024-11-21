import { useRouter } from "next/navigation";
import React, { ChangeEvent, FC } from "react";

type Props = {
  roomTypeFilter: string;
  searchQuery: string;
  adults?: number;
  children?: number;
  setRoomTypeFilter: (value: string) => void;
  setSearchQuery: (value: string) => void;
  setAdults?: (value: number) => void;
  setChildren?: (value: number) => void;
};

const Search: FC<Props> = ({
  roomTypeFilter,
  searchQuery,
  adults,
  children,
  setRoomTypeFilter,
  setSearchQuery,
  setAdults,
  setChildren,
}) => {
  const router = useRouter();
  const handleRoomTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRoomTypeFilter(e.target.value);
  };
  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleAdultChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAdults?.(Number(e.target.value));
  };
  const handleChildrenChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChildren?.(Number(e.target.value));
  };
  const handleFilterClick = () => {
    router.push(
      `/rooms?roomType=${roomTypeFilter}&searchQuery=${searchQuery}&numberOfAdults=${adults}&numberOfChildren=${children}`
    );
  };

  return (
    <section className="bg-tertiary-light py-6 rounded-lg">
      <div className="flex gap-2 lg:gap-4 flex-wrap justify-between items-center px-10 lg:px-16">
        <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0">
          <label className="block text-sm font-medium mb-2 text-black">
            Room Type
          </label>
          <div className="relative">
            <select
              value={roomTypeFilter}
              onChange={handleRoomTypeChange}
              className="w-full px-4 py-2 capitalize leading-tight focus:outline-none text-sm rounded-[12px] border shadow-[0_1px_2px_0] shadow-gray border-[#CED4DA] dark:bg-black/90 dark:text-white"
            >
              <option value="All">All</option>
              <option value="Basic">Basic</option>
              <option value="Luxury">Luxury</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
        </div>

        <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0">
          <label className="block text-sm font-medium mb-2 text-black">
            Adults (max)
          </label>
          <div className="relative">
            <input
              type="number"
              className="w-full px-4 py-2 capitalize leading-tight focus:outline-none text-sm rounded-[12px] border shadow-[0_1px_2px_0] shadow-gray border-[#CED4DA] dark:bg-black/90 dark:text-white"
              min={0}
              placeholder="2"
              value={adults}
              onChange={handleAdultChange}
            />
          </div>
        </div>

        <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0">
          <label className="block text-sm font-medium mb-2 text-black">
            Children (max)
          </label>
          <div className="relative">
            <input
              type="number"
              className="w-full px-4 py-2 capitalize leading-tight focus:outline-none text-sm rounded-[12px] border shadow-[0_1px_2px_0] shadow-gray border-[#CED4DA] dark:bg-black/90 dark:text-white"
              min={0}
              placeholder="0"
              value={children}
              onChange={handleChildrenChange}
            />
          </div>
        </div>

        <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0">
          <label className="block text-sm font-medium mb-2 text-black">
            Search
          </label>
          <input
            type="search"
            id="search"
            placeholder="Search..."
            className="w-full px-4 py-2 capitalize leading-tight focus:outline-none text-sm rounded-[12px] border shadow-[0_1px_2px_0] shadow-gray border-[#CED4DA] dark:bg-black/90 dark:text-white"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </div>

        <button
          className="btn-primary"
          type="button"
          onClick={handleFilterClick}
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default Search;
