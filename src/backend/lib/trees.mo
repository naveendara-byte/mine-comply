import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import TreeTypes "../types/trees";
import Common "../types/common";

module {
  public func listTreeRecords(
    records : List.List<TreeTypes.TreeRecord>
  ) : [TreeTypes.TreeRecord] {
    records.toArray();
  };

  public func addTreeRecord(
    records : List.List<TreeTypes.TreeRecord>,
    nextId : Nat,
    req : TreeTypes.CreateTreeRecordRequest,
  ) : TreeTypes.TreeRecord {
    let record : TreeTypes.TreeRecord = {
      id = nextId;
      species = req.species;
      plantingDate = req.plantingDate;
      location = req.location;
      count = req.count;
      plantedBy = req.plantedBy;
      notes = req.notes;
      createdAt = Time.now();
    };
    records.add(record);
    record;
  };

  public func deleteTreeRecord(
    records : List.List<TreeTypes.TreeRecord>,
    id : Common.TreeRecordId,
  ) : Bool {
    let sizeBefore = records.size();
    let kept = records.filter(func(r) { r.id != id });
    records.clear();
    records.append(kept);
    records.size() < sizeBefore;
  };

  public func getSpeciesSummary(
    records : List.List<TreeTypes.TreeRecord>
  ) : [TreeTypes.SpeciesSummary] {
    let speciesMap = Map.empty<Text, Nat>();
    records.forEach(func(r) {
      let current = switch (speciesMap.get(r.species)) {
        case (?n) n;
        case null 0;
      };
      speciesMap.add(r.species, current + r.count);
    });
    let summaryList = List.empty<TreeTypes.SpeciesSummary>();
    for ((species, totalCount) in speciesMap.entries()) {
      summaryList.add({ species; totalCount });
    };
    summaryList.toArray();
  };

  public func totalTreeCount(
    records : List.List<TreeTypes.TreeRecord>
  ) : Nat {
    records.foldLeft(0, func(acc : Nat, r : TreeTypes.TreeRecord) : Nat {
      acc + r.count
    });
  };
};
