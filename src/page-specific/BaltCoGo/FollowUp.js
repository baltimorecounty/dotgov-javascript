import axios from "../../lib/axios";
import { Config } from "@baltimorecounty/javascript-utilities";
import {
  defaultWarningTemplateFn,
  defaultServerErrorTemplateFn,
  infoTemplateFn,
  reportDetailsTemplateFn,
} from "../../templates/BaltCoGo-Templates";

/**
 * Setup the api endpoints for the different environments
 */
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

const appDocumentIds = {
  form: "service-request-form",
  loadingIndicator: "sr-loading-indicator",
  reportDetails: "report-details",
  resetForm: "sr-reset-form",
  submit: "get-report",
};

/**
 * Clear the results container
 */
const clearResults = () => {
  displayResults("");
};

/**
 * Displays any Result Success or Failure
 * @param {*} html
 */
const displayResults = (html) => {
  const resultsElm = document.getElementById(appDocumentIds.reportDetails);
  resultsElm.innerHTML = "";
  if (html) {
    resultsElm.appendChild(html);
  }
};

/**
 * Displays a service request based on the report details template
 * @param {object} serviceRequest
 */
const displayServiceRequest = (serviceRequest) => {
  const { report = {}, comments = [] } = serviceRequest;

  if (report.ErrorsCount === 0) {
    const reportDetails = reportDetailsTemplateFn(
      report.Results,
      comments.Results
    );
    displayResults(reportDetails);
  } else {
    displayDefaultWarning();
  }

  return serviceRequest;
};

/**
 * Displays a default error for the application
 */
const displayDefaultWarning = () => {
  displayResults(defaultWarningTemplateFn());
};

/**
 * Displays a server error
 */
const displayServerError = () => {
  displayResults(defaultServerErrorTemplateFn());
};

/**
 * Display an error showing the report tracking info is stored in another system
 * @param {*} url
 */
const displayWrongTrackingSystem = (url) => {
  const errorHtml = infoTemplateFn({
    url,
  });
  displayResults(errorHtml);
};

/** Shortcut function for document */
const getElmById = (id) => document.getElementById(id);

/** Toggle the visibility of an element  */
const toggleElm = (elm, status = "show") => {
  if (status.toLowerCase() === "show") {
    elm.classList.remove("hidden");
  } else {
    elm.classList.add("hidden");
  }
};

/**
 * Toggle a list of elements visibility
 * @param {*} elms
 * @param {*} status
 */
const toggleElms = (elms = [], status = "show") => {
  elms.forEach((elm) => {
    toggleElm(elm, status);
  });
};

/**
 * List of actions for a service request based on the format of the service request number
 */
const reportTypes = [
  {
    name: "AnimalServiceRequest",
    testRegex: RegExp(/^(ACCMP)/i),
    action: () => {
      displayWrongTrackingSystem(
        "https://citizenaccess.baltimorecountymd.gov/CitizenAccess/Cap/CapHome.aspx?&Module=Enforce"
      );
    },
  },
  {
    name: "VendorServiceRequest",
    testRegex: RegExp(/^(CC|CRH|CS|PP|TS|CE|CP|CB|CG)\d+$/i),
    action: () => {
      displayWrongTrackingSystem(
        "https://citizenaccess.baltimorecountymd.gov/CitizenAccess/Cap/CapHome.aspx?&Module=Enforcement"
      );
    },
  },
  {
    name: "StandardServiceRequest",
    testRegex: RegExp(/^\d{1,10}$/i),
    action: (trackingNumber) =>
      axios
        .get(`${getValue("apiRoot")}/${trackingNumber}`)
        .then((response) => response.data)
        .then(displayServiceRequest)
        .catch(displayServerError),
  },
  {
    name: "default",
    action: displayDefaultWarning,
  },
];

/**
 * Get follow up information based on a given service request number
 * @param {*} submitEvent
 */
const GetReport = async (submitEvent) => {
  submitEvent.preventDefault();
  const trackingNumber = document.getElementById("TrackingNumber").value.trim();
  for (let i = 0, len = reportTypes.length; i < len; i++) {
    const reportType = reportTypes[i];
    if (
      reportType.name === "default" ||
      reportType.testRegex.test(trackingNumber)
    ) {
      toggleElms([getElmById(appDocumentIds.form)], "hide");
      toggleElms([getElmById(appDocumentIds.loadingIndicator)], "show");
      try {
        await reportType.action(trackingNumber);
      } catch (ex) {
        console.log(ex);
        displayServerError();
      } finally {
        toggleElms([getElmById(appDocumentIds.loadingIndicator)], "hide");
        toggleElms([getElmById(appDocumentIds.resetForm)], "show");
      }

      break;
    }
  }
};

/** Reset the follow up form to it's initial state */
const ResetForm = () => {
  clearResults();
  const formElm = getElmById(appDocumentIds.form);
  toggleElms([formElm], "show");
  toggleElms([getElmById(appDocumentIds.resetForm)], "hide");
  getElmById("dg_main-content").scrollIntoView();
};

/** Events */
document
  .getElementById(appDocumentIds.form)
  .addEventListener("submit", GetReport);
document
  .getElementById(appDocumentIds.resetForm)
  .addEventListener("click", ResetForm);
