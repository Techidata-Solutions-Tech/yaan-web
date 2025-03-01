import Waitlist from '@/models/WaitList';
import connectToDatabase from '@/utils/mongoose';

export async function POST(request) {
  await connectToDatabase();

  const { name, phone, email, appType } = await request.json();

  try {
    const user = new Waitlist({ name, phone, email, appType });
    await user.save();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}