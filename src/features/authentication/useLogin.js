import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {mutate: login, isPending: isLogginIn} = useMutation({
        mutationFn: ({email, password}) => loginApi({email, password}),
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user.user)
            navigate("/dashboard", {replace: true})
        },
        onError: (err) => {
            console.log("ERROR", err)
            toast.error("Provided email/password is incorrect")
        }
    })

    return {login, isLogginIn}
}