import stripePackage from "stripe";
import handler from "./libs/handler-lib";
import { calculateCost } from "./libs/billing-lib";

export const main = handler(async (event, context) => {
  const { storage, source } = JSON.parse(event.body);
  //   console.log(source);
  const amount = calculateCost(storage);
  const description = "Scratch charge";

  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);
  //   const stripe = stripePackage(process.env.stripeSecretKey); <== Getting undefined secret key when following tutorial.
  // Must be an error between serverless.yml and .env
  console.log(process.env.STRIPE_SECRET_KEY);
  console.log(process.env.stripeSecretKey);
  //   console.log(stripe);
  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "usd",
  });
  return { status: true };
});
