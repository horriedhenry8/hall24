
const CreateBtn = ({children,onClick}) => {
    return (
        <button className="bg-teal-800 hover:bg-teal-700 rounded text-white p-2 my-2 cursor-pointer" onClick={onClick}  >
            {children}
        </button>
    );
};

export default CreateBtn;