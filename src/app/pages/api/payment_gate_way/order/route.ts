import { NextRequest, NextResponse } from "next/server";
import SSLCommerz from "sslcommerz-lts";


const store_id = process.env.SSLCOMMERZ_STORE_ID as string;
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD as string;
const is_live = false; // Set to true for production

const sslcz = new SSLCommerz(store_id, store_passwd, is_live);

export async function POST(req: NextRequest) {
  try {
    const { amount, cus_name, cus_email, cus_phone } = await req.json();

    const transaction_id = `txn_${Date.now()}`;
    const data = {
      total_amount: amount,
      currency: "BDT",
      tran_id: transaction_id,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sslcommerz/success`,
      fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sslcommerz/fail`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sslcommerz/cancel`,
      ipn_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sslcommerz/ipn`,
      cus_name,
      cus_email,
      cus_phone,
      product_name: "Test Product",
      product_category: "General",
      product_profile: "general",
    };

    const response = await sslcz.init(data);
    return NextResponse.json({ url: response.GatewayPageURL });
  } catch (error) {
    return NextResponse.json({ error: "Payment initialization failed" }, { status: 500 });
  }
}
