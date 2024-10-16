import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../config/constants";

function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        navigate("/login");
    };

    return (
        <div>
            <p>Home</p>
            <button className="form-button logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Home;
