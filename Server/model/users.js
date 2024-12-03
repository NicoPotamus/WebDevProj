const data = require("../data/users.json");
const { getConnection } = require("./supabase");
const connection = getConnection();
const workoutModel = require("./workouts");
const statsModel = require("./stats");
const followingModel = require("./following");

/**
 * @tmeplate T
 * @typedef {import("../../Client/src/model/dataEnvelope.ts").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/model/dataEnvelope.ts").DataListEnvelope} DataListEnvelope
 * @typedef {import("../../Client/src/model/user.ts").User} User
 */

/**
 * Get all users
 * @returns {Promise<DataListEnvelope<User>>} - resolves with all users
 */
async function getAll() {
  const { data, error, count } = await connection
    .from("users")
    .select("*", { count: "estimated" });
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
    total: count,
  };
}

/**
 * get a user by id
 * @returns {Promise<DataEnvelope<User>>} - resolves with the user
 */
async function getById(id) {
  const { data, error } = await connection
    .from("users")
    .select("*, following(*)")
    .eq("id", id)
    .single();
  return {
    isSuccess: !!data, //turn obj into boolean value
    data: data,
  };
}

/**
 * Add a user
 * @param {User} user - the user to add
 * @returns {Promise<DataEnvelope<User>>} - resolves with the added user
 */
async function add(user) {
  let statsData = null
  if(user.stats) {
    statsData = await statsModel.add(user.stats)
  }else {
    const stats = {
      recordedWorkouts: [],
      deadlift: 0,
      squat: 0,
      bench: 0
    }
    statsData = await statsModel.add(stats)
  }

  const { data, error } = await connection
    .from("users")
    .insert([
      {
        firstname: user.firstname,
        lastname: user.lastname,
        dob: user.dob,
        email: user.email,
        password: user.password,
        biography: user.biography,
        photo: user.photo,
        username: user.username,
        admin: user.admin,
        stats_id: statsData.id
      },
    ])
    .select("*")
    .single();

    if (user.workouts) {
      for (const workout of user.workouts) {
        await workoutModel.add(data.id, workout)
      }
    }

  return {
    isSuccess: true,
    data: data,
  };
}

/**
 * Update a user
 * @param {User} user - the user to update
 * @param {number} id - the id of the user to update
 * @returns {Promise<DataEnvelope<User>>} - resolves with the updated user
 */
async function update(id, user) {
  const { data, error } = await connection.from("users").update({
    firstname: user.firstname,
    lastname: user.lastname,
    dob: user.dob,
    email: user.email,
    password: user.password,
    biography: user.biography,
    photo: user.photo,
    username: user.username,
    admin: user.admin,
    updatedAt: new Date().toISOString(),
  })
  return   {
      isSuccess: !error,
      message: error?.message,
      data: data,
    }
}

/**
 * Delete a user
 * @param {number} id - the id of the user to delete
 * @returns {Promise<DataEnvelope<User>>} - resolves with the deleted user
 */
async function remove(id) {
  const { data, error } = await connection
    .from("users")
    .delete()
    .eq("id", id)
    .select("*")
    .single();
  return [
    {
      isSuccess: !error,
      message: error?.message,
      data: data,
    },
  ];
}
async function seed() {
  for (const user of data.items) {
    await add(user);
  }
  return [
    {
      isSuccess: true,
      data: data.items,
    },
  ];
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
  seed,
};
