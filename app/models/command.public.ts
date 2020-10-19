export interface Command {
  command: string
  options: {
    formedSpanStart: Date
    formedSpanEnd: Date
    quantity: number
    dbIdPrefix: string
  }
}
