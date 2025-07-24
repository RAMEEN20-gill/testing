import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

const ShareModal = ({ isOpen, onClose, onShare, task }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      onShare(email);
      setEmail("");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-bold text-gray-900 dark:text-white">
              Share Task
            </Dialog.Title>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email of user to share with:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700"
              placeholder="example@email.com"
            />

            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Share
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ShareModal;
