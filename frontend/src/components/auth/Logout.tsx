import { Link } from "react-router-dom";
import { useAppDispatch } from "../../ducks/hooks";
import { logout } from "../../ducks/auth";

export const Logout = () => {
    const dispatch = useAppDispatch();
    const onLogout = () => {
        dispatch(logout());
    };

    return (
        <Link className="logout" to="#" onClick={onLogout}>
            <i className="fa fa-sign-out fa-lg" aria-hidden="true"></i>
        </Link>
    );
};
