import React, { useState, useEffect } from "react";
import { IoAdd, IoRemove, IoSave, IoClose } from "react-icons/io5";

const ContactForm = ({
  contact,
  onSubmit,
  onCancel,
  error,
  setError,
  emails,
}) => {
  // Initialize emailFields based on whether contact exists and has emails
  const [emailFields, setEmailFields] = useState(
    emails?.length
      ? emails.map((_, index) => ({
          id: index + 1,
          name: index === 0 ? "email" : `email${index + 1}`,
        }))
      : [{ id: 1, name: "email" }]
  );

  useEffect(() => {
    if (emails) {
      setEmailFields(
        emails.map((_, index) => ({
          id: index + 1,
          name: index === 0 ? "email" : `email${index + 1}`,
        }))
      );
    }
  }, [emails]); // Re-run when contact is updated

  const addEmailField = () => {
    const newId = emailFields.length + 1;
    setEmailFields([...emailFields, { id: newId, name: `email${newId}` }]);
  };

  const removeEmailField = (idToRemove) => {
    if (emailFields.length > 1) {
      const updatedFields = emailFields
        .filter((field) => field.id !== idToRemove)
        .map((field, index) => ({
          id: index + 1,
          name: index === 0 ? "email" : `email${index + 1}`,
        }));
      setEmailFields(updatedFields);
    }
  };

  const renderEmailFields = () => (
    <>
      {emailFields.map((field) => (
        <div key={field.id} className="flex items-center gap-2">
          <div className="flex-1">
            <label className="block font-bold">
              {field.id === 1 ? "Email" : `Email ${field.id}`}:
            </label>
            <input
              type="email"
              required
              name={field.name}
              defaultValue={emails?.[field.id - 1] || ""}
              className="w-full p-2 border rounded"
            />
          </div>
          {field.id === emailFields.length && (
            <div className="flex items-end h-full gap-2 mb-1">
              {emailFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEmailField(field.id)}
                  className="p-2 mt-6 text-red-600 hover:bg-red-100 rounded-full"
                  title="Remove email"
                >
                  <IoRemove className="text-xl" />
                </button>
              )}
              <button
                type="button"
                onClick={addEmailField}
                className="p-2 mt-6 text-blue-600 hover:bg-blue-100 rounded-full"
                title="Add email"
              >
                <IoAdd className="text-xl" />
              </button>
            </div>
          )}
        </div>
      ))}
    </>
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = {
          name: e.target.name.value,
          emails: emailFields
            .map((field) => e.target[field.name].value)
            .filter(Boolean),
        };
        onSubmit(formData);
      }}
      className="space-y-4"
    >
      <div>
        <label className="block font-bold">Name:</label>
        <input
          type="text"
          required
          name="name"
          defaultValue={contact?.contactName || ""}
          onChange={() => setError(null)}
          className="w-full p-2 border rounded"
        />
      </div>

      {renderEmailFields()}

      {error && <div className="text-red-500 text-sm font-bold">{error}</div>}

      <div className="flex justify-between">
        {/* save button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
        >
          <IoSave className="text-xl" />
          {contact ? "Update" : "Save"}
        </button>

        {/* cancel button */}
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center gap-2"
        >
          <IoClose className="text-xl" />
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
