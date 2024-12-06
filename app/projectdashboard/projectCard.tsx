"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectDashboardType } from "./page";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { TypographyH2 } from "@/components/ui/typography";
import { useSupabase } from "../providers";

// import ContentBlob from "./contentBlob";

export default function ProjectCard({
  project,
  architects,
  isAdmin
}: {
  project: ProjectDashboardType,
  architects: Record<string, number>,
  isAdmin: boolean
}) {
  const router = useRouter();
  const { i18n, t } = useTranslation('common');

  const supabase = useSupabase();
  const [currentArchitect, setCurrentArchitect] = useState<string>(project.architect.first_name + " " + project.architect.last_name);
  const [status, setStatus] = useState(project.status);

  const handleClick = (projectId: number) => {
    router.push(`/sitesurvey/${projectId}`);
  };

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);

    try {
      // Update the status in the database
      const { data, error } = await supabase
        .from("projects")
        .update({ status: newStatus })
        .eq("id", project.id);

      if (error) {
        throw error;
      }

      console.log(`Status updated to: ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleArchitectChange = async (newArchitect: string) => {
    try {
      const { data: projectData, error: fetchError } = await supabase
        .from("projects")
        .select("architect_history")
        .eq("id", project.id)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      const architectHistory = (projectData?.architect_history || "") + currentArchitect + ",";

      // Update the arhitect in the database
      const { data, error } = await supabase
        .from("projects")
        .update({ 
          architect_id: architects[newArchitect],
          architect_history: architectHistory
         })
        .eq("id", project.id);

      if (error) {
        throw error;
      }

      setCurrentArchitect(newArchitect);

      console.log(`Architect updated to: ${newArchitect}`);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  return (
    <div className="m-4 w-72 min-w-96 flex-none rounded-lg border-2 p-5 shadow">
      <TypographyH2 className="text-center text-2xl">{project.title}</TypographyH2>
      <h4 className="mt-4 text-md">
        <span className="text-gray-400">{t("start_date")}:</span> {project.start_date}
      </h4>
      {isAdmin ? (
        <h4 className="mt-4 text-md flex items-center">
          <span className="text-gray-400 mr-2">{t("assigned_architect")}:</span>
          {/* Architect dropdown */}
          <Select
            value={currentArchitect}
            onValueChange={handleArchitectChange}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue>{currentArchitect}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.entries(architects).map(([name]) => (
                  <SelectItem value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </h4>
      ) : (
        <h4 className="mt-1 text-md">
          <span className="text-gray-400">{t("assigned_architect")}:</span> {project.architect.first_name} {project.architect.last_name}
        </h4>
      )}
      <h4 className="mt-1 text-md">
        <span className="text-gray-400">{t("location")}:</span> {project.location}
      </h4>
      <h4 className="mt-1 text-md">
        <span className="text-gray-400">{t("clients")}:</span> {project.client}
      </h4>
      <h4 className="mt-1 text-md flex items-center">
        <span className="text-gray-400 mr-2">{t("status")}:</span>
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue>
              {status === "Assigned"
                ? t("assigned")
                : status === "In Progress"
                ? t("in_progress")
                : status === "Completed"
                ? t("completed")
                : t("status")}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Assigned">{t("assigned")}</SelectItem>
              <SelectItem value="In Progress">{t("in_progress")}</SelectItem>
              <SelectItem value="Completed">{t("completed")}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </h4>
      

      <div className="mt-4 flex justify-center">
        <Dialog>
          <DialogTrigger>
            <Button
              className="mr-1 row-span-1 w-full border bg-blue-700 text-blue-50"
            >
            {t("expand")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">{project.title}</DialogTitle>
            </DialogHeader>
            <DialogTitle>{t("description")}</DialogTitle>
            <DialogDescription>{project.description}</DialogDescription>
            <DialogTitle>{t("location")}</DialogTitle>
            <DialogDescription>{project.location}</DialogDescription>
            <DialogTitle>{t("clients")}</DialogTitle>
            <DialogDescription>{project.client}</DialogDescription>
          </DialogContent>
          <Button
            className="ml-1 row-span-1 w-full border bg-green-700 text-green-50"
            onClick={() => handleClick(project.id)}
          >
            {t("site_survey")}
          </Button>
        </Dialog>
      </div>
    </div>
  );
}
