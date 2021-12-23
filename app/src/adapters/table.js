
export const adaptToDisplay = (respData = {}) => {
  const { results } = respData || {}
  if (!results || !results.length) return []

  return results
}
