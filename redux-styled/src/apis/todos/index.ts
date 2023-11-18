import axios from 'axios'

export const fetchTodos = async (userId: string) => {
  const response = await axios('/api/todos', {
    method: 'GET',
    params: {
      userId,
    },
  })
  return response.data
}
