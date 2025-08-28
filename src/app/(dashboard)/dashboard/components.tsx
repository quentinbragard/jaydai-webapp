"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Blocks, FileText, Folder, Target, Users } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export function HeaderSection(props: {
  greeting: string;
  name: string;
  spaceBadge: React.ReactNode;
  welcomeMessage: string;
  onBrowseTemplates: () => void;
  onCreateTemplate: () => void;
}) {
  const { t } = useI18n();
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {props.greeting}, {props.name}!
        </h1>
        <div className="flex items-center gap-2 mt-2">
          {props.spaceBadge}
          <p className="text-muted-foreground">{props.welcomeMessage}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={props.onBrowseTemplates}>
          {t("dashboard.browseTemplates")}
        </Button>
        <Button onClick={props.onCreateTemplate}>
          <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
          {t("dashboard.createNew")}
        </Button>
      </div>
    </div>
  );
}

export function StatCard(props: {
  title: string;
  value: string | number;
  icon: IconType;
  subtitle?: string;
}) {
  const Icon = props.icon;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{props.title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{props.value}</div>
        {props.subtitle && (
          <p className="text-xs text-muted-foreground">{props.subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}

export function QuickActionsSection(props: { onNavigate: (href: string) => void }) {
  const { t } = useI18n();

  const actions = [
    {
      title: t("actions.createTemplate.title"),
      description: t("actions.createTemplate.description"),
      icon: FileText,
      href: "/templates/new",
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: t("actions.addBlock.title"),
      description: t("actions.addBlock.description"),
      icon: Blocks,
      href: "/blocks/new",
      color: "text-purple-600 bg-purple-100 dark:bg-purple-900/20",
    },
    {
      title: t("actions.newFolder.title"),
      description: t("actions.newFolder.description"),
      icon: Folder,
      href: "/folders/new",
      color: "text-green-600 bg-green-100 dark:bg-green-900/20",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.quickActions")}</CardTitle>
        <CardDescription>{t("dashboard.quickActionsDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
          {actions.map((action) => (
            <Button
              key={action.href}
              variant="outline"
              className="h-auto flex-col items-start p-4 space-y-2"
              onClick={() => props.onNavigate(action.href)}
            >
              <div className={`p-2 rounded-lg ${action.color}`}>
                <action.icon className="h-5 w-5" />
              </div>
              <div className="space-y-1 text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function SpaceFeaturesGrid(props: {
  currentSpace: "personal" | "company" | "organization" | undefined;
  onNavigate: (href: string) => void;
}) {
  const { t } = useI18n();

  if (props.currentSpace !== "organization" && props.currentSpace !== "company") return null;

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] mt-6">
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => props.onNavigate("/analytics")}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <BarChart3 className="h-8 w-8 text-primary" />
            <Badge variant="secondary">{t("dashboard.badges.new")}</Badge>
          </div>
          <CardTitle className="mt-4">{t("dashboard.analyticsDashboard")}</CardTitle>
          <CardDescription>{t("dashboard.analyticsDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="ghost" className="p-0 h-auto">
            {t("dashboard.viewAnalytics")} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => props.onNavigate("/team")}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Users className="h-8 w-8 text-primary" />
            <span className="text-sm text-muted-foreground">12</span>
          </div>
          <CardTitle className="mt-4">{t("dashboard.teamManagement")}</CardTitle>
          <CardDescription>{t("dashboard.teamManagementDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="ghost" className="p-0 h-auto">
            {t("dashboard.manageTeam")} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => props.onNavigate("/access-control")}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Target className="h-8 w-8 text-primary" />
            <Badge>{t("dashboard.badges.pro")}</Badge>
          </div>
          <CardTitle className="mt-4">{t("dashboard.accessControl")}</CardTitle>
          <CardDescription>{t("dashboard.accessControlDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="ghost" className="p-0 h-auto">
            {t("common.configure")} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export function RecentActivitySection() {
  const { t } = useI18n();
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t("dashboard.recentActivity")}</CardTitle>
            <CardDescription>{t("dashboard.recentActivityDescription")}</CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            {t("common.viewAll")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">{t("dashboard.createdNewTemplate", { title: "Email Response" })}</p>
              <p className="text-xs text-muted-foreground">2h</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Blocks className="h-4 w-4 text-purple-600" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">{t("dashboard.addedNewBlock", { title: "Professional Tone" })}</p>
              <p className="text-xs text-muted-foreground">5h</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Folder className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">{t("dashboard.organizedTemplatesInFolder", { folder: "Marketing" })}</p>
              <p className="text-xs text-muted-foreground">1d</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

