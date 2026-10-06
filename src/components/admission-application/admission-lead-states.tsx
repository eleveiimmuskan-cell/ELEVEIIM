import Link from "next/link";
import { BrandImage } from "@/components/common/brand-image";
import {
  formatAdmissionDate,
  type PublicAdmissionSummary,
} from "@/lib/admission-lead";
import { ADMISSION_SESSION } from "@/data/admission-application";

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[640px] overflow-hidden rounded-sm border border-slate-300 bg-white shadow-sm">
      <header className="border-b border-slate-300 px-4 py-5 sm:px-6">
        <BrandImage size="lg" href="/" />
        <p className="mt-4 text-lg font-bold uppercase tracking-wide text-[#1e4ba8]">
          Admission Application Form
        </p>
        <p className="mt-1 text-xs font-medium text-slate-600">{ADMISSION_SESSION}</p>
      </header>
      <div className="space-y-4 px-4 py-6 sm:px-6">
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        {children}
      </div>
    </div>
  );
}

export function AdmissionLeadLoading() {
  return (
    <Card title="Loading lead…">
      <p className="text-sm text-slate-600">Fetching the admission details for this lead.</p>
    </Card>
  );
}

export function AdmissionLeadNotFound() {
  return (
    <Card title="Lead Not Found">
      <p className="text-sm leading-relaxed text-slate-600">
        This admission link is invalid or the lead no longer exists. A student
        was not created. You can continue with a new application, which will be
        assigned to Super Admin.
      </p>
      <Link
        href="/admission-application"
        className="inline-flex h-10 items-center rounded-sm bg-[#1e4ba8] px-4 text-sm font-semibold text-white"
      >
        Open new application
      </Link>
    </Card>
  );
}

export function AdmissionThankYou({
  title = "Thank You",
  message = "Your admission application was received. Our team will contact you shortly.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <Card title={title}>
      <p className="text-sm leading-relaxed text-slate-600">{message}</p>
    </Card>
  );
}

export function AdmissionAlreadyCreated({
  admission,
}: {
  admission: PublicAdmissionSummary;
}) {
  return (
    <Card title="Thank You — Already Submitted">
      <p className="text-sm leading-relaxed text-slate-600">
        An admission application is already on file for this lead. A second
        student record will not be created.
      </p>
      <dl className="grid gap-3 rounded-sm border border-slate-200 bg-slate-50 p-4 text-sm">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Student name
          </dt>
          <dd className="font-semibold text-slate-900">{admission.studentName}</dd>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Admission status
            </dt>
            <dd className="font-medium text-emerald-700">{admission.statusLabel}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Created date
            </dt>
            <dd className="font-medium text-slate-800">
              {formatAdmissionDate(admission.createdAt)}
            </dd>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Counsellor
            </dt>
            <dd className="font-medium text-slate-800">{admission.counsellorName}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Lead ID
            </dt>
            <dd className="font-medium text-slate-800">
              {admission.leadCode || admission.leadId}
            </dd>
          </div>
        </div>
        {admission.courseTitle ? (
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Program
            </dt>
            <dd className="font-medium text-slate-800">{admission.courseTitle}</dd>
          </div>
        ) : null}
      </dl>
      <details className="rounded-sm border border-slate-200 p-3 text-sm">
        <summary className="cursor-pointer font-semibold text-[#1e4ba8]">
          View admission
        </summary>
        <p className="mt-2 text-slate-600">
          {admission.studentName} is already admitted
          {admission.courseTitle ? ` to ${admission.courseTitle}` : ""}. Contact
          ELEVEIIM if you need a change to this record.
        </p>
      </details>
    </Card>
  );
}
