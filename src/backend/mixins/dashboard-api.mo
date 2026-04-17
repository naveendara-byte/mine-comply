import List "mo:core/List";
import Time "mo:core/Time";
import ComplianceLib "../lib/compliance";
import TreeLib "../lib/trees";
import ComplianceTypes "../types/compliance";
import MonitoringTypes "../types/monitoring";
import TreeTypes "../types/trees";
import DashboardTypes "../types/dashboard";

mixin (
  tasks : List.List<ComplianceTypes.ComplianceTask>,
  airReadings : List.List<MonitoringTypes.AirQualityReading>,
  piezoReadings : List.List<MonitoringTypes.PiezometerReading>,
  treeRecords : List.List<TreeTypes.TreeRecord>,
) {
  public query func getDashboardStats() : async DashboardTypes.DashboardStats {
    let (pending, inProgress, completed, overdue) = ComplianceLib.countByStatus(tasks);
    let totalTrees = TreeLib.totalTreeCount(treeRecords);
    let thirtyDaysNs : Int = 30 * 24 * 60 * 60 * 1_000_000_000;
    let cutoff = Time.now() - thirtyDaysNs;
    let recentAir = airReadings.foldLeft(0, func(acc : Nat, r : MonitoringTypes.AirQualityReading) : Nat {
      if (r.createdAt >= cutoff) acc + 1 else acc
    });
    let recentPiezo = piezoReadings.foldLeft(0, func(acc : Nat, r : MonitoringTypes.PiezometerReading) : Nat {
      if (r.createdAt >= cutoff) acc + 1 else acc
    });
    {
      taskCounts = {
        pending;
        inProgress;
        completed;
        overdue;
      };
      totalTreesPlanted = totalTrees;
      recentAirReadingsCount = recentAir;
      recentPiezoReadingsCount = recentPiezo;
    };
  };
};
