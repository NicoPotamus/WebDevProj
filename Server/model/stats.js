const { getConnection } = require("./supabase");
const connection = getConnection();

/**
 * @tmeplate T
 * @typedef {import("../../Client/src/model/dataEnvelope.ts").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/model/dataEnvelope.ts").DataListEnvelope} DataListEnvelope
 * @typedef {import("../../Client/src/model/user.ts").Stats} Stats
 */

/**
 * Get stats by ID
 * @param {Number} id
 * @returns {Promise<DataEnvelope<Stats>>}
 */
async function getById(id) {
  const { data, error, count } = await connection
    .from("stats")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return {
      isSuccess: false,
      message: error.message,
      data: null,
      total: 0,
    };
  }

  // Ensure data.recordedworkouts is not null or undefined
  const recordedWorkouts = data.recordedworkouts ? JSON.parse(data.recordedworkouts) : {};

  const deserializeStats = {
    ...data,
    recordedWorkouts: recordedWorkouts,
  };

  return {
    isSuccess: true,
    message: null,
    data: deserializeStats,
    total: count,
  };
}

/**
 * Add a user's stats
 * @param {Stats} stats
 * @returns {Promise<DataEnvelope<Stats>>}
 */
async function add(stats) {
  const recordedWorkoutsJSON = JSON.stringify(stats.recordedWorkouts);
  const { data, error } = await connection
    .from("stats")
    .insert({
      recordedworkouts: recordedWorkoutsJSON,
      deadlift: stats.deadlift,
      squat: stats.squat,
      bench: stats.bench,
    })
    .select("*")
    .single();

  if (error) {
    return {
      isSuccess: false,
      message: error.message,
      data: null,
    };
  }

  return {
    isSuccess: true,
    message: "Stats added successfully",
    data: data,
  };
}

/**
 * update a users stats
 * @param {Number} id
 * @param {Stats} stats
 * @returns {Stats}
 */
async function update(id, stats) {
  const recordedWorkoutsJSON = JSON.stringify(stats.recordedWorkouts);
  const { data, error } = await connection
    .from("stats")
    .update({
      recordedWorkouts: recordedWorkoutsJSON,
      deadlift: stats.deadlift,
      squat: stats.squat,
      bench: stats.bench,
    })
    .eq("id", id)
    .select("*")
    .single()

  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

/**
 * delete a users stats
 * @param {Number} id
 * @returns {Stats}
 */
async function remove(id) {
  const { data, error } = await connection
    .from("stats")
    .delete()
    .eq("id", id)
    .select("*")
    .single()

  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}
module.exports = {
  getById,
  add,
  update,
  remove,
};
