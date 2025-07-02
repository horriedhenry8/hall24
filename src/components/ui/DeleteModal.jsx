const DeleteModal = ({ deleteFn, cancelFn }) => {
    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-700">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={cancelFn}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={deleteFn}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    );
  };
  
  export default DeleteModal;
  