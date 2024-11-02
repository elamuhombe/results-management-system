import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


const BackButton: React.FC = () => {
    const navigate = useNavigate();

    // go back one level
    const handleGoBack = () =>{
        navigate(-1)
    }
    return (
        <div>
            <button onClick={handleGoBack} >
                <FaArrowLeftLong />
            </button>
        </div>
    );
}

export default BackButton;
