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
  const recordedWorkouts = data.recordedWorkouts ? JSON.parse(data.recordedWorkouts) : {};

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
      recordedWorkouts: recordedWorkoutsJSON,
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
  const { data, error } = await connection//failing fetch
    .from("stats")
    .update({
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



/**
 * Append records to recordedWorkouts JSONB column in Supabase table
 * @param {Number} statsId - The ID of the stats record to update
 * @param {Object} newRecord - New record to append where key is the date string and value is an array of numbers
 * @returns {Promise<Object>} - Result of the update operation
 */
async function appendToRecordedWorkouts(statsId, newRecord) {
  // Fetch the current recordedWorkouts
  const { data, error: fetchError } = await connection
    .from("stats")
    .select("recordedWorkouts")
    .eq("id", statsId)
    .single();

  if (fetchError) {
    console.error("Error fetching current recordedWorkouts:", fetchError);
    return { isSuccess: false, message: fetchError.message };
  }

  // Parse the current recordedWorkouts JSONB data
  const recordedWorkouts = data.recordedWorkouts ? JSON.parse(data.recordedWorkouts) : {};

  // Append or update records
  Object.keys(newRecord).forEach(date => {
    if (recordedWorkouts[date]) {
      // Append index 0 of the new values array to the existing values array
      recordedWorkouts[date].push(newRecord[date][0]);
    } else {
      // Add new record if no matching date is found
      recordedWorkouts[date] = newRecord[date];
    }
  });

  // Convert updated workouts to JSON string
  const updatedWorkoutsJSON = JSON.stringify(recordedWorkouts);

  // Update the recordedWorkouts column
  const { error: updateError } = await connection
    .from("stats")
    .update({ recordedWorkouts: updatedWorkoutsJSON })
    .eq("id", statsId);

  if (updateError) {
    console.error("Error updating recordedWorkouts:", updateError);
    return { isSuccess: false, message: updateError.message };
  }

  return { isSuccess: true, message: "RecordedWorkouts updated successfully" };
}




module.exports = {
  getById,
  add,
  update,
  remove,
  appendToRecordedWorkouts
}
