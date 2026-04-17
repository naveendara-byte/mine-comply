import List "mo:core/List";
import ComplianceLib "../lib/compliance";
import ComplianceTypes "../types/compliance";
import Common "../types/common";

mixin (
  tasks : List.List<ComplianceTypes.ComplianceTask>,
  nextTaskId : Nat,
) {
  var _nextTaskId : Nat = nextTaskId;
  public query func listComplianceTasks() : async [ComplianceTypes.ComplianceTask] {
    ComplianceLib.listTasks(tasks);
  };

  public query func listComplianceTasksByStatus(
    status : ComplianceTypes.TaskStatus
  ) : async [ComplianceTypes.ComplianceTask] {
    ComplianceLib.listTasksByStatus(tasks, status);
  };

  public query func getComplianceTask(id : Common.TaskId) : async ?ComplianceTypes.ComplianceTask {
    ComplianceLib.getTask(tasks, id);
  };

  public func createComplianceTask(
    req : ComplianceTypes.CreateTaskRequest
  ) : async ComplianceTypes.ComplianceTask {
    let task = ComplianceLib.createTask(tasks, _nextTaskId, req);
    _nextTaskId += 1;
    task;
  };

  public func updateComplianceTask(
    id : Common.TaskId,
    req : ComplianceTypes.UpdateTaskRequest,
  ) : async ?ComplianceTypes.ComplianceTask {
    ComplianceLib.updateTask(tasks, id, req);
  };

  public func deleteComplianceTask(id : Common.TaskId) : async Bool {
    ComplianceLib.deleteTask(tasks, id);
  };
};
