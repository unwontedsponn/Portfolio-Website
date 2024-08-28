// To create a payment intent when the user proceeds to checkout.
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

export async function POST(req: NextRequest) {
  try {
    const { amount, userId } = await req.json(); // Ensure you receive the userId here

    if (!userId) {
      throw new Error('User ID is required');
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents (e.g., 1000 for $10.00)
      currency: 'usd', // Set the currency
      payment_method_types: ['card'], // Specify that payment is via card
      metadata: { userId }, // Include userId in metadata
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } 
  catch (error) {
    const message = (error as Error).message || 'An unknown error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}