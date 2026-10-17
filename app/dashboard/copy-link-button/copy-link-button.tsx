"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type CopyLinkButtonProps = {
  shortCode: string;
};

export function CopyLinkButton({ shortCode }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleCopy() {
    const shortUrl = `${window.location.origin}/l/${shortCode}`;

    try {
      await navigator.clipboard.writeText(shortUrl);
    } catch {
      return;
    }

    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Copy short link for ${shortCode}`}
              onClick={handleCopy}
            />
          }
        >
          {copied ? (
            <Check className="text-primary" aria-hidden="true" />
          ) : (
            <Link2 className="text-primary" aria-hidden="true" />
          )}
        </TooltipTrigger>
        <TooltipContent>{copied ? "Copied!" : "Click to copy the link to the clipboard"}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
