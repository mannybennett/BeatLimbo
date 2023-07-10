export const updateUser = (user) => {
  return {
    type: "UPDATE_USER",
    value: user
  }
}

export const getFiles = (files) => {
  return {
    type: "GET_FILES",
    value: files
  }
} 