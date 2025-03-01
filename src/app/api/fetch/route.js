import Waitlist from '@/models/WaitList';
import connectToDatabase from '@/utils/mongoose';

export async function GET() {
  await connectToDatabase();

  try {
    const users = await Waitlist.find({});
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}