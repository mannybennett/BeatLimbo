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

export const deleteFile = (id) => {
  return {
    type: "DELETE_FILE",
    value: id
  }
} 