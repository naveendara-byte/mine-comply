import List "mo:core/List";
import MonitoringLib "../lib/monitoring";
import MonitoringTypes "../types/monitoring";
import Common "../types/common";

mixin (
  airReadings : List.List<MonitoringTypes.AirQualityReading>,
  nextAirReadingId : Nat,
  piezoReadings : List.List<MonitoringTypes.PiezometerReading>,
  nextPiezoReadingId : Nat,
) {
  var _nextAirReadingId : Nat = nextAirReadingId;
  var _nextPiezoReadingId : Nat = nextPiezoReadingId;
  public query func listAirQualityReadings() : async [MonitoringTypes.AirQualityReading] {
    MonitoringLib.listAirReadings(airReadings);
  };

  public query func listAirQualityReadingsInRange(
    fromDate : Common.Timestamp,
    toDate : Common.Timestamp,
  ) : async [MonitoringTypes.AirQualityReading] {
    MonitoringLib.listAirReadingsInRange(airReadings, fromDate, toDate);
  };

  public func addAirQualityReading(
    req : MonitoringTypes.CreateAirReadingRequest
  ) : async MonitoringTypes.AirQualityReading {
    let reading = MonitoringLib.addAirReading(airReadings, _nextAirReadingId, req);
    _nextAirReadingId += 1;
    reading;
  };

  public func deleteAirQualityReading(id : Common.AirReadingId) : async Bool {
    MonitoringLib.deleteAirReading(airReadings, id);
  };

  public query func listPiezometerReadings() : async [MonitoringTypes.PiezometerReading] {
    MonitoringLib.listPiezoReadings(piezoReadings);
  };

  public func addPiezometerReading(
    req : MonitoringTypes.CreatePiezoReadingRequest
  ) : async MonitoringTypes.PiezometerReading {
    let reading = MonitoringLib.addPiezoReading(piezoReadings, _nextPiezoReadingId, req);
    _nextPiezoReadingId += 1;
    reading;
  };

  public func deletePiezometerReading(id : Common.PiezoReadingId) : async Bool {
    MonitoringLib.deletePiezoReading(piezoReadings, id);
  };
};
