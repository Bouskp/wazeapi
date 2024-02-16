const getTokenString = (authorization) => {
  if (authorization && authorization.length > 0) {
    const token = authorization.split(' ')[1]
    return token
  } else {
    return null
  }
}

export { getTokenString }
