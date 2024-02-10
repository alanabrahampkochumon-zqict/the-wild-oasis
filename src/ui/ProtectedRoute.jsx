import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
    height: 100vh;
    background-color: var() (--color-grey-50);
    display: flex;
    justify-content: center;
    align-items: center;
`;

function ProtectedRoute({ children }) {
    const navigate = useNavigate();

    // 1. Load the authenticated user.
    const { isAuthenticated, isLoading } = useUser();

    // 2. If there is no authenticated user, redirect ot the /login
    useEffect(
        function () {
            if (!isLoading && !isAuthenticated) navigate("/login");
        },
        [isLoading, isAuthenticated, navigate]
    );

    // 3. While loading, show a spinner
    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    // 4. If there is a user, render the app.
    return children;
}

export default ProtectedRoute;
