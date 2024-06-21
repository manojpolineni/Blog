import React from 'react'

const DeleteModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

  return (
      <div className="fixed inset-0 flex items-center justify-center z-50 dark:bg-[#117271]">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-6 z-50">
              <h2 className="text-xl font-semibold mb-4">{title}</h2>
              <p className="mb-6">{message}</p>
              <div className="flex justify-end">
                  <button
                      className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                      onClick={onClose}
                  >
                      Cancel
                  </button>
                  <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={onConfirm}
                  >
                      Yes
                  </button>
              </div>
          </div>
      </div>
  )
}

export default DeleteModal