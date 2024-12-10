"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type User, type Users } from "../../lib/utils";
import { useSupabase } from "../providers";

interface UserTableProps {
  users: Users;
  currentUserId: string;
}

const UserTable = ({ users, currentUserId }: UserTableProps) => {
  const supabase = useSupabase();

  const deleteUser = async (userInfo: any) => {
    if (userInfo.role === "admin") return;
    console.log(userInfo);

    try {
      if (userInfo.role === "architect") {
        const { data: projects, error: projectsError } = await supabase
          .from("projects")
          .select()
          .eq("architect_id", userInfo.id);

        if (projectsError) throw projectsError;

        if (projects?.length) {
          for (const project of projects) {
            const { error: updateError } = await supabase
              .from("projects")
              .update({ architect_id: currentUserId })
              .eq("id", project.id);
            if (updateError) throw updateError;
          }
        }
      }

      const { error: whitelistError } = await supabase.from("whitelist_users").delete().eq("email", userInfo.email);
      if (whitelistError) throw whitelistError;

      const { error: userError } = await supabase.from("users").delete().eq("id", userInfo.id);
      if (userError) throw userError;

      console.log("User deleted successfully:", userInfo.id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="w-[50px]">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((currentUser: User) => (
            <TableRow key={currentUser.id}>
              <TableCell>
                {currentUser.first_name} {currentUser.last_name}
              </TableCell>
              <TableCell>{currentUser.email}</TableCell>
              <TableCell>{currentUser.role}</TableCell>
              {currentUser.role !== "admin" && (
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        ...
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="cursor-pointer text-red-600"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this user?")) {
                            deleteUser(currentUser);
                          }
                        }}
                      >
                        Delete user
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem className="text-black-600 cursor-pointer" onClick={() => {}}>
                        Edit user
                      </DropdownMenuItem> */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
