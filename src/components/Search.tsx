import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import crossImg from "@assets/crossSign.svg";
import filterButton from "@assets/filterButton.svg";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

type SearchProps = {
  setTextInput: Dispatch<SetStateAction<String>>;
  handleSearch: () => Promise<void>;
};

const Search = ({ setTextInput, handleSearch }: SearchProps) => {
  return (
    <>
      <div className="h-fit w-11/12 mt-4 flex justify-between">
        <div>
          <Link href="/notes/newNote">
            <button className="flex justify-center items-center w-40 h-9 drop-shadow-lg shadow-black rounded-md bg-button-primary text-white text-2xl font-semibold text-center hover:brightness-95 active:brightness-90">
              New Note
              <Image height={20} src={crossImg} alt="+" />
            </button>
          </Link>
        </div>
        <div className="flex justify-center">
          <button className="mr-2 hover:brightness-90 active:brightness-95">
            <Image height={25} src={filterButton} alt="+" />
          </button>
          <input
            type="text"
            id="search"
            autoComplete="off"
            onChange={(e) => setTextInput(e.target.value)}
            className="block bg-extra w-max mr-2 h-8 pl-7 pr-12 sm:text-sm border-gray-300 rounded-md hover:brightness-95"
            placeholder="Math, DNA, Hydrogen..."
          />
          <button
            onClick={() => handleSearch()}
            className="hover:brightness-90 active:brightness-95"
          >
            <SearchIcon sx={{ color: "white", fontSize: 35 }} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Search;
