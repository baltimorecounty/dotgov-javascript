import axios from "../../lib/axios";
import { Config } from "@baltimorecounty/javascript-utilities";

const { setConfig, getValue } = Config;

const initialEndpoint = "platform.citysourced.net/servicerequests";

const testApiRoot = `https://testservices.baltimorecountymd.gov/${initialEndpoint}`;
const prodApiRoot = `https://services.baltimorecountymd.gov/${initialEndpoint}`;

// HACK - the Config utiltiy does not account for beta.
// TODO: This will need to be addressed when we get closer to launch
const localApiRoot =
  window.location.hostname.indexOf("beta") > -1
    ? testApiRoot
    : `//localhost:54727/${initialEndpoint}`;

const configValues = {
  local: {
    apiRoot: localApiRoot,
  },
  development: {
    apiRoot: testApiRoot,
  },
  staging: {
    apiRoot: testApiRoot,
  },
  production: {
    apiRoot: prodApiRoot,
  },
};

setConfig(configValues);

const BuildTable = () => {
  const data = axios
    .get(
      "https://bcgis.baltimorecountymd.gov/arcgis/rest/services/Apps/RoadClosureProd/MapServer/0"
    )
    .then((response) => response.data)
    .catch(displayServerError);

  console.log(data);
};

BuildTable();
