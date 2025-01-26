"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "../../i18n/client";
import { type User } from "../../lib/utils";
import { useSupabase } from "../providers";

type AddUserSchema = {
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  address?: string;
};

type AddUserProps = {
  AdminUser: User;
};

const AddUser: React.FC<AddUserProps> = ({ AdminUser }) => {
  const router = useRouter();
  const supabase = useSupabase();
  const [open, setOpen] = React.useState(false);

  const { t } = useTranslation("common");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<AddUserSchema>({
    defaultValues: {
      email: "",
      role: "",
      first_name: "",
      last_name: "",
      address: "",
    },
  });

  const role = watch("role");
  useEffect(() => {
    if (role !== "client") {
      setValue("address", "");
    }
  }, [role, setValue]);

  const onSubmit = async (data: any) => {
    const { email, role, first_name, last_name, address } = data;

    try {
      // Validate address for client role if needed
      if (role === "client") {
        const { error: addressError } = await supabase.from("clients").insert({
          first_name,
          last_name,
          email,
          address,
        });

        if (addressError) {
          throw new Error(`Supabase error: ${addressError.message}`);
        }

        reset();
        setOpen(false);
        router.refresh();
        return;
      }

      // Insert into whitelist_users
      const { error: supabaseError } = await supabase.from("whitelist_users").insert({
        email,
        role,
        first_name,
        last_name,
      });

      if (supabaseError) {
        throw new Error(`Supabase error: ${supabaseError.message}`);
      }
      if (
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      ) {
        const emailData = {
          service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
          template_params: {
            from_email: AdminUser.email,
            from_name: AdminUser.first_name + " " + AdminUser.last_name,
            to_name: first_name + " " + last_name,
            to_email: email,
            message: `Registro de nuevo usuario Nombre: ${first_name} ${last_name}
            Por favor inicie sesión usando este correo electrónico.
            Registro aquí: localhost:3000/
            `,
          },
        };

        // send email through emailjs
        try {
          const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send", emailData);
          console.log(res.data);
        } catch (error) {
          console.error(error);
        }
      }

      // reset form and close the dialogue
      reset();
      setOpen(false);
      router.refresh();

      console.log("Successfully submitted form");
    } catch (error) {
      // error stuff
      console.error("Error in form submission", error);
      return;
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className={"bg-green-500 text-green-50"}>
            <Icons.add className="mr-2 h-4 w-4" />
            <span className="mr-1">{t("inviteUser")}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen w-5/6 overflow-y-auto p-8 pt-10">
          <DialogHeader>
            <DialogTitle>{t("inviteUser")}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              handleSubmit(onSubmit)(e);
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                {t("firstName")}
              </label>
              <input
                id="first_name"
                {...register("first_name", {
                  required: t("firstNameRequired"),
                })}
                className="mt-1 block w-full rounded-md border-gray-300 bg-white/10 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder={t("firstNamePlaceholder")}
              />

              {errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name.message}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                {t("lastName")}
              </label>
              <input
                id="last_name"
                {...register("last_name", {
                  required: t("lastNameRequired"),
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder={t("lastNamePlaceholder")}
              />
              {errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t("email")}
              </label>
              <input
                id="email"
                {...register("email", {
                  required: t("emailRequired"),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t("invalidEmail"),
                  },
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder={t("emailPlaceholder")}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            {/* Role, is this necessary */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                {t("role")}
              </label>
              <select
                id="role"
                {...register("role", {
                  required: t("roleRequired"),
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="" disabled>
                  {t("rolePlaceholder")}
                </option>
                <option value="admin">{t("admin")}</option>
                <option value="architect">{t("architect")}</option>
                <option value="client">{t("client")}</option>
              </select>
              {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
            </div>

            {/* Address */}
            {role == "client" && (
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  {t("address")}
                </label>
                <input
                  id="address"
                  {...register("address", {
                    required: role === "client" ? t("addressRequired") : false,
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder={t("addressPlaceholder")}
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
              </div>
            )}

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
                {t("sendInvite")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AddUser;
