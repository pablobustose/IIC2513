import { useEffect , useState} from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [userId, setUserId] = useState(localStorage.getItem('user_id') || null);
    const [gameId, setGameId] = useState(localStorage.getItem('game_id') || null);
    const [playerId, setPlayerId] = useState(localStorage.getItem('player_id') || null);

    function logout() {
        setToken(null)
        setUserId(null)
        setGameId(null)
        setPlayerId(null)
    }

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    useEffect(() => {
        localStorage.setItem('user_id', userId);
    }, [userId]);

    useEffect(() => {
        localStorage.setItem('game_id', gameId);
    }, [gameId]);

    useEffect(() => {
        localStorage.setItem('player_id', playerId);
    }, [playerId]);

    return (
        <AuthContext.Provider value={{ token, setToken, userId, setUserId, logout, gameId, setGameId, playerId, setPlayerId }}>
            {children}
        </AuthContext.Provider>
    );
    }
export default AuthProvider;