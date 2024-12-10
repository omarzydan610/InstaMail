import React from "react";
import EmailList from "../EmailComponents/EmailList";
import ContactsModal from "../ContactsComponents/ContactsModal";

const HomePageBody = ({
  activeCategory,
  isContactsModalOpen,
  setIsContactsModalOpen,
}) => {
  const closeContactsModal = () => setIsContactsModalOpen(false);
  return (
    <div className="flex-grow bg-white p-6 overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4">{activeCategory}</h2>
      <EmailList />
      <ContactsModal
        isOpen={isContactsModalOpen}
        onClose={closeContactsModal}
      />
    </div>
  );
};

export default HomePageBody;
