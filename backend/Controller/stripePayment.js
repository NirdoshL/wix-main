require("dotenv").config();
const Stripe = require("stripe");
const Order = require("../Model/orderModel");
// const ErrorHandler = require("../Utils/errorClass");
const asyncHandler = require("express-async-handler");
const { tryCatch } = require("../Utils/tryCatchController");

const stripe = Stripe(process.env.STRIPE_KEY);

// paymet setUp for Stripe
exports.stripePayment = asyncHandler(
  tryCatch(async (req, res, next) => {
    const { userId, cartItems, email, shippingCharge, totalAmount } =
      await req.body;
    const customer = await stripe.customers.create({
      email: email,
      metadata: {
        userId: userId,
        cart: JSON.stringify(cartItems),
      },
    });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Replace with your desired amount in cents
      currency: "usd",
      customer: customer.id,
    });
    console.log(paymentIntent);
    // Products maping to stripe
    const line_items = cartItems.map((item) => {
      {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              metadata: {
                id: item._id,
              },
            },
            unit_amount:
              Math.round(
                item.variationPrice ? item.variationPrice : item.price
              ) * 100,
          },
          quantity: item.quantity,
        };
      }
    });
    // creating checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: shippingCharge * 100,
              currency: "usd",
            },
            display_name: "Expected Hour",
            // Delivers in 2-5 business hrs
            delivery_estimate: {
              minimum: {
                unit: "hour",
                value: 2,
              },
              maximum: {
                unit: "hour",
                value: 5,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      line_items,
      mode: "payment",
      client_reference_id: paymentIntent.id,
      customer: customer.id,
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
    res.send({ url: session.url });
    next();
  })
);

// Create order function

const createOrder = async (customer, data) => {
  const Items = JSON.parse(customer.metadata.cart);
  const products = Items.map((item) => {
    return {
      productId: item.id,
      quantity: item.quantity,
      name: item.name,
      resID: item.resID,
      variation: item.variation,
      variationPrice: item.variationPrice,
    };
  });

  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });

  try {
    await newOrder.save();
  } catch (err) {
    console.log(err);
  }
};

// Stripe webhoook
exports.stripeHook_PaymentCapture = asyncHandler(
  tryCatch(async (req, res) => {
    const endpointSecret = process.env.STRIPE_WEB_HOOK;
    const sig = req.headers["stripe-signature"];
    let event;
    let data;

    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
      data = event.data.object;
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle the all the event
    switch (event.type) {
      case "payment_intent.succeeded": {
        const email = data.receipt_email;
        const paymentIntent = await stripe.paymentIntents.retrieve(data.id);
        console.log(paymentIntent);
        // const cardLastFour =
        // data.charges.data[0].payment_method_details.card.last4;

        console.log(`PaymentIntent was successful for ${email}!`);
        // console.log(`Last four digits of the card: ${cardLastFour}`);
        break;
      }
      case "checkout.session.completed": {
        try {
          await stripe.customers
            .retrieve(data.customer)
            .then(async (customer) => {
              try {
                // Get the customer
                console.log("CUSTOMER: ", customer);
                await createOrder(customer, data);
              } catch (err) {
                console.log("Error1" + `${err}`);
              }
            })
            .catch((err) => console.log("Error2" + `${err}`));
        } catch (error) {
          console.log("Error3" + `${err}`);
        }
      }
    }
    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true });
  })
);

// Incase of error

// exports.stripeHook_PaymentCapture = asyncHandler(
//   tryCatch(async (req, res, next) => {
//     console.log("Body ", req.rawBody);
//     let data, eventType;
//     let event;
//     const StripeSecret = process.env.STRIPE_WEB_HOOK;

//     // Check if webhook signing is configured.
//     if (StripeSecret) {
//       // Retrieve the event by verifying the signature using the raw body and secret.
//       let signature = req.headers["stripe-signature"];
//       try {
//         console.log("Config Success");
//         event = stripe.webhooks.constructEvent(
//           req.rawBody,
//           signature,
//           StripeSecret
//         );
//       } catch (err) {
//         console.log("⚠️  Webhook signature verification failed.", err);
//         return res.status(400).json({
//           success: false,
//           message: `Webhook Error: ${err.message}`,
//         });
//       }
//       data = event.data;
//       eventType = event.type;
//     } else {
//       console.log("Config Failed");
//       data = req.body.data;
//       eventType = req.body.type;
//     }

//     if (eventType === "payment_intent.succeeded") {
//       // Funds captured
//       // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
//       console.log("Payment captured");
//     } else if (eventType === "payment_intent.payment_failed") {
//       console.log("❌ Payment failed.");
//     } else if (eventType === "checkout.session.completed") {
//       if (data.customer) {
//         await stripe.customers
//           .retrieve(data.customer)
//           .then(async (customer) => {
//             try {
//               console.log(customer);
//               // CREATE THE ORDER USING CUSTOMER AND DATA
//               await createOrder(customer, data);
//             } catch (err) {
//               console.log(`${err}`);
//             }
//           })
//           .catch((err) => console.log(`${err}`));
//       } else {
//         console.log("data.customer is undefined or null");
//       }
//     }
//     res.status(200).json({
//       success: true,
//       message: "Payment Sucessed!",
//     });
//     next();
//   })
// );
