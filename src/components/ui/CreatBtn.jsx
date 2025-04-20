import { Children } from "react";

const CreateBtn = ({children,onClick}) => {
    return (
        <button className="bg-green-500 rounded text-white p-2 my-2 " onClick={onClick} id="btn" >
            {children}
        </button>
    );
};

export default CreateBtn;