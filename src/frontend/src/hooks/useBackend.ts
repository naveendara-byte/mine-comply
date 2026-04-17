import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  AirQualityReading,
  ComplianceTask,
  CreateAirReadingRequest,
  CreatePiezoReadingRequest,
  CreateTaskRequest,
  CreateTreeRecordRequest,
  DashboardStats,
  PiezometerReading,
  SpeciesSummary,
  TreeRecord,
  UpdateTaskRequest,
} from "../backend";
import { TaskStatus } from "../backend";

// ─── Dashboard ────────────────────────────────────────────────────────────────

export function useDashboardStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getDashboardStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

// ─── Compliance Tasks ─────────────────────────────────────────────────────────

export function useComplianceTasks() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ComplianceTask[]>({
    queryKey: ["complianceTasks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listComplianceTasks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useComplianceTasksByStatus(status: TaskStatus) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ComplianceTask[]>({
    queryKey: ["complianceTasks", "byStatus", status],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listComplianceTasksByStatus(status);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useComplianceTask(id: bigint | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ComplianceTask | null>({
    queryKey: ["complianceTask", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getComplianceTask(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useCreateTask() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<ComplianceTask, Error, CreateTaskRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createComplianceTask(req);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["complianceTasks"] });
      void qc.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useUpdateTask() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<
    ComplianceTask | null,
    Error,
    { id: bigint; req: UpdateTaskRequest }
  >({
    mutationFn: async ({ id, req }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateComplianceTask(id, req);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["complianceTasks"] });
      void qc.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useDeleteTask() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteComplianceTask(id);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["complianceTasks"] });
      void qc.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

// ─── Air Quality ──────────────────────────────────────────────────────────────

export function useAirReadings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<AirQualityReading[]>({
    queryKey: ["airReadings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAirQualityReadings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddAirReading() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<AirQualityReading, Error, CreateAirReadingRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addAirQualityReading(req);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["airReadings"] });
      void qc.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useDeleteAirReading() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteAirQualityReading(id);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["airReadings"] });
      void qc.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

// ─── Piezometer ───────────────────────────────────────────────────────────────

export function usePiezoReadings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PiezometerReading[]>({
    queryKey: ["piezoReadings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPiezometerReadings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddPiezoReading() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<PiezometerReading, Error, CreatePiezoReadingRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addPiezometerReading(req);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["piezoReadings"] });
      void qc.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useDeletePiezoReading() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deletePiezometerReading(id);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["piezoReadings"] });
      void qc.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

// ─── Trees ────────────────────────────────────────────────────────────────────

export function useTreeRecords() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<TreeRecord[]>({
    queryKey: ["treeRecords"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listTreeRecords();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTreeSpeciesSummary() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SpeciesSummary[]>({
    queryKey: ["treeSpeciesSummary"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTreeSpeciesSummary();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddTreeRecord() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<TreeRecord, Error, CreateTreeRecordRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addTreeRecord(req);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["treeRecords"] });
      void qc.invalidateQueries({ queryKey: ["treeSpeciesSummary"] });
      void qc.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export function useDeleteTreeRecord() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteTreeRecord(id);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["treeRecords"] });
      void qc.invalidateQueries({ queryKey: ["treeSpeciesSummary"] });
      void qc.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}

export { TaskStatus };
