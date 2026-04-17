import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export type TreeRecordId = bigint;
export interface PiezometerReading {
    id: PiezoReadingId;
    pH: number;
    wellId: string;
    measuredBy: string;
    turbidity: number;
    date: Timestamp;
    createdAt: Timestamp;
    notes: string;
    conductivity: number;
    depthToWater: number;
    location: string;
}
export interface CreateAirReadingRequest {
    measuredBy: string;
    value: number;
    date: Timestamp;
    parameter: AirParameter;
    unit: string;
    notes: string;
    location: string;
}
export interface CreateTaskRequest {
    title: string;
    responsibleOfficer: string;
    dueDate: Timestamp;
    conditionText: string;
    taskType: TaskType;
    notes: string;
}
export interface DashboardStats {
    recentAirReadingsCount: bigint;
    taskCounts: TaskStatusCounts;
    totalTreesPlanted: bigint;
    recentPiezoReadingsCount: bigint;
}
export interface CreatePiezoReadingRequest {
    pH: number;
    wellId: string;
    measuredBy: string;
    turbidity: number;
    date: Timestamp;
    notes: string;
    conductivity: number;
    depthToWater: number;
    location: string;
}
export interface TreeRecord {
    id: TreeRecordId;
    plantingDate: Timestamp;
    plantedBy: string;
    createdAt: Timestamp;
    count: bigint;
    notes: string;
    species: string;
    location: string;
}
export interface UpdateTaskRequest {
    status: TaskStatus;
    notes: string;
}
export interface CreateTreeRecordRequest {
    plantingDate: Timestamp;
    plantedBy: string;
    count: bigint;
    notes: string;
    species: string;
    location: string;
}
export type AirReadingId = bigint;
export type AirParameter = {
    __kind__: "CO";
    CO: null;
} | {
    __kind__: "NOx";
    NOx: null;
} | {
    __kind__: "SO2";
    SO2: null;
} | {
    __kind__: "PM10";
    PM10: null;
} | {
    __kind__: "PM2_5";
    PM2_5: null;
} | {
    __kind__: "Other";
    Other: string;
};
export type TaskId = bigint;
export interface SpeciesSummary {
    totalCount: bigint;
    species: string;
}
export interface TaskStatusCounts {
    pending: bigint;
    completed: bigint;
    overdue: bigint;
    inProgress: bigint;
}
export type PiezoReadingId = bigint;
export interface ComplianceTask {
    id: TaskId;
    status: TaskStatus;
    title: string;
    responsibleOfficer: string;
    createdAt: Timestamp;
    dueDate: Timestamp;
    conditionText: string;
    taskType: TaskType;
    updatedAt: Timestamp;
    notes: string;
}
export interface AirQualityReading {
    id: AirReadingId;
    measuredBy: string;
    value: number;
    date: Timestamp;
    parameter: AirParameter;
    createdAt: Timestamp;
    unit: string;
    notes: string;
    location: string;
}
export enum TaskStatus {
    Overdue = "Overdue",
    InProgress = "InProgress",
    Completed = "Completed",
    Pending = "Pending"
}
export enum TaskType {
    EC = "EC",
    CTE = "CTE",
    CTO = "CTO"
}
export interface backendInterface {
    addAirQualityReading(req: CreateAirReadingRequest): Promise<AirQualityReading>;
    addPiezometerReading(req: CreatePiezoReadingRequest): Promise<PiezometerReading>;
    addTreeRecord(req: CreateTreeRecordRequest): Promise<TreeRecord>;
    createComplianceTask(req: CreateTaskRequest): Promise<ComplianceTask>;
    deleteAirQualityReading(id: AirReadingId): Promise<boolean>;
    deleteComplianceTask(id: TaskId): Promise<boolean>;
    deletePiezometerReading(id: PiezoReadingId): Promise<boolean>;
    deleteTreeRecord(id: TreeRecordId): Promise<boolean>;
    getComplianceTask(id: TaskId): Promise<ComplianceTask | null>;
    getDashboardStats(): Promise<DashboardStats>;
    getTreeSpeciesSummary(): Promise<Array<SpeciesSummary>>;
    listAirQualityReadings(): Promise<Array<AirQualityReading>>;
    listAirQualityReadingsInRange(fromDate: Timestamp, toDate: Timestamp): Promise<Array<AirQualityReading>>;
    listComplianceTasks(): Promise<Array<ComplianceTask>>;
    listComplianceTasksByStatus(status: TaskStatus): Promise<Array<ComplianceTask>>;
    listPiezometerReadings(): Promise<Array<PiezometerReading>>;
    listTreeRecords(): Promise<Array<TreeRecord>>;
    updateComplianceTask(id: TaskId, req: UpdateTaskRequest): Promise<ComplianceTask | null>;
}
