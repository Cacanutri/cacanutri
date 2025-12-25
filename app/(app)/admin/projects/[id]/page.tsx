import { prisma } from "@/lib/prisma";
import { getSessionUser, isAdminOrStaff } from "@/lib/auth";
import { Card } from "@/components/ui/Card";

export default async function AdminProjectDetail({ params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user || !isAdminOrStaff(user.role)) return null;

  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: { tasks: true }
  });
  if (!project) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display">{project.title}</h1>
      <Card>
        <h3 className="font-semibold">Kanban</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {["TODO", "DOING", "DONE"].map((col) => (
            <div key={col} className="rounded-2xl border p-3">
              <h4 className="text-sm font-semibold">{col}</h4>
              <div className="mt-2 space-y-2">
                {project.tasks.filter((t) => t.status === col).map((t) => (
                  <div key={t.id} className="rounded-xl border p-2 text-sm">{t.title}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
