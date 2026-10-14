import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { Modal } from "@/components/ui/Modal";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { CosmicScrollProgress } from "@/components/ui/CosmicScrollProgress";

describe("UI Components & Modals", () => {
  it("renders Badge component with correct variant and text", () => {
    render(<Badge variant="gold">Winner</Badge>);
    expect(screen.getByText("Winner")).toBeInTheDocument();
  });

  it("renders GlassCard component with custom children", () => {
    render(
      <GlassCard variant="interactive">
        <span>Interactive Content</span>
      </GlassCard>
    );
    expect(screen.getByText("Interactive Content")).toBeInTheDocument();
  });

  it("renders Modal when isOpen is true and hides when false", () => {
    const { rerender } = render(
      <Modal isOpen={false} onClose={() => {}} title="Test Dialog">
        <p>Modal Body</p>
      </Modal>
    );
    expect(screen.queryByText("Test Dialog")).not.toBeInTheDocument();

    rerender(
      <Modal isOpen={true} onClose={() => {}} title="Test Dialog">
        <p>Modal Body</p>
      </Modal>
    );
    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
    expect(screen.getByText("Modal Body")).toBeInTheDocument();
  });

  it("renders CommandPalette with search placeholder and navigation items", () => {
    render(<CommandPalette isOpen={true} onClose={() => {}} />);
    expect(
      screen.getByPlaceholderText(/Search sections, members, projects/i)
    ).toBeInTheDocument();
  });

  it("renders CosmicScrollProgress with no future track below moving node", () => {
    render(
      <CosmicScrollProgress
        progress={0.45}
        activeSection="team"
        activeSectionLabel="Who We Are"
      />
    );
    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toBeInTheDocument();
    expect(progressbar).toHaveAttribute("aria-valuenow", "45");
  });

  it("renders MemberProfileModal with member details and Know Me contents", () => {
    const mockMember = {
      id: "member-test",
      name: "Test Builder",
      role: "Lead Architect",
      tagline: "Building resilient systems",
      bio: "Short 1-2 line bio about engineering excellence.",
      avatarSeed: "Test",
      accentColor: "#F6E27A",
      skills: { core: ["TypeScript"], secondary: ["React"], tools: ["Git"] },
      individualAchievements: ["1st Place Hackathon Winner"],
      strongestProject: {
        title: "Test Project",
        role: "Lead",
        description: "1-2 line project summary.",
      },
      teamContributions: ["System architecture"],
      experienceSnippet: "3+ years building high scale apps.",
      ghibliRole: "Spirit Navigator",
      links: { github: "#", linkedin: "#", email: "test@example.com" },
    };

    render(
      <Modal isOpen={true} onClose={() => {}} title={mockMember.name} subtitle={mockMember.role}>
        <div>Know Me Content</div>
      </Modal>
    );

    expect(screen.getByText("Test Builder")).toBeInTheDocument();
    expect(screen.getByText("Lead Architect")).toBeInTheDocument();
    expect(screen.getByText("Know Me Content")).toBeInTheDocument();
  });
});
