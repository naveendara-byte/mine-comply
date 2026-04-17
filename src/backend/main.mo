import List "mo:core/List";
import Time "mo:core/Time";
import ComplianceTypes "types/compliance";
import MonitoringTypes "types/monitoring";
import TreeTypes "types/trees";
import ComplianceApi "mixins/compliance-api";
import MonitoringApi "mixins/monitoring-api";
import TreesApi "mixins/trees-api";
import DashboardApi "mixins/dashboard-api";

actor {
  let tasks = List.empty<ComplianceTypes.ComplianceTask>();
  var nextTaskId : Nat = 0;

  let airReadings = List.empty<MonitoringTypes.AirQualityReading>();
  var nextAirReadingId : Nat = 0;

  let piezoReadings = List.empty<MonitoringTypes.PiezometerReading>();
  var nextPiezoReadingId : Nat = 0;

  let treeRecords = List.empty<TreeTypes.TreeRecord>();
  var nextTreeRecordId : Nat = 0;

  var seeded : Bool = false;

  func seedSampleData() {
    if (seeded) return;
    seeded := true;

    let now = Time.now();
    let day : Int = 86_400_000_000_000;

    // 5 compliance tasks
    tasks.add({ id = nextTaskId; title = "Submit Quarterly Air Quality Report"; taskType = #EC; conditionText = "EC Condition 3.1: Quarterly air quality monitoring reports must be submitted to the RO within 30 days of quarter end."; dueDate = now + 15 * day; status = #Pending; responsibleOfficer = "Rajesh Kumar"; notes = "Q1 report due soon"; createdAt = now; updatedAt = now });
    nextTaskId += 1;
    tasks.add({ id = nextTaskId; title = "Install Dust Suppression System at Haul Road"; taskType = #CTO; conditionText = "CTO Condition 2.4: Water sprinklers and dust suppression systems must be installed on all haul roads."; dueDate = now - 5 * day; status = #Overdue; responsibleOfficer = "Priya Sharma"; notes = "Delayed due to equipment procurement"; createdAt = now - 30 * day; updatedAt = now - 10 * day });
    nextTaskId += 1;
    tasks.add({ id = nextTaskId; title = "Complete Piezometer Network Installation"; taskType = #CTE; conditionText = "CTE Condition 5.2: A network of piezometers must be established around the mine boundary to monitor groundwater levels."; dueDate = now + 45 * day; status = #InProgress; responsibleOfficer = "Amit Singh"; notes = "4 of 8 wells installed"; createdAt = now - 20 * day; updatedAt = now - 2 * day });
    nextTaskId += 1;
    tasks.add({ id = nextTaskId; title = "Tree Plantation Drive - Phase 2"; taskType = #EC; conditionText = "EC Condition 8.3: 500 trees must be planted in the green belt area by end of financial year."; dueDate = now + 60 * day; status = #Pending; responsibleOfficer = "Sunita Verma"; notes = "Phase 1 completed with 300 trees"; createdAt = now - 5 * day; updatedAt = now - 5 * day });
    nextTaskId += 1;
    tasks.add({ id = nextTaskId; title = "Annual Environmental Audit Report"; taskType = #CTO; conditionText = "CTO Condition 1.1: Annual environmental audit must be conducted and report submitted to the Regulatory Authority."; dueDate = now - 10 * day; status = #Completed; responsibleOfficer = "Vikram Patel"; notes = "Submitted on time, clearance received"; createdAt = now - 90 * day; updatedAt = now - 8 * day });
    nextTaskId += 1;

    // Air quality readings from CAAQMS-1, GP IV/2&3 (M/S. Jindal Power Limited)
    // Date range: 2026-03-17 to 2026-04-15 — 30 daily records, 5 parameters each

    // 2026-03-17
    airReadings.add({ id = nextAirReadingId; date = 1773705600000000000; parameter = #PM10; value = 33.2; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1773705600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1773705600000000000; parameter = #PM2_5; value = 14.5; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1773705600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1773705600000000000; parameter = #SO2; value = 8.5; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1773705600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1773705600000000000; parameter = #NOx; value = 19.7; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1773705600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1773705600000000000; parameter = #CO; value = 1.0; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1773705600000000000 });
    nextAirReadingId += 1;

    // 2026-03-18
    airReadings.add({ id = nextAirReadingId; date = 1773792000000000000; parameter = #PM10; value = 27.0; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1773792000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1773792000000000000; parameter = #PM2_5; value = 12.8; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1773792000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1773792000000000000; parameter = #SO2; value = 8.8; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1773792000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1773792000000000000; parameter = #NOx; value = 22.8; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1773792000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1773792000000000000; parameter = #CO; value = 0.9; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1773792000000000000 });
    nextAirReadingId += 1;

    // 2026-03-19
    airReadings.add({ id = nextAirReadingId; date = 1773878400000000000; parameter = #PM10; value = 37.8; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1773878400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1773878400000000000; parameter = #PM2_5; value = 20.0; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1773878400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1773878400000000000; parameter = #SO2; value = 8.8; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1773878400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1773878400000000000; parameter = #NOx; value = 21.7; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1773878400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1773878400000000000; parameter = #CO; value = 0.9; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1773878400000000000 });
    nextAirReadingId += 1;

    // 2026-03-20
    airReadings.add({ id = nextAirReadingId; date = 1773964800000000000; parameter = #PM10; value = 42.0; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1773964800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1773964800000000000; parameter = #PM2_5; value = 22.9; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1773964800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1773964800000000000; parameter = #SO2; value = 8.8; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1773964800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1773964800000000000; parameter = #NOx; value = 21.9; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1773964800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1773964800000000000; parameter = #CO; value = 1.0; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1773964800000000000 });
    nextAirReadingId += 1;

    // 2026-03-21
    airReadings.add({ id = nextAirReadingId; date = 1774051200000000000; parameter = #PM10; value = 12.0; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774051200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774051200000000000; parameter = #PM2_5; value = 7.5; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774051200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774051200000000000; parameter = #SO2; value = 8.8; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774051200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774051200000000000; parameter = #NOx; value = 22.2; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774051200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774051200000000000; parameter = #CO; value = 0.7; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774051200000000000 });
    nextAirReadingId += 1;

    // 2026-03-22
    airReadings.add({ id = nextAirReadingId; date = 1774137600000000000; parameter = #PM10; value = 38.0; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774137600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774137600000000000; parameter = #PM2_5; value = 20.1; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774137600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774137600000000000; parameter = #SO2; value = 9.1; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774137600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774137600000000000; parameter = #NOx; value = 24.8; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774137600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774137600000000000; parameter = #CO; value = 0.8; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774137600000000000 });
    nextAirReadingId += 1;

    // 2026-03-23
    airReadings.add({ id = nextAirReadingId; date = 1774224000000000000; parameter = #PM10; value = 50.2; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774224000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774224000000000000; parameter = #PM2_5; value = 27.0; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774224000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774224000000000000; parameter = #SO2; value = 9.1; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774224000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774224000000000000; parameter = #NOx; value = 16.1; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774224000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774224000000000000; parameter = #CO; value = 1.0; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774224000000000000 });
    nextAirReadingId += 1;

    // 2026-03-24
    airReadings.add({ id = nextAirReadingId; date = 1774310400000000000; parameter = #PM10; value = 53.0; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774310400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774310400000000000; parameter = #PM2_5; value = 33.4; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774310400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774310400000000000; parameter = #SO2; value = 9.1; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774310400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774310400000000000; parameter = #NOx; value = 2.8; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774310400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774310400000000000; parameter = #CO; value = 1.1; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774310400000000000 });
    nextAirReadingId += 1;

    // 2026-03-25
    airReadings.add({ id = nextAirReadingId; date = 1774396800000000000; parameter = #PM10; value = 43.0; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774396800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774396800000000000; parameter = #PM2_5; value = 26.7; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774396800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774396800000000000; parameter = #SO2; value = 9.0; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774396800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774396800000000000; parameter = #NOx; value = 1.4; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774396800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774396800000000000; parameter = #CO; value = 1.1; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774396800000000000 });
    nextAirReadingId += 1;

    // 2026-03-26
    airReadings.add({ id = nextAirReadingId; date = 1774483200000000000; parameter = #PM10; value = 69.5; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774483200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774483200000000000; parameter = #PM2_5; value = 46.2; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774483200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774483200000000000; parameter = #SO2; value = 9.0; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774483200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774483200000000000; parameter = #NOx; value = 1.8; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774483200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774483200000000000; parameter = #CO; value = 1.0; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774483200000000000 });
    nextAirReadingId += 1;

    // 2026-03-27
    airReadings.add({ id = nextAirReadingId; date = 1774569600000000000; parameter = #PM10; value = 72.7; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774569600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774569600000000000; parameter = #PM2_5; value = 45.8; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774569600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774569600000000000; parameter = #SO2; value = 9.3; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774569600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774569600000000000; parameter = #NOx; value = 3.4; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774569600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774569600000000000; parameter = #CO; value = 1.0; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774569600000000000 });
    nextAirReadingId += 1;

    // 2026-03-28
    airReadings.add({ id = nextAirReadingId; date = 1774656000000000000; parameter = #PM10; value = 35.4; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774656000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774656000000000000; parameter = #PM2_5; value = 26.4; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774656000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774656000000000000; parameter = #SO2; value = 8.9; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774656000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774656000000000000; parameter = #NOx; value = 0.7; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774656000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774656000000000000; parameter = #CO; value = 0.9; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774656000000000000 });
    nextAirReadingId += 1;

    // 2026-03-29
    airReadings.add({ id = nextAirReadingId; date = 1774742400000000000; parameter = #PM10; value = 61.2; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774742400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774742400000000000; parameter = #PM2_5; value = 41.6; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774742400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774742400000000000; parameter = #SO2; value = 9.3; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774742400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774742400000000000; parameter = #NOx; value = 2.7; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774742400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774742400000000000; parameter = #CO; value = 1.0; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774742400000000000 });
    nextAirReadingId += 1;

    // 2026-03-30
    airReadings.add({ id = nextAirReadingId; date = 1774828800000000000; parameter = #PM10; value = 65.7; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774828800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774828800000000000; parameter = #PM2_5; value = 46.0; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774828800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774828800000000000; parameter = #SO2; value = 9.5; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774828800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774828800000000000; parameter = #NOx; value = 3.9; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774828800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774828800000000000; parameter = #CO; value = 1.1; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774828800000000000 });
    nextAirReadingId += 1;

    // 2026-03-31
    airReadings.add({ id = nextAirReadingId; date = 1774915200000000000; parameter = #PM10; value = 30.8; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774915200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774915200000000000; parameter = #PM2_5; value = 17.6; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774915200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774915200000000000; parameter = #SO2; value = 9.1; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774915200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774915200000000000; parameter = #NOx; value = 0.6; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774915200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1774915200000000000; parameter = #CO; value = 1.0; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1774915200000000000 });
    nextAirReadingId += 1;

    // 2026-04-01
    airReadings.add({ id = nextAirReadingId; date = 1775001600000000000; parameter = #PM10; value = 36.7; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775001600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775001600000000000; parameter = #PM2_5; value = 21.1; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775001600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775001600000000000; parameter = #SO2; value = 10.1; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775001600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775001600000000000; parameter = #NOx; value = 6.7; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775001600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775001600000000000; parameter = #CO; value = 1.2; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775001600000000000 });
    nextAirReadingId += 1;

    // 2026-04-02
    airReadings.add({ id = nextAirReadingId; date = 1775088000000000000; parameter = #PM10; value = 63.3; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775088000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775088000000000000; parameter = #PM2_5; value = 44.2; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775088000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775088000000000000; parameter = #SO2; value = 9.8; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775088000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775088000000000000; parameter = #NOx; value = 1.1; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775088000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775088000000000000; parameter = #CO; value = 1.2; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775088000000000000 });
    nextAirReadingId += 1;

    // 2026-04-03
    airReadings.add({ id = nextAirReadingId; date = 1775174400000000000; parameter = #PM10; value = 59.1; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775174400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775174400000000000; parameter = #PM2_5; value = 36.3; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775174400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775174400000000000; parameter = #SO2; value = 9.4; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775174400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775174400000000000; parameter = #NOx; value = 1.5; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775174400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775174400000000000; parameter = #CO; value = 1.0; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775174400000000000 });
    nextAirReadingId += 1;

    // 2026-04-04
    airReadings.add({ id = nextAirReadingId; date = 1775260800000000000; parameter = #PM10; value = 33.4; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775260800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775260800000000000; parameter = #PM2_5; value = 20.3; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775260800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775260800000000000; parameter = #SO2; value = 8.8; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775260800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775260800000000000; parameter = #NOx; value = 0.1; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775260800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775260800000000000; parameter = #CO; value = 0.8; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775260800000000000 });
    nextAirReadingId += 1;

    // 2026-04-05
    airReadings.add({ id = nextAirReadingId; date = 1775347200000000000; parameter = #PM10; value = 16.4; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775347200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775347200000000000; parameter = #PM2_5; value = 9.1; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775347200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775347200000000000; parameter = #SO2; value = 8.9; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775347200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775347200000000000; parameter = #NOx; value = 0.5; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775347200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775347200000000000; parameter = #CO; value = 0.8; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775347200000000000 });
    nextAirReadingId += 1;

    // 2026-04-06
    airReadings.add({ id = nextAirReadingId; date = 1775433600000000000; parameter = #PM10; value = 11.5; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775433600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775433600000000000; parameter = #PM2_5; value = 10.6; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775433600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775433600000000000; parameter = #SO2; value = 9.1; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775433600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775433600000000000; parameter = #NOx; value = 0.6; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775433600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775433600000000000; parameter = #CO; value = 1.1; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775433600000000000 });
    nextAirReadingId += 1;

    // 2026-04-07
    airReadings.add({ id = nextAirReadingId; date = 1775520000000000000; parameter = #PM10; value = 19.2; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775520000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775520000000000000; parameter = #PM2_5; value = 19.3; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775520000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775520000000000000; parameter = #SO2; value = 9.2; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775520000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775520000000000000; parameter = #NOx; value = 1.4; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775520000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775520000000000000; parameter = #CO; value = 1.3; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775520000000000000 });
    nextAirReadingId += 1;

    // 2026-04-08
    airReadings.add({ id = nextAirReadingId; date = 1775606400000000000; parameter = #PM10; value = 22.8; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775606400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775606400000000000; parameter = #PM2_5; value = 15.4; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775606400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775606400000000000; parameter = #SO2; value = 9.0; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775606400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775606400000000000; parameter = #NOx; value = 0.8; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775606400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775606400000000000; parameter = #CO; value = 1.0; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775606400000000000 });
    nextAirReadingId += 1;

    // 2026-04-09
    airReadings.add({ id = nextAirReadingId; date = 1775692800000000000; parameter = #PM10; value = 19.5; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775692800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775692800000000000; parameter = #PM2_5; value = 16.1; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775692800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775692800000000000; parameter = #SO2; value = 8.9; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775692800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775692800000000000; parameter = #NOx; value = 0.2; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775692800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775692800000000000; parameter = #CO; value = 0.9; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775692800000000000 });
    nextAirReadingId += 1;

    // 2026-04-10
    airReadings.add({ id = nextAirReadingId; date = 1775779200000000000; parameter = #PM10; value = 50.5; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775779200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775779200000000000; parameter = #PM2_5; value = 39.6; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775779200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775779200000000000; parameter = #SO2; value = 9.1; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775779200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775779200000000000; parameter = #NOx; value = 1.2; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775779200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775779200000000000; parameter = #CO; value = 0.4; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775779200000000000 });
    nextAirReadingId += 1;

    // 2026-04-11
    airReadings.add({ id = nextAirReadingId; date = 1775865600000000000; parameter = #PM10; value = 74.7; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775865600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775865600000000000; parameter = #PM2_5; value = 58.6; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775865600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775865600000000000; parameter = #SO2; value = 9.3; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775865600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775865600000000000; parameter = #NOx; value = 2.8; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775865600000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775865600000000000; parameter = #CO; value = 0.7; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775865600000000000 });
    nextAirReadingId += 1;

    // 2026-04-12
    airReadings.add({ id = nextAirReadingId; date = 1775952000000000000; parameter = #PM10; value = 75.2; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775952000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775952000000000000; parameter = #PM2_5; value = 49.9; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775952000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775952000000000000; parameter = #SO2; value = 9.5; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775952000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775952000000000000; parameter = #NOx; value = 3.1; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775952000000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1775952000000000000; parameter = #CO; value = 0.9; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1775952000000000000 });
    nextAirReadingId += 1;

    // 2026-04-13
    airReadings.add({ id = nextAirReadingId; date = 1776038400000000000; parameter = #PM10; value = 76.0; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1776038400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1776038400000000000; parameter = #PM2_5; value = 49.9; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1776038400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1776038400000000000; parameter = #SO2; value = 9.6; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1776038400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1776038400000000000; parameter = #NOx; value = 2.7; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1776038400000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1776038400000000000; parameter = #CO; value = 1.0; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1776038400000000000 });
    nextAirReadingId += 1;

    // 2026-04-14
    airReadings.add({ id = nextAirReadingId; date = 1776124800000000000; parameter = #PM10; value = 60.0; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1776124800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1776124800000000000; parameter = #PM2_5; value = 41.2; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1776124800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1776124800000000000; parameter = #SO2; value = 9.1; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1776124800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1776124800000000000; parameter = #NOx; value = 1.6; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1776124800000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1776124800000000000; parameter = #CO; value = 1.1; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1776124800000000000 });
    nextAirReadingId += 1;

    // 2026-04-15
    airReadings.add({ id = nextAirReadingId; date = 1776211200000000000; parameter = #PM10; value = 57.6; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1776211200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1776211200000000000; parameter = #PM2_5; value = 40.0; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1776211200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1776211200000000000; parameter = #SO2; value = 9.1; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1776211200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1776211200000000000; parameter = #NOx; value = 0.9; unit = "µg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1776211200000000000 });
    nextAirReadingId += 1;
    airReadings.add({ id = nextAirReadingId; date = 1776211200000000000; parameter = #CO; value = 1.2; unit = "mg/m³"; location = "CAAQMS-1, GP IV/2&3"; measuredBy = "JPLTD (Jindal Power Limited)"; notes = ""; createdAt = 1776211200000000000 });
    nextAirReadingId += 1;

    // 5 piezometer readings
    piezoReadings.add({ id = nextPiezoReadingId; date = now - 3 * day; wellId = "PZ-001"; location = "North Mine Boundary"; depthToWater = 12.4; pH = 7.2; conductivity = 450.0; turbidity = 1.8; notes = "Normal levels"; measuredBy = "Hydrogeologist A"; createdAt = now - 3 * day });
    nextPiezoReadingId += 1;
    piezoReadings.add({ id = nextPiezoReadingId; date = now - 3 * day; wellId = "PZ-002"; location = "East Boundary"; depthToWater = 15.1; pH = 7.0; conductivity = 520.0; turbidity = 2.1; notes = "Slight conductivity increase, recheck next week"; measuredBy = "Hydrogeologist A"; createdAt = now - 3 * day });
    nextPiezoReadingId += 1;
    piezoReadings.add({ id = nextPiezoReadingId; date = now - 10 * day; wellId = "PZ-003"; location = "South Boundary"; depthToWater = 10.8; pH = 6.9; conductivity = 390.0; turbidity = 1.5; notes = "Stable readings"; measuredBy = "Hydrogeologist B"; createdAt = now - 10 * day });
    nextPiezoReadingId += 1;
    piezoReadings.add({ id = nextPiezoReadingId; date = now - 10 * day; wellId = "PZ-004"; location = "West Overburden Dump"; depthToWater = 18.3; pH = 7.5; conductivity = 610.0; turbidity = 3.2; notes = "Higher conductivity near dump, continue monitoring"; measuredBy = "Hydrogeologist B"; createdAt = now - 10 * day });
    nextPiezoReadingId += 1;
    piezoReadings.add({ id = nextPiezoReadingId; date = now - 20 * day; wellId = "PZ-001"; location = "North Mine Boundary"; depthToWater = 12.6; pH = 7.1; conductivity = 440.0; turbidity = 1.7; notes = "Baseline reading"; measuredBy = "Hydrogeologist A"; createdAt = now - 20 * day });
    nextPiezoReadingId += 1;

    // 3 tree records
    treeRecords.add({ id = nextTreeRecordId; species = "Neem (Azadirachta indica)"; plantingDate = now - 180 * day; location = "Green Belt - North Section"; count = 120; plantedBy = "Environment Dept"; notes = "Phase 1 plantation"; createdAt = now - 180 * day });
    nextTreeRecordId += 1;
    treeRecords.add({ id = nextTreeRecordId; species = "Peepal (Ficus religiosa)"; plantingDate = now - 180 * day; location = "Green Belt - East Section"; count = 80; plantedBy = "Environment Dept"; notes = "Phase 1 plantation"; createdAt = now - 180 * day });
    nextTreeRecordId += 1;
    treeRecords.add({ id = nextTreeRecordId; species = "Eucalyptus (Eucalyptus globulus)"; plantingDate = now - 90 * day; location = "Mine Periphery Road"; count = 100; plantedBy = "CSR Team"; notes = "Fast-growing species for rapid green cover"; createdAt = now - 90 * day });
    nextTreeRecordId += 1;
  };

  seedSampleData();

  include ComplianceApi(tasks, nextTaskId);
  include MonitoringApi(airReadings, nextAirReadingId, piezoReadings, nextPiezoReadingId);
  include TreesApi(treeRecords, nextTreeRecordId);
  include DashboardApi(tasks, airReadings, piezoReadings, treeRecords);
};
