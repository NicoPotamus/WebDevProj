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
    .select("*")
    .eq("id", id)
    .single();
  return {
    isSuccess: !error, //turn obj into boolean value
    message: error?.message,
    data: data,
  };
}

/**
 * login a  user
 * @param {string} email - the email of the user
 * @param {string} password - the password of the user
 * @returns {Promise<DataEnvelope<User>>} - resolves with the user
 */
async function login(email, password) {
  const { data, error } = await connection
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();
  if(!data) {
    return {
      isSuccess: false,
      message: "Invalid email or password"
    }
  }
  return {
    isSuccess: !error, //turn obj into boolean value
    data: data,
    message: error?.message,
  };
}
/**
 * Add a user
 * @param {User} user - the user to add
 * @returns {Promise<DataEnvelope<User>>} - resolves with the added user
 */
async function add(user) {
  const statsData =  await statsModel.add(user.stats) 
  const statsId = statsData.data.id

  const { data, error } = await connection
    .from("users")
    .insert([
      {
        firstName: user.firstName,
        lastName: user.lastName,
        dob: user.dob,
        email: user.email,
        password: user.password,
        biography: user.biography,
        photo: user.photo,
        username: user.username,
        admin: user.admin,
        stats_id: statsId
      },
    ])
    .select("*")
    .single();
    const userId = data.id

    if (user.workouts) {
      for (const workout of user.workouts) {
        await workoutModel.add(data.id, workout)
      }
    }

  return {
    isSuccess: !error,
    message: error?.message,
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
    firstName: user.firstName,
    lastName: user.lastName,
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
  login
};
