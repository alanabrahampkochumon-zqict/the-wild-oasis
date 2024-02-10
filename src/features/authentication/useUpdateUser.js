import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { isPending: isUpdating, mutate: updateUser } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: (user) => {
            toast.success("User data updated successfully");

            queryClient.setQueryData(["user"], user);

            // queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { isUpdating, updateUser };
}
