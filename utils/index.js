const generateId = (notes) => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export {
  generateId,
  isEmptyObject
}