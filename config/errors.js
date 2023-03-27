export class Unauthorized extends Error {
  constructor(message = 'Unauthorized'){
    super(message)
    this.name = 'Unauthorized'
    this.status = 401
  }
}

export class NotFound extends Error {
  constructor(message = 'Resource Not Found'){
    super(message)
    this.name = 'NotFound'
    this.status = 404
  }
}

export class DemoCaught extends Error {
  constructor(message = 'You do not have the permissions to perform this action'){
    super(message)
    this.name = 'DemoWithoutPriviliges'
    this.status = 451
  }
}

export const assessError = (error, res) => {
  console.log(error)
  if (error.status) return res.status(error.status).json({ message: error.message })
  return res.status(422).json({ message: error.message })
}