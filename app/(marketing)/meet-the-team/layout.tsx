import { Spotlight } from "@/components/spolight-background";

export default function AboutTheTeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Spotlight />
      {children}
    </>
  );
}
