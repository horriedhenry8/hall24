import Close from "../icons/Close";

const Modal = ({ trigger, triggerFn, title, description, children }) => {
  if (!trigger) return null; // ❗Don't render anything if modal is not triggered

  return (
    <div
      onClick={triggerFn} // Close modal when backdrop clicked
      className="fixed z-10 inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.4)]"
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        className="bg-white rounded-lg shadow-lg p-4 min-w-[600px] transform scale-100 transition-all duration-300"
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <div>
            <h1 className="text-lg font-semibold">{title}</h1>
            <p className="text-sm text-gray-800">{description}</p>
          </div>
          <button onClick={triggerFn}>
            <Close />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
