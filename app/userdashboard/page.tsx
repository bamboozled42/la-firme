import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import AddUser from "./addUser";
import UserTable from "./userTable";

export default async function Dashboard() {
  // Create supabase server component client and obtain user session from Supabase Auth
  const supabase = createServerSupabaseClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    // this is a protected route - only users who are signed in can view this route

    /*
      Be careful when protecting pages. The server gets the user session from the cookies, which can be spoofed by anyone.
      Always use supabase.auth.getUser() to protect pages and user data.
      Never trust supabase.auth.getSession() inside server code such as middleware. It isn't guaranteed to revalidate the Auth token.
      It's safe to trust getUser() because it sends a request to the Supabase Auth server every time to revalidate the Auth token.
    */

    redirect("/");
  }
  // user is yourself, users is everyone
  const { data: user } = await supabase.from("users").select("*").eq("id", authUser.id).single();

  // If the user is not an admin, redirect them to the home page
  if (!user) {
    redirect("/");
  }
  if (user && user.role !== "admin") {
    redirect("/");
  }
  const currentUserId = user.id;

  // Get all users from the database
  const { data: users, error } = await supabase.from("users").select("*");
  // and clients
  const { data: clients } = await supabase.from("clients").select("*");

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <h1 style={{ marginLeft: 10, marginBottom: 10 }}> Staff Table</h1>
        <AddUser AdminUser={user as any} />
      </div>
      <UserTable tableType="staff" users={users} currentUserId={currentUserId} />
      <div className="mb-5 mt-10 flex items-center justify-between">
        <h1 style={{ marginLeft: 10, marginBottom: 10 }}>Client Table</h1>
      </div>
      <UserTable tableType="clients" users={clients} currentUserId={currentUserId} />
    </div>
  );
}
