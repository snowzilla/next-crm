import {axiosWithAuth} from "@/api/Interceptors";
import {toaster} from "@/components/ui/toaster";

const usersService = () => {
  const getUser = async () => {
    try {
      const response = await axiosWithAuth.get("/user/me")
      return response.data
    } catch (error) {
      console.error('Error fetching user:', error)
      throw error
    }
  };

  const getUserById = async (id: string) => {
    try {
      const response = await axiosWithAuth.get(`/users/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching user:', error)
      throw error
    }
  };

  const getUsers = async (pageSize: number, page: number) => {
    const response = await axiosWithAuth.get(`/users?limit=${pageSize}&skip=${page}`)
    return response.data
  }

  const changeProfile = (id: number, data: Record<string, string | number>) => {
    const res = axiosWithAuth.put(`/users/${id}`, data)

    toaster.promise(res, {
      success: {
        title: "Successfully update!",
        description: "Looks great",
      },
      error: {
        title: "Update failed",
        description: "Something wrong with the update",
      },
      loading: { title: "Update...", description: "Please wait" },
    })

    return res
  }

  return {getUser, getUsers, changeProfile, getUserById}
}

export default usersService
