

export interface DataEnvelope<T> {
    data: T
    error?: string
    isSuccessful: boolean
  }
  
  export interface DataListEnvelope<T> extends DataEnvelope<T[]> {
    data: T[]
    error?: string
  }