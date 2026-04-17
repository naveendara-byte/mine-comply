import List "mo:core/List";
import TreeLib "../lib/trees";
import TreeTypes "../types/trees";
import Common "../types/common";

mixin (
  treeRecords : List.List<TreeTypes.TreeRecord>,
  nextTreeRecordId : Nat,
) {
  var _nextTreeRecordId : Nat = nextTreeRecordId;
  public query func listTreeRecords() : async [TreeTypes.TreeRecord] {
    TreeLib.listTreeRecords(treeRecords);
  };

  public func addTreeRecord(
    req : TreeTypes.CreateTreeRecordRequest
  ) : async TreeTypes.TreeRecord {
    let record = TreeLib.addTreeRecord(treeRecords, _nextTreeRecordId, req);
    _nextTreeRecordId += 1;
    record;
  };

  public func deleteTreeRecord(id : Common.TreeRecordId) : async Bool {
    TreeLib.deleteTreeRecord(treeRecords, id);
  };

  public query func getTreeSpeciesSummary() : async [TreeTypes.SpeciesSummary] {
    TreeLib.getSpeciesSummary(treeRecords);
  };
};
