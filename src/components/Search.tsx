import { NextPage } from "next"
import Link from "next/link"
import SearchIcon from "@mui/icons-material/Search";

type SearchProps={
    setTextInput: Function
    handleSearch: Function
}

const Search = ({setTextInput, handleSearch}: SearchProps) => {
    return (
        <div className="h-fit w-max mt-4 flex items-center justify-around">
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
              className="bg-slate-300 focus:ring-indigo-500 focus:border-indigo-500 block w-max mr-6 h-10 pl-7 pr-12 sm:text-sm border-gray-300 rounded-md outline-none shadow-inner shadow-black"
              placeholder="Math, Lizard, Geometry..."
            />
            <div className="h-full w-full flex items-center justify-around">
              <button onClick={handleSearch}>
                <SearchIcon sx={{ color: "white" }} fontSize="large" />
              </button>
              <Link href="/notes/newNote">
                <button className="text-white text-xl font-bold bg-purple-800 w-32 h-8 ml-4 rounded-md shadow-md shadow-black hover:bg-purple-900 active:w-28 active:h-7 active:text-lg outline-none">
                  New Note
                </button>
              </Link>
            </div>
          </div>
    )
}

export default Search