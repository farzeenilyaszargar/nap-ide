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

async function seedPlans() {
    console.log('Seeding plans...');
    const timeout = setTimeout(() => {
        console.error('Timeout: Script took too long');
        process.exit(1);
    }, 10000);

    const plans = [
        {
            name: 'Basic Plan',
            description: 'Monthly Basic Plan',
            price_inr: 200, // ₹2
            token_limit: 10000,
            request_limit: 1000,
            device_limit: 2
        },
        {
            name: 'Pro Plan',
            description: 'Monthly Pro Plan',
            price_inr: 500, // ₹5
            token_limit: 100000,
            request_limit: 10000,
            device_limit: 5
        },
        {
            name: 'Basic Annual',
            description: 'Annual Basic Plan',
            price_inr: 2400, // ₹24
            token_limit: 120000,
            request_limit: 12000,
            device_limit: 2
        },
        {
            name: 'Pro Annual',
            description: 'Annual Pro Plan',
            price_inr: 6000, // ₹60
            token_limit: 1200000,
            request_limit: 120000,
            device_limit: 5
        }
    ];

    for (const plan of plans) {
        const { data, error } = await supabase
            .from('plans')
            .upsert(plan, { onConflict: 'name' })
            .select();

        if (error) {
            console.error(`Error Upserting ${plan.name}:`, error.message);
        } else {
            console.log(`Upserted ${plan.name}:`, data);
        }
    }

    clearTimeout(timeout);
    console.log('Seeding complete.');
}

seedPlans();
