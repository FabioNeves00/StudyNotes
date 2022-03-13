import { NextPage } from "next";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import { Dispatch, SetStateAction } from "react";

type SearchProps = {
  setTextInput: Dispatch<SetStateAction<String>>;
  handleSearch: () => Promise<void>;
};

const Search = ({ setTextInput, handleSearch }: SearchProps) => {
  return (
    <div className="h-fit w-11/12 ml-4 mt-4 flex">
        <label
          htmlFor="search"
          className="block text-2xl mr-6 font-medium text-white"
        >
          Search:
        </label>
        <input
          type="text"
          name="search"
          id="search"
          autoComplete="off"
          onChange={(e) => setTextInput(e.target.value)}
          className="block bg-extra w-max mr-6 h-8 pl-7 pr-12 sm:text-sm border-gray-300 rounded-sm"
          placeholder="Math, DNA, Hydrogen..."
        />
      <div className="h-full w-full flex items-end">
        <button
          onClick={() => handleSearch()}
          className="rounded-md w-9 h-9 bg-button-primary hover:brightness-90"
        >
          <SearchIcon sx={{ color: "white", fontSize: 35}} />
        </button>
      </div>
    </div>
  );
};

export default Search;
