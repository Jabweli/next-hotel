import { createBooking, updateHotelRoom } from "@/lib/apis";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const checkout_session_completed = "checkout.session.completed";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-10-28.acacia",
});

export async function POST(req: Request) {
  const reqBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error: any) {
    return new NextResponse(`Webhook error: ${error}`, { status: 500 });
  }

  // load the event
  switch (event.type) {
    case checkout_session_completed:
      const session = event.data.object as Stripe.Checkout.Session;
      // console.log(session);

      const metadata = session.metadata as {
        adults: string;
        checkinDate: string;
        checkoutDate: string;
        children: string;
        hotelRoom: string;
        numberOfDays: string;
        user: string;
        discount: string;
        totalPrice: string;
      };

      const {
        adults,
        checkinDate,
        checkoutDate,
        children,
        hotelRoom,
        numberOfDays,
        user,
        discount,
        totalPrice,
      } = metadata;

      await createBooking({
        adults: Number(adults),
        checkinDate,
        checkoutDate,
        children: Number(children),
        hotelRoom,
        numberOfDays: Number(numberOfDays),
        discount: Number(discount),
        totalPrice: Number(totalPrice),
        user,
      });

      //   Update hotel Room
      await updateHotelRoom(hotelRoom);

      // create booking
      return NextResponse.json("Booking successful", {
        status: 200,
        statusText: "Booking Successful",
      });
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json("Booking successful", {
    status: 200,
    statusText: "Event received",
  });
}
