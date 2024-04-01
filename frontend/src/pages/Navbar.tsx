import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Navbar() {
    const navigate = useNavigate();    
    const handleNavigate = () => {
        navigate("/create");
    }

    return <div className="fixed z-10 top-0 left-0 right-0 bg-white h-14 flex justify-between items-center px-48">
        <p onClick={() => navigate("/")} className="font-bold text-2xl cursor-pointer">Blog page</p>
        <Button name="Create Post" onChange={handleNavigate} />
    </div>
}