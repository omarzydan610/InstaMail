import React from "react";

const HomePageBody = ({ activeCategory }) => {
  return (
    <div className="flex-grow bg-white p-4">
      <h2 className="text-2xl font-semibold">{activeCategory}</h2>
      {/* Additional content will go here */}
    </div>
  );
};

export default HomePageBody;
