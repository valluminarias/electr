export interface HasId {
    _id: string,
}

export interface Reading extends HasId {
    dt: number,
    period_from: number,
    period_to: number,
    current: number,
    previous: number,
    val: number,
    amount: number,
    rate: number,
}

export type ReadingList = Reading[]