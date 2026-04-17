import type {
  AirParameter,
  AirQualityReading,
  ComplianceTask,
  CreateAirReadingRequest,
  CreatePiezoReadingRequest,
  CreateTaskRequest,
  CreateTreeRecordRequest,
  DashboardStats,
  PiezometerReading,
  SpeciesSummary,
  TaskStatus,
  TaskType,
  TreeRecord,
  UpdateTaskRequest,
} from "../backend";

export type {
  ComplianceTask,
  AirQualityReading,
  PiezometerReading,
  TreeRecord,
  DashboardStats,
  TaskStatus,
  TaskType,
  AirParameter,
  SpeciesSummary,
  CreateTaskRequest,
  UpdateTaskRequest,
  CreateAirReadingRequest,
  CreatePiezoReadingRequest,
  CreateTreeRecordRequest,
};

export type StatusVariant = "Pending" | "InProgress" | "Completed" | "Overdue";

export type NavItem = {
  label: string;
  href: string;
  icon: string;
};

export type AlertLevel = "info" | "warning" | "critical";
