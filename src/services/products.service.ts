import {axiosWithAuth} from "@/api/Interceptors";

const productsService = () => {
  const getProducts = async (pageSize: number, page: number) => {
    const response = await axiosWithAuth.get(`/products?limit=${pageSize}&skip=${page}`)
    return response.data
  }

  const getProductById = async (id: string) => {
    const response = await axiosWithAuth.get(`/products/${id}`)
    return response.data
  }

  return {getProducts, getProductById}
}

export default productsService
