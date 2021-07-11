export class NotFoundFormatException extends Error {
  constructor(format: string) {
    super(`Cannot find format "${format}", please check config.`)
  }
}

export class NotFoundFilterException extends Error {
  constructor(filter: string) {
    super(`Cannot find filter "${filter}", please check config.`)
  }
}

export class NotFoundTransformException extends Error {
  constructor(transform: string) {
    super(`Cannot find transform "${transform}", please check config.`)
  }
}

export class CircularRefsException extends Error {
  constructor(refs: string[]) {
    super(`Found circular reference "${refs.join(' -> ')}", please check tokens.`)
  }
}
