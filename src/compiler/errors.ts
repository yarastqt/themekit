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

export class NotFoundPresetException extends Error {
  constructor(preset: string) {
    super(`Cannot find preset "${preset}", please check config.`)
  }
}

export class NotFoundRefException extends Error {
  constructor(ref: string) {
    super(`Cannot find ref "${ref}".`)
  }
}

export class CircularRefsException extends Error {
  constructor(refs: string[]) {
    super(`Found circular reference "${refs.join(' -> ')}", please check tokens.`)
  }
}
