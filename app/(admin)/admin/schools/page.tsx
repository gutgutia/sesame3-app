import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { SchoolsTable } from "./SchoolsTable";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    filter?: string;
    page?: string;
  }>;
}

export default async function SchoolsPage({ searchParams }: PageProps) {
  // Check admin access
  const hasAccess = await isAdmin();
  if (!hasAccess) {
    redirect("/");
  }

  const params = await searchParams;
  const search = params.search || "";
  const filter = params.filter || "all";
  const page = parseInt(params.page || "1");
  const perPage = 25;

  // Build where clause
  const where: Record<string, unknown> = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { shortName: { contains: search, mode: "insensitive" } },
      { city: { contains: search, mode: "insensitive" } },
    ];
  }

  if (filter === "missing-deadlines") {
    where.AND = [
      { deadlineRd: null },
      { deadlineEd: null },
      { deadlineEa: null },
    ];
  } else if (filter === "pending-review") {
    where.dataStatus = "pending_review";
  } else if (filter === "verified") {
    where.dataStatus = "verified";
  }

  const [schools, totalCount] = await Promise.all([
    prisma.school.findMany({
      where,
      orderBy: { name: "asc" },
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        id: true,
        name: true,
        shortName: true,
        city: true,
        state: true,
        type: true,
        deadlineEd: true,
        deadlineEd2: true,
        deadlineEa: true,
        deadlineRea: true,
        deadlineRd: true,
        deadlineFinancialAid: true,
        deadlineCommitment: true,
        notificationEd: true,
        notificationEa: true,
        notificationRd: true,
        acceptanceRate: true,
        lastUpdated: true,
      },
    }),
    prisma.school.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schools</h1>
          <p className="text-gray-500 mt-1">
            {totalCount} schools in database
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href="/admin/data-import?source=scorecard"
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800"
          >
            Import from Scorecard
          </a>
          <a
            href="/admin/llm-tools?action=scrape-deadlines&type=schools"
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            Run LLM Scraper
          </a>
        </div>
      </div>

      <SchoolsTable
        schools={schools}
        currentPage={page}
        totalPages={totalPages}
        totalCount={totalCount}
        currentFilter={filter}
        currentSearch={search}
      />
    </div>
  );
}
