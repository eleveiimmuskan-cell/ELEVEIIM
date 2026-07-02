"use client";

import Link from "next/link";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { workshops } from "@/data/workshops";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/common/motion-wrapper";
import { SectionHeader } from "@/components/common/section-header";
import { GlassCard } from "@/components/common/glass-card";

export function WorkshopsSection() {
  return (
    <SectionReveal className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Upcoming Events"
          title="Workshops & Masterclasses"
          description="Free and premium workshops to sharpen your skills, build your network, and stay ahead in your field."
        />

        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {workshops.map((workshop) => (
            <StaggerItem key={workshop.id}>
              <GlassCard className="flex h-full flex-col">
                <Badge className="mb-3 w-fit bg-brand/10 text-brand hover:bg-brand/10">
                  {workshop.mode}
                </Badge>
                <h3 className="text-lg font-bold text-foreground">
                  {workshop.title}
                </h3>
                <ul className="mt-4 flex-1 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Calendar className="size-4 text-brand" />
                    {workshop.date}
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="size-4 text-brand" />
                    {workshop.time}
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="size-4 text-brand" />
                    {workshop.instructor}
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="size-4 text-brand" />
                    {workshop.seats} seats left
                  </li>
                </ul>
                <Button
                  asChild
                  variant="outline"
                  className="mt-6 border-brand text-brand hover:bg-brand hover:text-white"
                >
                  <Link href="/contact">Register Free</Link>
                </Button>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionReveal>
  );
}
