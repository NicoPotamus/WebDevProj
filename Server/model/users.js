
const data = require("../data/users.json")

/**
 * @tmeplate T
 * @typedef {import("../../Client/src/model/dataEnvelope.ts").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/model/dataEnvelope.ts").DataListEnvelope} DataListEnvelope
 */


/**
 * Get all users
 * @returns {Promise<DataListEnvelope<User>>} - resolves with all users
 */
async function getAll() {
    return {
        isSuccess: true,
        data: data.items,
        total: data.items.length
    }
}

/**
 * get a user by id
 * @returns {Promise<DataEnvelope<User>>} - resolves with the user
 */
async function getById(id) {
    const item = data.items.find(item => item.id == id)
    return {
        isSuccess: !!item,//turn obj into boolean value
        data: item
    }
}

/**
 * Add a user
 * @param {User} user - the user to add
 * @returns {Promise<DataEnvelope<User>>} - resolves with the added user
 */
async function add(user) {
    user.id = data.items.reduce((prev, x) => (x.id > prev ? x.id : prev), 0) + 1
    return {
        isSuccess: true,
        data: user
    }
}

/**
 * Update a user
 * @param {User} user - the user to update
 * @param {number} id - the id of the user to update
 * @returns {Promise<DataEnvelope<User>>} - resolves with the updated user 
 */
async function update(id, user) {
    const userToUpate = await getById(id)
    Object.assign(userToUpate, user)
    return [
        {
            isSuccess: true,
            data: userToUpate
        }
    ]
}

/**
 * Delete a user
 * @param {number} id - the id of the user to delete
 * @returns {Promise<DataEnvelope<User>>} - resolves with the deleted user
 */
async function remove(id) {
    const userToRemove = getById(id)
    data.items = data.items.filter(item => item.id != id)
    return {
        isSuccess: true,
        data: userToRemove
    }
}

module.exports = {
    getAll,
    getById,
    add,
    update,
    remove
}