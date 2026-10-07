import type { Metadata } from "next";
import { CollegeStudentForm } from "@/components/college-register/college-student-form";
import { createPageMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ collegeId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collegeId } = await params;
  return {
    ...createPageMetadata({
      title: "Student Registration Form",
      description: "Register as a student for your college with ELEVEIIM.",
      path: `/college-register/${collegeId}`,
    }),
    robots: { index: false, follow: false },
  };
}

export default async function CollegeRegisterPage({ params }: Props) {
  const { collegeId } = await params;
  return (
    <div className="box-border min-h-[100dvh] overflow-x-hidden overflow-y-auto bg-[linear-gradient(180deg,#f5f8fc_0%,#eef3fa_45%,#e8e4dc_100%)] px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <CollegeStudentForm collegeId={collegeId} />
      </div>
    </div>
  );
}
