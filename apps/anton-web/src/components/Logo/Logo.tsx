import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Logo = () => {
  return (
    <div className={"flex gap-2 items-center"}>
      <Avatar>
        <AvatarImage src="https://s3.us-east-2.amazonaws.com/assets.peakpursuit.ch/logo-1.png" />
        <AvatarFallback>prime.mrck.dev</AvatarFallback>
      </Avatar>
      <span>
        <strong>prime.mrck.dev</strong>
      </span>
    </div>
  );
};

Logo.displayName = "Logo";
export { Logo };
