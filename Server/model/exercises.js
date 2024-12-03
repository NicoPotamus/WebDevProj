const { getConnection } = require("./supabase");
const connection = getConnection();

/**
 * @tmeplate T
 * @typedef {import("../../Client/src/model/dataEnvelope.ts").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/model/dataEnvelope.ts").DataListEnvelope} DataListEnvelope
 * @typedef {import("../../Client/src/model/exercises.ts").Exercise} Exercise
 */

/**
 * get all exercises
 * @returns {Promise<DataListEnvelope<Exercise>>} - resolves with all exercises
 */
async function getAll() {
    const {data, error, count} = await connection  
        .from("exercises")
        .select("*", {count: "estimated"})

    return {
        isSuccess: !error,
        message: error?.message,
        data: data,
        total: count,
    }
}

/**
 * get an exercise by id
 * @returns {Promise<DataEnvelope<Exercise>>} - resolves with the exercise
 */
async function getById(id) {
    const {data, error} = await connection
        .from("exercises")
        .select("*")
        .eq("id", id)
        .single()

    return {
        isSuccess: !!data,
        data: data,
    }
}
/**
 * 
 * @param {Exercise} exercise 
 * @returns {Promise<DataEnvelope<Exercise>>}
 */
async function add(exercise) {
    const {data: statsData, error: statsError} = await connection
        .from("exercises")
        .insert({
            name : exercise.name,
            equipment : exercise.equipment,
            category : exercise.category,
            instructions : exercise.instructions,
            primaryMuscles : exercise.primaryMuscles
        })
        .select("id")
        .single()

    return {
        isSuccess: !statsError,
        message: statsError?.message,
        data: statsData,
    }
}

/**
 * update user
 * @param {Number} id 
 * @param {User} exercise 
 * @returns {Promise<DataEnvelope<Exercise>>}
 */
async function update(id, exercise) {
    const {data, error} = await connection
        .from("exercises")
        .update(exercise)
        .eq("id", id)

    return {
        isSuccess: !error,
        message: error?.message,
        data: data,
    }
}

/**
 * 
 * @param {Number} id 
 * @returns {Promise<DataEnvelope<Exercise>>}
 */
async function remove(id) {
    const {data, error} = await connection
        .from("exercises")
        .delete()
        .eq("id", id)
        .select("*")
        .single();

    return {
        isSuccess: !error,
        message: error?.message,
        data: data,
    }
}

async function seed() {
    for (const exercise of data.items) {
        await add(exercise)
    }
    console.log('all seeded')
    return {
        isSuccess: true,
        data: data.items
    }
}

module.exports = {
    getAll,
    getById,
    add,
    update,
    remove,
    seed
}