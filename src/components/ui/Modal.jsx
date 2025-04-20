import Close from "../icons/Close";

const Modal = ({ trigger,triggerFn,title, description, children }) => {
  return (
    <div 
      className={`fixed z-1 inset-0 flex justify-center items-center bg-[rgba(0,0,0,.4)]  ${
        trigger ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <div className="">
            <h1 className="text-lg font-semibold">{title} </h1>
            <p className="text-sm text-gray-800">{description} </p>
          </div>
          <button onClick={triggerFn}>
          <Close/></button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
