// check is field emprty
export const isFill = (fields) => {
  return !Object.values(fields).map((e) => e.toString().length > 0).includes(false)
}