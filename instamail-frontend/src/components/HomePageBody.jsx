import React from "react";
import EmailList from "./EmailList";

const HomePageBody = ({ activeCategory }) => {
  return (
    <div className="flex-grow bg-white p-6 overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4">{activeCategory}</h2>
      <EmailList />
    </div>
  );
};

export default HomePageBody;
