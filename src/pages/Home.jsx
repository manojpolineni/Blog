import React from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import BlogsCard from "../components/Blog/BlogsCard";

const Home = () => {

  


  return (
    <div className="flex py-5 flex-col ">
      <div className="pt-5 pb-8">
        <BlogsCard/>
      </div>
    </div>
  );
};

export default Home;
