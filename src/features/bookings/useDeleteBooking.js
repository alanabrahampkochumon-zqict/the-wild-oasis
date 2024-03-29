import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export const useDeleteBooking = () => {
    const queryClient = useQueryClient();

    const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
        mutationFn: deleteBookingApi,
        onSuccess: () => {
            toast.success("Successfully deleted a booking");
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { isDeleting, deleteBooking };
};
