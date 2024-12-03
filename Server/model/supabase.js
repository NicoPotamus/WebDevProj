
require("dotenv").config()
const { createClient } = require("@supabase/supabase-js")

/**
 * @typedef {import('../../Client/src/models/supabase').Database } ProgramDatabase
 * @typedef {import('@supabase/supabase-js').SupabaseClient<ProgramDatabase>} ProgramClient
 */

module.exports = {
    /**
     * @returns {ProgramClient}
     */
    getConnection() {
        return createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SECRET_KEY
        )
    },
}
