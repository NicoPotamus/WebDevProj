const { getConnection } = require("./supabase");
const connection = getConnection();

/**
 * @template T
 * @typedef {import("../../Client/src/model/dataEnvelope.ts").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/model/dataEnvelope.ts").DataListEnvelope} DataListEnvelope
 * @typedef {import("../../Client/src/model/workoutModel.ts").Workout} Workout
 */

/**
 * transform raw workout data into a more usable format
 * @param {*} rawWorkout 
 * @returns { Workout}
 */
function transformWorkoutData(rawWorkout) {
  return {
    id: rawWorkout.id,
    name: rawWorkout.name,
    sets: rawWorkout.sets,
    exercises: rawWorkout.workoutexercises.map(we => ({
      exercise: {
        id: we.exercises.id,
        name: we.exercises.name,
        equipment: we.exercises.equipment,
        category: we.exercises.category,
        instructions: we.exercises.instructions
      },
      reps: we.reps
    }))
  };
}

/**
 * @param {Number} uId
 * @returns {Promise<DataListEnvelope<Workout>>}
 */
async function getAll(uId) {
  const { data, error, count } = await connection
    .from("workouts")
    .select(`
      id, 
      name, 
      sets,
      workoutexercises (
        reps,
        exercises (
          id,
          name,
          equipment,
          category,
          instructions
        )
      )
    `)
    .eq("user_id", uId);

  if (error) {
    return {
      isSuccess: false,
      message: error.message,
      data: null,
      total: 0
    };
  }

  return {
    isSuccess: true,
    data: data.map(transformWorkoutData),
    total: count
  };
}

/**
 * @param {Number} uId
 * @param {Number} id
 * @returns {Promise<DataEnvelope<Workout>>}
 */
async function getById(uId, id) {
  const { data, error } = await connection
    .from("workouts")
    .select(`
      id, 
      name, 
      sets,
      workoutexercises (
        reps,
        exercises (
          id,
          name,
          equipment,
          category,
          instructions
        )
      )
    `)
    .eq("user_id", uId)
    .eq("id", id)
    .single();

  if (error) {
    return {
      isSuccess: false,
      message: error.message,
      data: null
    };
  }

  return {
    isSuccess: true,
    data: transformWorkoutData(data)
  };
}

/**
 * @param {Number} uId
 * @param {Workout} workout
 * @returns {Promise<DataEnvelope<Workout>>}
 */
async function add(uId, workout) {
  const { data: workoutData, error: workoutError } = await connection
    .from("workouts")
    .insert([{
      name: workout.name,
      sets: workout.sets,
      user_id: uId,
    }])
    .select("*")
    .single();

  if (workoutError) {
    console.error("Error inserting workout:", workoutError.message);
    return {
      isSuccess: false,
      message: workoutError.message,
      data: null
    };
  }
  const workoutShell = workoutData
  const exercisesToInsert = workout.exercises.map(exercise => ({
    workout_id: workoutShell.id,
    exercise_id: exercise.exercise.id,
    reps: exercise.reps,
  }));

  const { error: exerciseError } = await connection
    .from("workoutexercises")
    .insert(exercisesToInsert);

  if (exerciseError) {
    console.error("Error inserting workout exercises:", exerciseError.message);
    return {
      isSuccess: false,
      message: exerciseError.message,
      data: null
    };
  }

  return getById(uId, workoutData.id);
}

/**
 * @param {Number} uId
 * @param {Number} id
 * @param {Workout} workout
 * @returns {Promise<DataEnvelope<Workout>>}
 */
async function update(uId, id, workout) {
  const { error: workoutError } = await connection
    .from("workouts")
    .update({
      name: workout.name,
      sets: workout.sets,
    })
    .eq("id", id)
    .eq("user_id", uId);

  if (workoutError) {
    return {
      isSuccess: false,
      message: workoutError.message,
      data: null
    };
  }

  await connection
    .from("workoutexercises")
    .delete()
    .eq("workout_id", id);

  const { error: exerciseError } = await connection
    .from("workoutexercises")
    .insert(
      workout.exercises.map(exercise => ({
        workout_id: id,
        exercise_id: exercise.exercise.id,
        reps: exercise.reps,
      }))
    );

  if (exerciseError) {
    return {
      isSuccess: false,
      message: exerciseError.message,
      data: null
    };
  }

  return getById(uId, id);
}

/**
 * @param {Number} uId
 * @param {Number} id
 * @returns {Promise<DataEnvelope<Workout>>}
 */
async function remove(uId, id) {
  await connection
    .from("workoutexercises")
    .delete()
    .eq("workout_id", id);

  const { data, error } = await connection
    .from("workouts")
    .delete()
    .eq("id", id)
    .eq("user_id", uId)
    .single();

  return {
    isSuccess: !error,
    message: error?.message,
    data: data
  };
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};