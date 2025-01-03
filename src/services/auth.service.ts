import {axiosClassic} from "@/api/Interceptors";
import {removeTokenStorage, saveTokenStorage} from "@/services/auth-token.service";
import {toaster} from "@/components/ui/toaster";

const authService = () => {
  const login = async (username: string, password: string) => {
    try {
      const response = axiosClassic.post('/auth/login', {
        username: 'emilys',
        password: 'emilyspass',
      })

      const data = await response

      toaster.promise(response, {
        success: {
          title: "Successfully login!",
          description: "Looks great",
        },
        error: {
          title: "login failed",
          description: "Something wrong with the login",
        },
        loading: { title: "login...", description: "Please wait" },
      })

      if (data.status === 200) {
        saveTokenStorage(data.data.accessToken)
      }

      return data.data
    } catch (error) {
      console.error('Login error:', error);
      throw error
    }
  };

  const register = async (firstName: string, lastName: string, username: string, password: string) => {
    try {
      const response = await axiosClassic.post('/users/add', {
        firstName,
        lastName,
        username,
        password,
      })

      console.log('Registration response:', response.data);
      return response.data; // Возвращаем данные ответа
    } catch (error) {
      console.error('Registration error:', error);
      throw error; // Пробрасываем ошибку для обработки в компоненте
    }
  };

  const logout = async () => {
    try {
      removeTokenStorage();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return { login, register, logout }
};

export default authService;

