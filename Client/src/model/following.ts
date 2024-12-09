
import type { DataEnvelope, DataListEnvelope } from './dataEnvelope'
import type { Exercise } from './exercises'
import { api } from './myFetch'
import type { User } from './user'


export async function getFollowing(id: number){
  return api<DataListEnvelope<User>>(`following/${id}`)
}
export async function create(exercise: Exercise){
  return api<DataEnvelope<Exercise>>('exercises', exercise, 'POST')
}
export async function update(exercise: Exercise){
  return api<DataEnvelope<Exercise>>(`exercises/${exercise.id}`, exercise, 'PUT')
}
export async function remove(id: number){
  return api<DataEnvelope<Exercise>>(`exercises/${id}`, undefined, 'DELETE')
}



