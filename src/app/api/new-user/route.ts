import { User } from "@/types/user";
import { supabase } from "@/utils/supabase";
import { NextApiResponse } from "next";

export async function POST(
  req: { json: () => any; body: any },
  _res: NextApiResponse
) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return;
  }

  const fullData = supabase.from("users");
  const dataLength = (await fullData.select("*")).data?.length;
  const data = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("password", password);

  const valid =
    data.data && data.data.length > 0
      ? data.data.some((item) => {
          if (item.email === email && item.password === password) {
            return false;
          } else {
            return true;
          }
        })
      : true;

  if (!valid)
    return new Response(JSON.stringify({ message: "User already exists" }), {
      headers: { "Content-Type": "application/json" },
      status: 404,
      statusText: "User already exists",
    });

  try {
    const newUser: User = {
      id: dataLength ? dataLength + 1 : 1,
      email,
      password,
    };

    await fullData.insert([newUser]);

    return new Response(JSON.stringify(newUser), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    console.log(error);
  }
}
