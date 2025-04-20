
const Input = ({htmlFor,labelClass,label,inpId,inpClass,reg,type,placeholder,isrequired}) => {
    return (
        <div>
            <label
              htmlFor={htmlFor}
              className={labelClass}
            >
              {label}{isrequired && <span className="text-red-500">*</span>}
            </label>
            <input
              id={inpId || htmlFor}
              className={inpClass}
              {...reg}
              type={type}
              placeholder={placeholder}
              isrequired={isrequired}
            />
        </div>
    );
};

export default Input;