import { describe, it, expect } from "vitest";
import { teamMembers } from "@/data/team";
import { achievementsData } from "@/data/achievements";
import { projectsData } from "@/data/projects";
import { capabilitiesData } from "@/data/capabilities";
import { workflowSteps } from "@/data/workflow";
import { behindTheScenesData, terminalEasterEggs } from "@/data/behindTheScenes";
import { siteConfig } from "@/data/site";

describe("Data Integrity & Master Prompt Contracts", () => {
  it("must have exactly 4 team members with individual roles and contributions", () => {
    expect(teamMembers).toHaveLength(4);
    teamMembers.forEach((member) => {
      expect(member.name).toBeTruthy();
      expect(member.role).toBeTruthy();
      expect(member.tagline).toBeTruthy();
      expect(member.skills.core.length).toBeGreaterThan(0);
      expect(member.strongestProject.title).toBeTruthy();
      expect(member.teamContributions.length).toBeGreaterThan(0);
      expect(member.links.github).toBeTruthy();
      expect(member.links.linkedin).toBeTruthy();
    });
  });

  it("must verify all team achievements have valid dates, categories, and verified statuses", () => {
    expect(achievementsData.length).toBeGreaterThanOrEqual(4);
    const validStatuses = [
      "Winner",
      "Runner Up",
      "Finalist",
      "Shortlisted",
      "Selected",
      "Special Award",
    ];
    achievementsData.forEach((ach) => {
      expect(validStatuses).toContain(ach.status);
      expect(ach.event).toBeTruthy();
      expect(ach.date).toBeTruthy();
      expect(ach.year).toBeGreaterThanOrEqual(2020);
    });
  });

  it("must feature at least one flagship hackathon winner project with problem/solution breakdown", () => {
    const featured = projectsData.filter((p) => p.featured);
    expect(featured.length).toBeGreaterThan(0);
    projectsData.forEach((project) => {
      expect(project.problemStatement.length).toBeGreaterThan(20);
      expect(project.proposedSolution.length).toBeGreaterThan(20);
      expect(project.techStack.length).toBeGreaterThan(0);
      expect(project.teamMembers.length).toBeGreaterThan(0);
      expect(project.keyAlgorithms.length).toBeGreaterThan(0);
    });
  });

  it("must have an 8-step problem solving workflow", () => {
    expect(workflowSteps).toHaveLength(8);
    workflowSteps.forEach((step, index) => {
      expect(step.stepNumber).toBe(index + 1);
      expect(step.artifactsProduced.length).toBeGreaterThan(0);
      expect(step.toolsUsed.length).toBeGreaterThan(0);
      expect(step.sprintMechanism).toBeTruthy();
    });
  });

  it("must cross-reference capabilities with actual team members and projects", () => {
    capabilitiesData.forEach((cap) => {
      expect(cap.associatedMemberIds.length).toBeGreaterThan(0);
      expect(cap.associatedProjectIds.length).toBeGreaterThan(0);
      expect(cap.evidenceText).toBeTruthy();

      // Check member IDs exist in team
      cap.associatedMemberIds.forEach((id) => {
        const found = teamMembers.some((m) => m.id === id);
        expect(found).toBe(true);
      });

      // Check project IDs exist in projects
      cap.associatedProjectIds.forEach((id) => {
        const found = projectsData.some((p) => p.id === id);
        expect(found).toBe(true);
      });
    });
  });

  it("must provide valid terminal easter eggs", () => {
    expect(terminalEasterEggs.length).toBeGreaterThanOrEqual(4);
    const hasHelp = terminalEasterEggs.some((item) => item.command === "help");
    expect(hasHelp).toBe(true);
  });
});
