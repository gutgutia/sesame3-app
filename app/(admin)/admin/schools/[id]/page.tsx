import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { SchoolEditForm } from "./SchoolEditForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SchoolEditPage({ params }: PageProps) {
  // Check admin access
  const hasAccess = await isAdmin();
  if (!hasAccess) {
    redirect("/");
  }

  const { id } = await params;

  const school = await prisma.school.findUnique({
    where: { id },
    include: {
      deadlineYears: {
        orderBy: { admissionsCycle: "desc" },
      },
    },
  });

  if (!school) {
    notFound();
  }

  return (
    <div className="max-w-4xl">
      <SchoolEditForm school={school} />
    </div>
  );
}
