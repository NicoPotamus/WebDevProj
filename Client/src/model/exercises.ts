
import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'
import { api } from './myFetch'

export async function getAll(){
  return api<DataListEnvelope<Exercise>>('exercises')
}
export async function getOne(id: number){
  return api<DataEnvelope<Exercise>>(`exercises/${id}`)
}
export async function create(exercise: Exercise){
  return api<DataEnvelope<Exercise>>('exercises', exercise, 'POST')
}
export async function update(exercise: Exercise){
  return api<DataEnvelope<Exercise>>(`exercises/${exercise.id}`, exercise, 'PATCH')
}
export async function remove(id: number){
  return api<DataEnvelope<Exercise>>(`exercises/${id}`, undefined, 'DELETE')
}



export interface Exercise {
    id: number
    name: string
    equipment: string | null
    primaryMuscles: string[]
    instructions: string[]
    category: string
}

