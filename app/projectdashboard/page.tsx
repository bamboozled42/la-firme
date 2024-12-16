"use client";
import { PostgrestError } from "@supabase/supabase-js";
import { useTranslation } from '../../i18n/client';
import { TypographyH2 } from "@/components/ui/typography";

import { useEffect, useState } from "react";
import { Beam, Ceiling, Column, Project, Wall } from "../../lib/utils";
import { useSupabase } from "../providers";
import AddProjectCard from "./addProjectCard";
import ProjectCard from "./projectCard";

export type ProjectDashboardType = Project & {
  // I don't think I need to pass in anything other than name
  architect: { first_name: string; last_name: string };
  walls: Wall[];
  columns: Column[];
  beams: Beam[];
  ceilings: Ceiling[];
};

export default function ProjectDashboard() {
  const {i18n, t} = useTranslation('common');

  const supabase = useSupabase();
  const [projects, setProjects] = useState<ProjectDashboardType[] | null>(null);
  const [architects, setArchitects] = useState<Record<string, number>>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      const { data: userData, error: userError } = await supabase.from("users").select("*").eq("id", user.id).single();

      if (userData?.role == "admin") {
        setIsAdmin(true);
        let { data: projects, error } = await supabase.from("projects").select(`
        *,
        architect:architect_id(first_name, last_name),
        walls(name, height, length),
        columns(name, height, condition),
        beams(name, length),
        ceilings(cracks, dimension_x, dimension_y)`);

        if (error) {
          setError(error);
        } else {
          setProjects(projects as unknown as ProjectDashboardType[]);
        }
      } else {
        let { data: projects, error } = await supabase
          .from("projects")
          .select(
            `
            *,
            architect:architect_id(first_name, last_name),
            walls(name, height, length),
            columns(name, height, condition),
            beams(name, length),
            ceilings(cracks, dimension_x, dimension_y)`,
          )
          .eq("architect_id", user.id);
        if (error) {
          setError(error);
        } else {
          setProjects(projects as unknown as ProjectDashboardType[]);
        }
      }
    };
    const fetchArchitects = async () => {
      const { data, error } = await supabase.from("users").select("id, first_name, last_name");
      if (error) {
        console.error(error);
      } else {
        const architectsObj = data.reduce((acc: Record<string, number>, user: any) => {
          const fullName = `${user.first_name} ${user.last_name}`;
          acc[fullName] = user.id;
          return acc;
        }, {});
        setArchitects(architectsObj);
      }
    };
    
    fetchProjects();
    fetchArchitects();
  }, [supabase]);

  if (error) {
    return <div>Error loading projects...</div>;
  }

  return (
    <div>
      <TypographyH2 className="text-center font-bold">{t('projectDashboard')}</TypographyH2>
      <div className="flex flex-wrap justify-center">
        {
          projects === null ? (
            <div>Loading...</div>
          ) : projects.length === 0 ? (
            <div>No projects found.</div>
          ) : (
            projects?.map((project: ProjectDashboardType) => (
              <ProjectCard
                key={project.id}
                project={project}
                architects={architects}
                isAdmin={isAdmin}
              />
            ))
          )
        }
      </div>
    </div>
  );
}
