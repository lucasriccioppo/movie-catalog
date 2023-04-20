export const createFavoriteDoc = {
  description: 'Login with email and password',
  schema: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        example: 'johndoe@teste.com'
      },
      password: {
        type: 'string',
        example: '123456'
      }
    }
  }
}