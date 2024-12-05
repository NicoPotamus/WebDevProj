

export interface DataEnvelope<T> {
    data: T
    error?: string
    isSuccess: boolean
  }
  
  export interface DataListEnvelope<T> extends DataEnvelope<T[]> {
    data: T[]
    count: number
  }