const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const app = express();
let database = null;
const dbPath = path.join(__dirname, "covid19India.db");
app.use(express.json());

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  } catch (error) {
    console.log(`Database error: ${error.message}`);
    process.exit(1);
  }
};
initializeDbAndServer();

//API to get the list of all the states & their details from the database
const ConvertStatesDbObject = (objectItem) => {
  return {
    stateId: objectItem.state_id,
    stateName: objectItem.state_name,
    population: objectItem.population,
  };
};
app.get("/states/", async (request, response) => {
  const getStateDetailsListQuery = `
    select * from state;
  `;
  const getStateDetailsListQueryResponse = await database.all(
    getStateDetailsListQuery
  );
  response.send(
    getStateDetailsListQueryResponse.map((eachStateDetail) =>
      ConvertStatesDbObject(eachStateDetail)
    )
  );
});
//API to return the state details based on state id
app.get("/states/:stateId/", async (request, response) => {
  const { stateId } = request.params;
  const getStateDetailsQuery = `
    select * 
    from state 
    where state_id = ${stateId};`;
  const getStateDetailsQueryResponse = await database.get(getStateDetailsQuery);
  response.send(ConvertStatesDbObject(getStateDetailsQueryResponse));
});
//API to insert a district in district table.
app.post("/districts/", async (request, response) => {
  const { districtName, stateId, cases, cured, active, deaths } = request.body;
  const insertDistrictQuery = `
        insert into
        district(district_name, state_id, cases, cured, active, deaths)
        values("${districtName}",${stateId},${cases},${cured},${active},${deaths})
    `;
  const insertDistrictQueryResponse = await database.run(insertDistrictQuery);
  response.send("District Successfully Added");
});
//API to return the district details based on the district Id
const ConvertDistrictDbObject = (objectItem) => {
  return {
    districtId: objectItem.district_id,
    districtName: objectItem.district_name,
    stateId: objectItem.state_id,
    cases: objectItem.cases,
    cured: objectItem.cured,
    active: objectItem.active,
    deaths: objectItem.deaths,
  };
};
app.get("/districts/:districtId/", async (request, response) => {
  const { districtId } = request.params;
  const getDistrictDetailsQuery = `
    select * 
    from district 
    where district_id = ${districtId};`;
  const getDistrictDetailsQueryResponse = await database.get(
    getDistrictDetailsQuery
  );
  response.send(ConvertDistrictDbObject(getDistrictDetailsQueryResponse));
});
//API to delete a district from the district table based on the district ID
app.delete("/districts/:districtId", async (request, response) => {
  const { districtId } = request.params;
  const removeDistrictQuery = `
        delete from district
        where district_id = ${districtId};
    `;
  constRemoveQueryResponse = await database.run(removeDistrictQuery);
  response.send("District Removed");
});
//API to Update the details of a specific district based on the district ID
app.put("/districts/:districtId/", async (request, response) => {
  const { districtId } = request.params;
  const { districtName, stateId, cases, cured, active, deaths } = request.body;
  const updateDistrictQuery = `
    update district set
        district_name = '${districtName}',
        state_id = ${stateId},
        cases = ${cases},
        cured = ${cured},
        active = ${active},
        deaths = ${deaths} 
    where 
        district_id = ${districtId};
  `;

  const updateDistrictQueryResponse = await database.run(updateDistrictQuery);
  response.send("District Details Updated");
});
//API to return the statistics of total cases, cured, active, deaths of a specific state based on state ID
app.get("/states/:stateId/stats/", async (request, response) => {
  const { stateId } = request.params;
  const getStateStatsQuery = `
        select 
            sum(cases) as totalCases,
            sum(cured) as totalCured,
            sum(active) as totalActive,
            sum(deaths) as totalDeaths
        from
            district
        where
            state_id = ${stateId};
    `;
  const getStateStatsQueryResponse = await database.get(getStateStatsQuery);
  response.send(getStateStatsQueryResponse);
});
//API to return an object containing the state name of a district based on the district ID
app.get("/districts/:districtId/details/", async (request, response) => {
  const { districtId } = request.params;
  const getDistrictIdQuery = `
    select state_id 
    from district
    where district_id = ${districtId};
  `;
  const getDistrictIdQueryResponse = await database.get(getDistrictIdQuery);
  //console.log(typeof getDistrictIdQueryResponse.state_id);
  const getStateNameQuery = `
        select state_name as stateName 
        from state 
        where state_id = ${getDistrictIdQueryResponse.state_id};
    `;
  const getStateNameQueryResponse = await database.get(getStateNameQuery);
  response.send(getStateNameQueryResponse);
});

module.exports = app;
