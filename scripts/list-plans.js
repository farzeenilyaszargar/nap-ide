const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Error: Missing Env Variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false }
});

async function listPlans() {
    console.log('Listing plans...');
    // Set a timeout to kill the process if it hangs
    const timeout = setTimeout(() => {
        console.error('Timeout: Script took too long');
        process.exit(1);
    }, 10000);

    const { data, error } = await supabase.from('plans').select('*');

    clearTimeout(timeout);

    if (error) {
        console.error('Error listing plans:', error);
    } else {
        console.log('Plans found:', data);
    }
}

listPlans();
