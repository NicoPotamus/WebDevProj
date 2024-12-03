const { getConnection } = require("./supabase");
const connection = getConnection();

/**
 * @typedef {Object} Following
 * @property {number} user_id
 * @property {number} following_user_id
 */

/**
 * Add a following relationship
 * @param {number} userId - The ID of the user who is following
 * @param {number} followingUserId - The ID of the user being followed
 * @returns {Promise<DataEnvelope<Following>>} - Resolves with the added following relationship
 */
async function add(userId, followingUserId) {
    const { data, error } = await connection
        .from("following")
        .insert({
            user_id: userId,
            following_user_id: followingUserId
        })
        .select("*")
        .single();

    if (error) {
        return {
            isSuccess: false,
            error: error.message
        };
    }

    return {
        isSuccess: true,
        data: data
    };
}

/**
 * Remove a following relationship
 * @param {number} userId - The ID of the user who is following
 * @param {number} followingUserId - The ID of the user being followed
 * @returns {Promise<DataEnvelope<null>>} - Resolves with null if the operation is successful
 */
async function remove(userId, followingUserId) {
    const { error } = await connection
        .from("following")
        .delete()
        .eq("user_id", userId)
        .eq("following_user_id", followingUserId);

    if (error) {
        return {
            isSuccess: false,
            error: error.message
        };
    }

    return {
        isSuccess: true,
        data: null
    };
}

/**
 * Get the list of users a specific user is following
 * @param {number} userId - The ID of the user
 * @returns {Promise<DataListEnvelope<Following>>} - Resolves with the list of following relationships
 */
async function getFollowing(userId) {
    const { data, error } = await connection
        .from("following")
        .select("*")
        .eq("user_id", userId);

    if (error) {
        return {
            isSuccess: false,
            error: error.message
        };
    }

    return {
        isSuccess: true,
        data: data
    };
}

module.exports = {
    add,
    remove,
    getFollowing
};