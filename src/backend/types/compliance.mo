import Common "common";

module {
  public type TaskType = { #EC; #CTO; #CTE };

  public type TaskStatus = { #Pending; #InProgress; #Completed; #Overdue };

  public type ComplianceTask = {
    id : Common.TaskId;
    title : Text;
    taskType : TaskType;
    conditionText : Text;
    dueDate : Common.Timestamp;
    status : TaskStatus;
    responsibleOfficer : Text;
    notes : Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type CreateTaskRequest = {
    title : Text;
    taskType : TaskType;
    conditionText : Text;
    dueDate : Common.Timestamp;
    responsibleOfficer : Text;
    notes : Text;
  };

  public type UpdateTaskRequest = {
    status : TaskStatus;
    notes : Text;
  };
};
