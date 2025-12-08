import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount, planId, currency = "INR" } = await request.json();

    if (!amount || !planId) {
      return NextResponse.json({ error: "Amount and Plan ID are required" }, { status: 400 });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: amount.toString(),
      currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: user.id,
        planId: planId
      }
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (err) {
    console.error("Razorpay Order Error:", err);
    return NextResponse.json({ error: "Failed to create Razorpay order" }, { status: 500 });
  }
}
