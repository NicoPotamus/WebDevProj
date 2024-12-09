import type { Workout } from './workoutModel'
import type { DataEnvelope, DataListEnvelope, LoginEnvelope } from './dataEnvelope'
import { api, apiNoToken } from './myFetch'

export async function getAll(){
  return api<DataListEnvelope<User>>('user')
}
export async function getOne(id: number){
  return api<DataEnvelope<User>>(`user/${id}`)
}
export async function create(user: User){
  return apiNoToken<DataEnvelope<User>>('user/login/register', user, 'POST')
}
export async function update(user: User){
  return api<DataEnvelope<User>>(`user/${user.id}`, user, 'PATCH')
}
export async function remove(id: number){
  return api<DataEnvelope<User>>(`user/${id}`, undefined, 'DELETE')
}
export async function login(email: string, password: string){
  return api<LoginEnvelope>(`user/login`, {email, password}, 'POST')
}

export interface User {
  firstName: string
  lastName: string
  dob: Date
  email: string
  password: string
  biography?: string
  photo: string
  workouts?: Workout[]
  following?: number[]//holds other friends id's
  stats: Stats
  stats_id?: number
  username: string
  id: number
  admin: boolean
}

export async function getStats(id: number){
  return api<DataEnvelope<Stats>>(`stats/${id}`)
}
export async function updateStats(id: number, stats: Stats){
  return api<DataEnvelope<Stats>>(`stats/${id}`, stats, 'PATCH')
}
export async function updateRecords(id: number, stats: Stats){
  return api<DataEnvelope<Stats>>(`stats/${id}`, stats, 'PATCH')
}
export interface Stats {
  //TODO: Add stats for workouts throughout time map<date, workoutID>
  recordedWorkouts: Record<string, number[]>;
  deadlift: number
  squat: number
  bench: number
  id?: number 
}

export function emptyStats(): Stats {
  return {
    recordedWorkouts: {"2024-01-01": [0]},
    deadlift: 0,
    squat: 0,
    bench: 0
  }
}
