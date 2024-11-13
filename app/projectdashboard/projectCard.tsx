"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProjectDashboardType } from "./page";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { TypographyH2 } from "@/components/ui/typography";

// import ContentBlob from "./contentBlob";

export default function ProjectCard({
  project,
}: {
  project: ProjectDashboardType;
}) {
  const router = useRouter();
  const { i18n, t } = useTranslation('common');

  const handleClick = (projectId: number) => {
    router.push(`/sitesurvey/${projectId}`);
  };

  return (
    <div className="m-4 w-72 min-w-72 flex-none rounded-lg border-2 p-5 shadow">
      <TypographyH2 className="text-center text-2xl">{project.title}</TypographyH2>
      <h4 className="mt-4 text-md">
        <span className="text-gray-400">{t("start_date")}:</span> {project.start_date}
      </h4>
      <h4 className="mt-1 text-md">
        <span className="text-gray-400">{t("assigned_architect")}:</span> {project.architect.first_name} {project.architect.last_name}
      </h4>
      <h4 className="mt-1 text-md">
        <span className="text-gray-400">{t("location")}:</span> {project.location}
      </h4>
      <h4 className="mt-1 text-md">
        <span className="text-gray-400">{t("clients")}:</span> {project.client}
      </h4>
      <h4 className="mt-1 text-md">
        <span className="text-gray-400">{t("status")}:</span> {project.status}
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
