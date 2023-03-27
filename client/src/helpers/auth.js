import { Buffer } from 'buffer'
const tokenName = 'PROJECT-3-TOKEN'

export const getPayload = () => {
  const token = localStorage.getItem(tokenName)
  if (!token) return
  const splitToken = token.split('.')
  const payloadString = splitToken[1]
  return JSON.parse(Buffer.from(payloadString, 'base64'))
}

export const authenticatedUser = () => {
  const payload = getPayload()
  console.log('payload', payload)
  if (!payload) return false
  const currentTime = Date.now()
  console.log('current ->', currentTime)
  console.log('payload ->', payload.exp * 1000)
  if (currentTime < payload.exp * 1000) {
    return true
  }
  return false
}

export const userTokenFunction = () => {
  const token = localStorage.getItem(tokenName)
  if (!token) return
  const userToken = {
    headers: { Authorization: `Bearer ${token}` },
  }
  return userToken
}

export const removeToken = () => {
  localStorage.removeItem(tokenName)
}