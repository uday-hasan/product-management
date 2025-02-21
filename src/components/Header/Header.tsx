import React from "react";
import Filter from "./Filter";
import SearchBar from "./SearchBar";
import Sort from "./Sort";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="flex items-center py-6 bg-primary gap-6 px-8">
      <div className="hidden md:flex">
        <Filter />
      </div>
      <SearchBar />
      <div className="hidden md:flex max-w-[200px] flex-[1]">
        <Sort />
      </div>
      <div className="flex md:hidden">
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
