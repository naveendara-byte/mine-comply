import List "mo:core/List";
import Time "mo:core/Time";
import MonitoringTypes "../types/monitoring";
import Common "../types/common";

module {
  public func listAirReadings(
    readings : List.List<MonitoringTypes.AirQualityReading>
  ) : [MonitoringTypes.AirQualityReading] {
    readings.toArray();
  };

  public func listAirReadingsInRange(
    readings : List.List<MonitoringTypes.AirQualityReading>,
    fromDate : Common.Timestamp,
    toDate : Common.Timestamp,
  ) : [MonitoringTypes.AirQualityReading] {
    let filtered = readings.filter(func(r) {
      r.date >= fromDate and r.date <= toDate
    });
    filtered.toArray();
  };

  public func addAirReading(
    readings : List.List<MonitoringTypes.AirQualityReading>,
    nextId : Nat,
    req : MonitoringTypes.CreateAirReadingRequest,
  ) : MonitoringTypes.AirQualityReading {
    let reading : MonitoringTypes.AirQualityReading = {
      id = nextId;
      date = req.date;
      parameter = req.parameter;
      value = req.value;
      unit = req.unit;
      location = req.location;
      measuredBy = req.measuredBy;
      notes = req.notes;
      createdAt = Time.now();
    };
    readings.add(reading);
    reading;
  };

  public func deleteAirReading(
    readings : List.List<MonitoringTypes.AirQualityReading>,
    id : Common.AirReadingId,
  ) : Bool {
    let sizeBefore = readings.size();
    let kept = readings.filter(func(r) { r.id != id });
    readings.clear();
    readings.append(kept);
    readings.size() < sizeBefore;
  };

  public func listPiezoReadings(
    readings : List.List<MonitoringTypes.PiezometerReading>
  ) : [MonitoringTypes.PiezometerReading] {
    readings.toArray();
  };

  public func addPiezoReading(
    readings : List.List<MonitoringTypes.PiezometerReading>,
    nextId : Nat,
    req : MonitoringTypes.CreatePiezoReadingRequest,
  ) : MonitoringTypes.PiezometerReading {
    let reading : MonitoringTypes.PiezometerReading = {
      id = nextId;
      date = req.date;
      wellId = req.wellId;
      location = req.location;
      depthToWater = req.depthToWater;
      pH = req.pH;
      conductivity = req.conductivity;
      turbidity = req.turbidity;
      notes = req.notes;
      measuredBy = req.measuredBy;
      createdAt = Time.now();
    };
    readings.add(reading);
    reading;
  };

  public func deletePiezoReading(
    readings : List.List<MonitoringTypes.PiezometerReading>,
    id : Common.PiezoReadingId,
  ) : Bool {
    let sizeBefore = readings.size();
    let kept = readings.filter(func(r) { r.id != id });
    readings.clear();
    readings.append(kept);
    readings.size() < sizeBefore;
  };
};
