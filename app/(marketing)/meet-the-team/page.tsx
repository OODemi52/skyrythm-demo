import { title } from "@/components/primitives";
import { TeamList } from "@/components/team-list";
import { teamConfig } from "@/config/team";

export default function AboutTheTeamPage() {
  return (
    <div className="w-full max-w-[80vw] mx-auto overflow-x-hidden">
      <h1 className={title()}>About The Team</h1>
      <TeamList members={teamConfig} />
    </div>
  );
}
