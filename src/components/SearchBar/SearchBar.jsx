import React, { useState } from 'react'

const SearchBar = ({ searchKeyword, setSearchKeyword }) => {
  
  return (
    <input
      type="text"
      placeholder="Search blogs..."
      value={searchKeyword}
      onChange={(e) => setSearchKeyword(e.target.value)}
      className=" h-[50px] p-4 border border-gray-300 dark:text-black text-black mb-4 lg:w-1/3 mx-auto flex rounded-3xl focus:outline-none "
    />
  );
};

export default SearchBar
