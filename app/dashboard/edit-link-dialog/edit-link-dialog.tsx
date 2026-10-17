"use client";

import { useState, useTransition } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editLink } from "./action";

type EditLinkDialogProps = {
  id: number;
  originalUrl: string;
  shortCode: string;
};

export function EditLinkDialog({ id, originalUrl, shortCode }: EditLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(originalUrl);
  const [code, setCode] = useState(shortCode);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    setUrl(originalUrl);
    setCode(shortCode);
    setError(null);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await editLink({ id, url, shortCode: code });
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={<Button variant="ghost" size="icon" aria-label={`Edit ${shortCode}`} />}
      >
        <Pencil aria-hidden="true" />
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Edit link</DialogTitle>
            <DialogDescription>Update the destination URL or short code.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-2">
            <Label htmlFor={`edit-url-${id}`}>Destination URL</Label>
            <Input
              id={`edit-url-${id}`}
              type="url"
              name="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              aria-invalid={error ? true : undefined}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={`edit-short-code-${id}`}>Short code</Label>
            <Input
              id={`edit-short-code-${id}`}
              name="shortCode"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              maxLength={32}
              autoComplete="off"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `edit-error-${id}` : undefined}
              required
            />
            {error && (
              <p id={`edit-error-${id}`} role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
          </div>

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
