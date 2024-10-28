import type { Workout } from './workoutModel'

export interface User {
  firstName: string
  lastName: string
  dob: Date
  email: string
  password: string
  biography?: string
  photo: string
  workouts?: Workout[]
  following?: User[]
  stats: Stats
  username: string
  id: number
  admin: boolean
}

interface Stats {
  //TODO: Add stats for workouts throughout time
  recordedWorkouts: Map<Date, Workout[]>
  deadlift: number
  squat: number
  bench: number
}
export const emptyStats: Stats = {
  recordedWorkouts: new Map<Date, Workout[]>(),
  deadlift: 0,
  squat: 0,
  bench: 0,
}
const choochooWorkout = {
  name: 'ChoO cHOo cAlOo',
  sets: 4,
  exercises: [
    {
      exercise: {
        name: '90/90 Hamstring',
        equipment: 'body only',
        primaryMuscles: ['hamstrings'],
        instructions: [
          'Lie on your back, with one leg extended straight out.',
          'With the other leg, bend the hip and knee to 90 degrees. You may brace your leg with your hands if necessary. This will be your starting position.',
          'Extend your leg straight into the air, pausing briefly at the top. Return the leg to the starting position.',
          'Repeat for 10-20 repetitions, and then switch to the other leg.',
        ],
        category: 'stretching',
      },
      reps: 15,
    },
  ],
}
//TEST USER
const workoutMap = new Map<Date, Workout[]>()
workoutMap.set(new Date(2024, 9, 20, 20, 32, 0), [choochooWorkout])
workoutMap.set(new Date(2024, 9, 21, 20, 32, 0), [choochooWorkout])
workoutMap.set(new Date(2024, 9, 22, 20, 32, 0), [choochooWorkout])
workoutMap.set(new Date(2024, 9, 23, 20, 32, 0), [choochooWorkout])
workoutMap.set(new Date(2024, 9, 24, 20, 32, 0), [choochooWorkout])
workoutMap.set(new Date(2024, 9, 25, 20, 32, 0), [choochooWorkout])
workoutMap.set(new Date(2024, 9, 26, 20, 32, 0), [choochooWorkout])

const nicoStats: Stats = {
  recordedWorkouts: workoutMap,
  deadlift: 300,
  squat: 200,
  bench: 175,
}

export const userNico: User = {
  firstName: 'Nico',
  lastName: 'DeMilio',
  dob: new Date('1999-09-19'),
  email: 'NicoDeMilio@email.com',
  password: 'password',
  biography: 'I am a student at SUNY new paltz',
  photo: 'some.jpg',
  workouts: [choochooWorkout],
  following: [],
  username: 'NicoD',
  id: 0,
  admin: true,
  stats: nicoStats,
}
