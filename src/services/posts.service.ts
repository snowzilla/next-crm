import {axiosWithAuth} from "@/api/Interceptors";

const postsService = () => {
  const getPosts = async (pageSize: number, page: number) => {
    const response = await axiosWithAuth.get(`/posts?limit=${pageSize}&skip=${page}`)
    return response.data
  }

  const getPostById = async (id: string) => {
    const response = await axiosWithAuth.get(`/posts/${id}`)
    return response.data
  }

  return {getPosts, getPostById}
}

export default postsService
