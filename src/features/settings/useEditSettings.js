import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSettings() {
    const queryClient = useQueryClient();

    const { isPending: isUpdating, mutate: updateSetting } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success("Settings successfully edited");
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { isUpdating, updateSetting };
}
