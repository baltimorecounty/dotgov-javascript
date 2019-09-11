import { getByLabelText, getByText, wait } from "@testing-library/dom";
let axios;

const createAppContainer = () => {
  document.body.innerHTML = `
    <div>
        <form id="service-request-form" name="service-request-form">
            <label for="TrackingNumber">Tracking Number</label>
            <input class="seInput seRequiredElement" id="TrackingNumber" name="TrackingNumber" type="text" />
            <button class="seButton" type="submit" id="get-report">Track Now</button>
        </form>
        <div class="hidden" id="sr-loading-indicator">
            <p>
              <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i> Loading your
              service request.
            </p>
            <span class="sr-only">Loading Service Request...</span>
          </div>
          <!-- App Container -->
          <div id="report-details"></div>
          <button
            class="seButton hidden"
            id="sr-reset-form"
            style="float:left;"
            type="button"
          >
            Look Up Another Report
          </button>
    </div>`;
};

const mockSuccessResponse = {
  comments: {
    ErrorsCount: 0,
    Results: [
      {
        AuthorName: "Test Guy",
        DateCreatedFormatted: "Aug 5, 2019 @ 03:10 PM",
        Id: "1146873",
        Text: "Thank you for contacting Baltimore County."
      }
    ]
  },
  report: {
    ErrorsCount: 0,
    Results: {
      DateCreated: "2019-08-05T15:10:04.03",
      DateUpdated: "2019-08-12T15:08:14.59",
      Description: "dasasd",
      FormattedAddress: "111 ALLEGHENY AVE, TOWSON, MD, 21204",
      Id: 262255,
      IsOpen: false,
      Latitude: 39.40152614298611,
      Longitude: -76.60603962513858,
      RequestType: "Test Request Type",
      StatusTypeIsClosed: false,
      StatusTypeReadable: "Received"
    }
  }
};

afterEach(() => {
  /** Reset document.body */
  document.body.firstChild.remove();
  jest.resetModules();
});

beforeEach(() => {
  createAppContainer();
  require("./FollowUp");
  axios = require("../../lib/axios").default;
});

jest.mock("axios");

test("should display the service request when a valid service request is searched", async () => {
  axios.get.mockResolvedValue({ data: mockSuccessResponse });
  const serviceRequestInput = getByLabelText(document, "Tracking Number");
  const submitButton = getByText(document, "Track Now");

  serviceRequestInput.value = "262255";
  submitButton.click();

  await wait(() => {
    const appContainer = document.getElementById("report-details");
    const reportContainerElement = appContainer.getElementsByClassName(
      "bc-citysourced-reporter"
    );

    expect(reportContainerElement.length).toEqual(1);
  });
});

test("should display a link when a user enters a animal service request id", () => {
  const serviceRequestInput = getByLabelText(document, "Tracking Number");
  const submitButton = getByText(document, "Track Now");

  serviceRequestInput.value = "ACCMP-262255";
  submitButton.click();

  const alertPanel = document.getElementById("citizen-access-info");
  const differentTrackingMessage = getByText(
    alertPanel,
    /.*in a different tracking system/i
  );

  expect(differentTrackingMessage).toBeTruthy();
});

test("should display a link when a user enters a vendor service request id", () => {
  const serviceRequestInput = getByLabelText(document, "Tracking Number");
  const submitButton = getByText(document, "Track Now");

  serviceRequestInput.value = "CC262255";
  submitButton.click();

  const alertPanel = document.getElementById("citizen-access-info");
  const differentTrackingMessage = getByText(
    alertPanel,
    /.*in a different tracking system/i
  );

  expect(differentTrackingMessage).toBeTruthy();
});

test("should display the default error on a server failure", async () => {
  axios.get.mockRejectedValue(new Error("Server Error"));
  const serviceRequestInput = getByLabelText(document, "Tracking Number");
  const submitButton = getByText(document, "Track Now");

  serviceRequestInput.value = "262255";
  submitButton.click();

  await wait(() => {
    const alertPanel = document.getElementById("report-details");
    const differentTrackingMessage = getByText(
      alertPanel,
      /.*connecting to our servers right now*/i
    );

    expect(differentTrackingMessage).toBeTruthy();
  });
});
