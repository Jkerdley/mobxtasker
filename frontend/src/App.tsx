import { Login } from "./components/auth/Login";
import { Routes, Route } from "react-router-dom";
import { Todos } from "./components/todos/Todos";
import { NotFound } from "./components/not-found/NotFound";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { useEffect } from "react";
import { useAppDispatch } from "./ducks/hooks";
import { checkAuth } from "./ducks/auth";

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(checkAuth());
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route path="/" element={<Login />} />
                </Route>
                <Route element={<ProtectedRoutes auth={true} />}>
                    <Route path="/todos" element={<Todos />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
