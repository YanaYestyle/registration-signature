import { supabase } from "@/utils/supabase";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
  try {
    //TODO: To refactor
    const { searchParams } = new URL(req.url!);
    const login = decodeURIComponent(searchParams.get("login") as string);
    const password = decodeURIComponent(searchParams.get("password") as string);
    const data = await supabase
      .from("users")
      .select("*")
      .eq("email", login)
      .eq("password", password);

    const valid = data.data?.some((item) => {
      if (item.email === login && item.password === password) {
        return true;
      } else {
        return false;
      }
    });

    return new Response(JSON.stringify({ valid }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw error;
  }
}
