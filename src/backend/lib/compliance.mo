import List "mo:core/List";
import Time "mo:core/Time";
import ComplianceTypes "../types/compliance";
import Common "../types/common";

module {
  public func listTasks(
    tasks : List.List<ComplianceTypes.ComplianceTask>
  ) : [ComplianceTypes.ComplianceTask] {
    tasks.toArray();
  };

  public func listTasksByStatus(
    tasks : List.List<ComplianceTypes.ComplianceTask>,
    status : ComplianceTypes.TaskStatus,
  ) : [ComplianceTypes.ComplianceTask] {
    let filtered = tasks.filter(func(t) {
      switch (t.status, status) {
        case (#Pending, #Pending) true;
        case (#InProgress, #InProgress) true;
        case (#Completed, #Completed) true;
        case (#Overdue, #Overdue) true;
        case _ false;
      }
    });
    filtered.toArray();
  };

  public func getTask(
    tasks : List.List<ComplianceTypes.ComplianceTask>,
    id : Common.TaskId,
  ) : ?ComplianceTypes.ComplianceTask {
    tasks.find(func(t) { t.id == id });
  };

  public func createTask(
    tasks : List.List<ComplianceTypes.ComplianceTask>,
    nextId : Nat,
    req : ComplianceTypes.CreateTaskRequest,
  ) : ComplianceTypes.ComplianceTask {
    let now = Time.now();
    let task : ComplianceTypes.ComplianceTask = {
      id = nextId;
      title = req.title;
      taskType = req.taskType;
      conditionText = req.conditionText;
      dueDate = req.dueDate;
      status = #Pending;
      responsibleOfficer = req.responsibleOfficer;
      notes = req.notes;
      createdAt = now;
      updatedAt = now;
    };
    tasks.add(task);
    task;
  };

  public func updateTask(
    tasks : List.List<ComplianceTypes.ComplianceTask>,
    id : Common.TaskId,
    req : ComplianceTypes.UpdateTaskRequest,
  ) : ?ComplianceTypes.ComplianceTask {
    var updated : ?ComplianceTypes.ComplianceTask = null;
    let now = Time.now();
    tasks.mapInPlace(func(t) {
      if (t.id == id) {
        let newTask = { t with status = req.status; notes = req.notes; updatedAt = now };
        updated := ?newTask;
        newTask;
      } else {
        t;
      }
    });
    updated;
  };

  public func deleteTask(
    tasks : List.List<ComplianceTypes.ComplianceTask>,
    id : Common.TaskId,
  ) : Bool {
    let sizeBefore = tasks.size();
    let kept = tasks.filter(func(t) { t.id != id });
    tasks.clear();
    tasks.append(kept);
    tasks.size() < sizeBefore;
  };

  public func countByStatus(
    tasks : List.List<ComplianceTypes.ComplianceTask>
  ) : (Nat, Nat, Nat, Nat) {
    tasks.foldLeft(
      (0, 0, 0, 0),
      func(acc, t) : (Nat, Nat, Nat, Nat) {
        let (p, ip, c, o) = acc;
        switch (t.status) {
          case (#Pending) (p + 1, ip, c, o);
          case (#InProgress) (p, ip + 1, c, o);
          case (#Completed) (p, ip, c + 1, o);
          case (#Overdue) (p, ip, c, o + 1);
        };
      },
    );
  };
};
