const { getConnection } = require("./supabase");
const connection = getConnection();

/**
 * @tmeplate T
 * @typedef {import("../../Client/src/model/dataEnvelope.ts").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/model/dataEnvelope.ts").DataListEnvelope} DataListEnvelope
 * @typedef {import("../../Client/src/model/workoutModel.ts").Workout} Workout
 */

/**
 *
 * @param {Number} uId
 * @returns {Promise<DataListEnvelope<Workout>>} - resolves with all workouts
 */
async function getAll(uId) {
  const { data, error, count } = await connection
    .from("users")
    .select("workouts(*)", { count: "estimated" })
    .eq("id", uId);

  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
    total: count,
  };
}

/**
 *
 * @param {Number} uId
 * @param {Number} id
 * @returns {Promise<DataEnvelope<Workout>>} - resolves with the workout
 */
async function getById(uId, id) {
  const { data, error } = await connection
    .from("Workouts")
    .select(
      ` id, 
      name, 
      sets, 
      user_id, 
      Exercises (id, name, equipment, category, instructions, WorkoutExercises (reps)) `
    )
    .eq("user_id", userId)
    .eq("id", workoutId);

  return {
    isSuccess: !!data,
    data: data,
  };
}

/**
 * add a workout to a user
 * @param {Number} uId
 * @param {Workout} workout
 * @returns
 */
async function add(uId, workout) {
  const { data } = await connection
    .from("workouts")
    .insert({
      name: workout.name,
      sets: workout.sets,
      user_id: uId,
    })
    .select ("*")
    .single();
  const { error } = await connection.from("workoutExercises").insert(
    workout.exercises.map((exercise) => ({
      workout_id: data.id,
      exercise_id: exercise.id,
      reps: exercise.reps,
    }))
  );

  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

/**
 * update a workout
 * @param {Number} uId
 * @param {Number} id
 * @param {Workout} workout
 * @returns {Promise<DataEnvelope<Workout>>}
 */
async function update(uId, id, workout) {
  const { data } = await connection
    .from("workouts")
    .update({
      name: workout.name,
      sets: workout.sets,
    })
    .eq("id", id)
    .eq("user_id", uId)
    .single()

  await connection
    .from("workoutExercises")
    .delete()
    .eq("workout_id", id);

  const { error } = await connection
    .from("workoutExercises")
    .insert(
      workout.exercises.map((exercise) => ({
      workout_id: id,
      exercise_id: exercise.id,
      reps: exercise.reps,
    }))
  );

  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

/**
 * delete a workout
 * @param {Number} uId
 * @param {Number} id
 * @returns {Promise<DataEnvelope<Workout>>}
 */
async function remove(uId, id) {
  const { data } = await connection
    .from("workouts")
    .delete()
    .eq("id", id)
    .eq("user_id", uId)
    .single();

  const { error } = await connection
    .from("workoutExercises")
    .delete()
    .eq("workout_id", id);

  return {
    isSuccess: !!data,
    data: data,
  }
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};