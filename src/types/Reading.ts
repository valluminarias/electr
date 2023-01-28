export interface HasId {
    _id: string,
}

export interface Reading extends HasId {
    dt: number,
    val: number,
    amount: number,
    rate: number,
    current?: number,
    previous?: number,
}

export type ReadingList = Reading[]