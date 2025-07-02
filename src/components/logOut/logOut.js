import { useNavigate } from 'react-router-dom';

function LogOut(x)  {
    const navigate = useNavigate();

    if(x) {
        localStorage.removeItem('token');
        navigate('/');
    };

    
};

export default LogOut;