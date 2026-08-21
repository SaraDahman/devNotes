import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateFolder } from "@/hooks/use-folders";

const schema = z.object({
  name: z.string().min(1, "Folder name is required"),
});

export default function CreateFolderDialog() {
  const [open, setOpen] = useState(false);
  const [apiError, setApiError] = useState("");
  const createFolder = useCreateFolder();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    setApiError("");
    createFolder.mutate(data.name, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
      onError: (error) => {
        setApiError(error.message);
      },
    });
  };

  const handleOpenChange = (value) => {
    setOpen(value);
    if (!value) {
      reset();
      setApiError("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button>Create Folder</Button>} />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Folder</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <Input {...register("name")} placeholder="Folder name" />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
          {apiError && <p className="text-sm text-destructive">{apiError}</p>}

          <DialogFooter>
            <DialogClose
              render={
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              }
            />
            <Button type="submit" disabled={createFolder.isPending}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
