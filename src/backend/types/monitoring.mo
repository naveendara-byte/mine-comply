import Common "common";

module {
  public type AirParameter = {
    #PM10;
    #PM2_5;
    #SO2;
    #NOx;
    #CO;
    #Other : Text;
  };

  public type AirQualityReading = {
    id : Common.AirReadingId;
    date : Common.Timestamp;
    parameter : AirParameter;
    value : Float;
    unit : Text;
    location : Text;
    measuredBy : Text;
    notes : Text;
    createdAt : Common.Timestamp;
  };

  public type CreateAirReadingRequest = {
    date : Common.Timestamp;
    parameter : AirParameter;
    value : Float;
    unit : Text;
    location : Text;
    measuredBy : Text;
    notes : Text;
  };

  public type PiezometerReading = {
    id : Common.PiezoReadingId;
    date : Common.Timestamp;
    wellId : Text;
    location : Text;
    depthToWater : Float;
    pH : Float;
    conductivity : Float;
    turbidity : Float;
    notes : Text;
    measuredBy : Text;
    createdAt : Common.Timestamp;
  };

  public type CreatePiezoReadingRequest = {
    date : Common.Timestamp;
    wellId : Text;
    location : Text;
    depthToWater : Float;
    pH : Float;
    conductivity : Float;
    turbidity : Float;
    notes : Text;
    measuredBy : Text;
  };
};
