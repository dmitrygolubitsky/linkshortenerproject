"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
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
import { createLink } from "./action";

export function CreateLinkDialog() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      setUrl("");
      setShortCode("");
      setError(null);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await createLink({ url, shortCode: shortCode.trim() || undefined });
      if ("error" in result) {
        setError(result.error);
        return;
      }
      handleOpenChange(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button />}>
        <Plus aria-hidden="true" />
        Create link
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Create link</DialogTitle>
            <DialogDescription>
              Paste a long URL to generate a short link.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-2">
            <Label htmlFor="link-url">Destination URL</Label>
            <Input
              id="link-url"
              type="url"
              name="url"
              placeholder="https://example.com/very/long/url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              aria-invalid={error ? true : undefined}
              required
              autoFocus
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="link-short-code">Short code (optional)</Label>
            <Input
              id="link-short-code"
              name="shortCode"
              placeholder="my-link"
              value={shortCode}
              onChange={(event) => setShortCode(event.target.value)}
              maxLength={32}
              autoComplete="off"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "link-error" : undefined}
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to generate a random code.
            </p>
            {error && (
              <p id="link-error" role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
          </div>

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
