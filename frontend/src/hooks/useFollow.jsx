// Import React libraries
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Create Reusable hook
const useFollow = () => {
  const queryClient = useQueryClient(); // react query

  const { mutate: follow, isPending } = useMutation({
    // use mutation, rename it as follow and isPending
    mutationFn: async (userId) => {
      // which user we will follow and unfollow
      try {
        const res = await fetch(`/api/users/follow/${userId}`, {
          // fetch data from endpoint
          method: "POST", // Post route -> 'post' method
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong!");
        }
        return;
      } catch (error) {
        // handle error
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      Promise.all([
        // Invalidate two queries
        queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }), //
        queryClient.invalidateQueries({ queryKey: ["authUser"] }), // fetch the auth user profile for unfollow and follow button in the user profile
      ]);
    },
    onError: (error) => {
      toast.error(error.message); // display alert message (hot-toast react packages)
    },
  });

  return { follow, isPending }; // return values from hook
};

// Export custom hook
export default useFollow;
