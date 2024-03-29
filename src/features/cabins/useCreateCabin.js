import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEditCabin } from "../../services/apiCabins";

export const useCreateCabin = () => {
    const queryClient = useQueryClient();

    const { isPending: isCreating, mutate: createCabin } = useMutation({
        mutationFn: createEditCabin,
        onSuccess: () => {
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { isCreating, createCabin };
};
