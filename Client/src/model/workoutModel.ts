import { type DataEnvelope, type DataListEnvelope } from './dataEnvelope';
import {type Exercise}  from './exercises'
import { api } from './myFetch';

export async function getAll(id: number){
  return api<DataListEnvelope<Workout>>(`workouts/${id}`)
}
export async function update(uId: number, id: number, workout: Workout){
    return api<DataEnvelope<Workout>>( `workouts/${uId}/${id}`, workout, 'PATCH')
}
export async function create(id:number, workout: Workout){
    return api<DataEnvelope<Workout>>( `workouts/${id}`, workout, 'POST')
}
export async function remove(uId:number, id: number){
    return api<DataEnvelope<Workout>>(`workouts/${uId}/${id}`, undefined, 'DELETE')
}
export interface Workout {
    name: string;
    exercises:WorkObj[]
    sets: number;
    id: number;
}

export interface WorkObj {
    exercise: Exercise | null;
    reps: number;
}