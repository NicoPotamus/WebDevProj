import data from '../data/exercises.json'

import type { DataListEnvelope } from './dataEnvelope'

export function getAll(): DataListEnvelope<Exercise> {
  return {
    isSuccessful: true,
    data: data.exercises
  }
}


export interface Exercise {
    name: string
    equipment: string | null
    primaryMuscles: string[]
    instructions: string[]
    category: string
}

