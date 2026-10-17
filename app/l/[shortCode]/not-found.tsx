import { LinkError } from "./link-error";

export default function LinkNotFound() {
  return (
    <LinkError
      code="404"
      title="Link not found"
      description="This short link doesn't exist or may have been removed. Double-check the address and try again."
    />
  );
}
