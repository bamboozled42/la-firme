"use client";
import ProjectCard from "./projectCard";
import { useSupabase } from "../providers";
import {  Project, Column, Beam, Wall, Ceiling} from "../../lib/utils";
import { useState, useEffect } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { useTranslation } from '../../i18n/client';
import { TypographyH2 } from "@/components/ui/typography";


export type ProjectDashboardType = Project & {
  // I don't think I need to pass in anything other than name
  architect: { first_name: string; last_name: string };
  walls: Wall[] ;
  columns: Column[];
  beams: Beam[];
  ceilings: Ceiling[];
};

export default function ProjectDashboard() {
  const {i18n, t} = useTranslation('common');

  const supabase = useSupabase();
  const [projects, setProjects] = useState<ProjectDashboardType[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);


  useEffect(() => {
    const fetchProjects = async () => {
    let { data: projects, error } = await supabase
    .from('projects')
    .select(`
    *,
    architect:architect_id(first_name, last_name),
    walls(name, height, length),
    columns(name, height, condition),
    beams(name, length),
    ceilings(cracks, dimension_x, dimension_y)`);

    if (error) {
      setError(error);
    }
    else {
      setProjects(projects as unknown as ProjectDashboardType[]);
    }
    }
    fetchProjects();
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
              />
            ))
          )
        }
      </div>
    </div>
  );
}
