import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { Card } from "@/components/ui/Card";
import { Timeline } from "@/components/ui/Timeline";

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return null;

  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: { intake: true, plan: true }
  });
  if (!project) return null;

  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-2xl font-display">{project.title}</h1>
        <p className="text-sm text-black/60">Plano: {project.plan.name}</p>
        <Timeline items={["Onboarding", "Em producao", "Revisao", "Publicado"]} />
      </Card>

      <OnboardingForm
        projectId={project.id}
        category={project.category}
        initialData={project.intake?.dataJson}
        isDraft={project.intake?.isDraft}
      />
    </div>
  );
}
