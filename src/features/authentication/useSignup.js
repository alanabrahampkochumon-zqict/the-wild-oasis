import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {
    const { mutate: signup, isPending: isSigningUp } = useMutation({
        mutationFn: signupApi,
        onSuccess: (user) => {
            console.log(user);
            toast.success(
                "Account successfully created! Verify the new account with email address."
            );
        },
    });

    return { signup, isSigningUp };
}
