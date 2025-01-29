import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslation } from "../../i18n/client";

export default function DeleteDialog({
  name,
  onDelete,
  children,
}: {
  name: string;
  onDelete: (deletedItem: any) => void;
  children: React.ReactNode;
}) {
  const { t } = useTranslation("common");

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-screen w-5/6 overflow-y-auto p-8 pt-10">
        <DialogHeader>
          <DialogTitle className="mb-2 text-left leading-relaxed">
            {t("confirmDeleteBlank")} {name}?
          </DialogTitle>
          <DialogDescription className="text-left">{t("noUndo")}</DialogDescription>
        </DialogHeader>
        <div className="mt-2 flex">
          <Button onClick={onDelete} type="submit" variant="destructive" className="mr-1 flex-auto">
            {t("delete")}
          </Button>
          <DialogClose asChild>
            <Button type="button" className="ml-1 flex-auto" variant="secondary">
              {t("cancel")}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
