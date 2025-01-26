"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useTranslation } from "../../i18n/client";
import { useSupabase } from "../providers";

interface UserTableProps {
  tableType?: string;
  users?: any;
  currentUserId: string;
}

const UserTable = ({ tableType, users, currentUserId }: UserTableProps) => {
  const router = useRouter();
  const supabase = useSupabase();

  const { t } = useTranslation("common");

  const deleteUser = async (userInfo: any) => {
    if (userInfo.role === "admin") return;

    try {
      if (tableType === "clients") {
        const { error } = await supabase.from("clients").delete().eq("id", userInfo.id);
        if (error) throw error;
        return;
      }

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
      router.refresh();
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
            <TableHead className="w-[200px]">{t("name")}</TableHead>
            <TableHead className="w-[400px]">{t("email")}</TableHead>
            <TableHead className="w-[200px] text-left">{tableType === "clients" ? t("address") : ""}</TableHead>
            <TableHead className="w-[100px] text-right">{tableType !== "admin" ? t("edit") : ""}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((currentUser: any) => (
            <TableRow key={currentUser.id}>
              <TableCell className="w-[200px]">
                {currentUser.first_name} {currentUser.last_name}
              </TableCell>
              <TableCell className="w-[400px]">{currentUser.email}</TableCell>
              <TableCell className="w-[200px] text-left">
                {tableType === "clients" ? currentUser.address : ""}
              </TableCell>
              {currentUser.role !== "admin" && (
                <TableCell className="w-[100px] text-right">
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
                          if (confirm(t("confirmDeleteUser"))) {
                            deleteUser(currentUser);
                          }
                        }}
                      >
                        {t("deleteUser")}
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
