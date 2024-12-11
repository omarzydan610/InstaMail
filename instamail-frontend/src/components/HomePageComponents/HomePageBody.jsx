import React from "react";
import EmailList from "../EmailComponents/EmailList";
import ContactsModal from "../ContactsComponents/ContactsModal";
import FloatingButton from "./FloatingButton";

const HomePageBody = ({
  activeCategory,
  isContactsModalOpen,
  setIsContactsModalOpen,
}) => {
  const closeContactsModal = () => setIsContactsModalOpen(false);
  return (
    <div className="flex-grow bg-white p-6 overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4">{activeCategory}</h2>
      <EmailList activeCategory={activeCategory}/>
      <ContactsModal
        isOpen={isContactsModalOpen}
        onClose={closeContactsModal}
      />
      <FloatingButton />
    </div>
  );
};

export default HomePageBody;
