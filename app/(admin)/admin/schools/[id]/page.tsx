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
  });

  if (!school) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{school.name}</h1>
        <p className="text-gray-500 mt-1">
          {school.city && school.state ? `${school.city}, ${school.state}` : school.state || "Location unknown"}
        </p>
      </div>

      <SchoolEditForm school={school} />
    </div>
  );
}
