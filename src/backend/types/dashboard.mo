module {
  public type TaskStatusCounts = {
    pending : Nat;
    inProgress : Nat;
    completed : Nat;
    overdue : Nat;
  };

  public type DashboardStats = {
    taskCounts : TaskStatusCounts;
    totalTreesPlanted : Nat;
    recentAirReadingsCount : Nat;
    recentPiezoReadingsCount : Nat;
  };
};
