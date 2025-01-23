import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type Users } from "../../lib/utils";
import { useSupabase } from "../providers";

type AddProjectSchema = {
  title: string;
  location: string;
  start_date: string;
  architect_id: string;
  client: string;
  status: string;
  description: string;
};

const AddProjectCard: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddProjectSchema>({
    defaultValues: {
      title: "",
      architect_id: "",
      location: "",
      start_date: "",
      client: "",
      status: "",
      description: "",
    },
  });

  const supabase = useSupabase();
  const [architects, setArchitects] = useState<Users[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchArchitects = async () => {
      const { data: architects, error } = await supabase.from("users").select("*").eq("role", "architect");

      if (error) {
        console.error("Error fetching architects:", error);
      } else {
        setArchitects(architects as Users[]);
      }
    };

    fetchArchitects();
  }, [supabase]);

  // projects need a floor, title, location, start date, architect, client, status
  const onSubmit = async (data: AddProjectSchema) => {
    const { data: project, error } = await supabase.from("projects").insert(data).select("*").single();

    if (error) {
      console.error("Error adding project:", error);
    } else {
      // idk if reset is needed but its nice to have for now if this needs to be changed
      reset();
      const { data: floor, error: floor_error } = await supabase.from("floors").insert({
        projectId: project.id,
        name: "Floor 1",
      });
      console.log("Floor:", floor);
      if (floor_error) {
        console.error("Error adding floor:", floor_error);
      }

      router.push(`/sitesurvey/${project.id}`);
    }
  };

  return (
    <div className="m-4 flex w-72 min-w-72 flex-none items-center justify-center rounded-lg p-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className={"bg-green-500 text-green-50"}>
            <Icons.add className="mr-2 h-4 w-4" />
            <span className="mr-1">{"Add"}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen w-5/6 overflow-y-auto p-8 pt-10">
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              handleSubmit(onSubmit)(e);
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                id="title"
                {...register("title")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
            </div>

            {/* Architect */}
            <div>
              <label htmlFor="architect_id" className="block text-sm font-medium text-gray-700">
                Architect
              </label>
              <select
                id="architect_id"
                {...register("architect_id")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="">Select Architect</option>
                {architects.map((architect) => (
                  <option key={architect.id} value={architect.id}>
                    {architect.first_name} {architect.last_name}
                  </option>
                ))}
              </select>
              {errors.architect_id && <p className="mt-1 text-sm text-red-600">{errors.architect_id.message}</p>}
            </div>

            {/* Client */}
            <div>
              <label htmlFor="client" className="block text-sm font-medium text-gray-700">
                Client
              </label>
              <input
                id="client"
                {...register("client")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              {errors.client && <p className="mt-1 text-sm text-red-600">{errors.client.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                id="description"
                {...register("description")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              {errors.client && <p className="mt-1 text-sm text-red-600">{errors.client.message}</p>}
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                id="location"
                {...register("location")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
            </div>

            {/* Start Date */}
            <div>
              <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                id="start_date"
                {...register("start_date")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
              {errors.start_date && <p className="mt-1 text-sm text-red-600">{errors.start_date.message}</p>}
            </div>

            {/* Status, is this necessary */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                {...register("status")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="">Select status</option>
                <option value="In Progress">In Progress</option>
              </select>
              {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              {/* <Button type="button" variant="secondary" onClick={onCancel}>
                Cancel
              </Button> */}
              <Button
                type="submit"
                onClick={() => {
                  console.log("Button clicked");
                }}
              >
                Create Project
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
// projects need a floor,

export default AddProjectCard;
