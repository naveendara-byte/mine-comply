import Common "common";

module {
  public type TreeRecord = {
    id : Common.TreeRecordId;
    species : Text;
    plantingDate : Common.Timestamp;
    location : Text;
    count : Nat;
    plantedBy : Text;
    notes : Text;
    createdAt : Common.Timestamp;
  };

  public type CreateTreeRecordRequest = {
    species : Text;
    plantingDate : Common.Timestamp;
    location : Text;
    count : Nat;
    plantedBy : Text;
    notes : Text;
  };

  public type SpeciesSummary = {
    species : Text;
    totalCount : Nat;
  };
};
