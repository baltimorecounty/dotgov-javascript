import axios from '../../lib/axios';
import { defaultErrorTemplate, errorTemplateFn, reportDetailsTemplateFn } from '../../templates/BaltCoGo-Templates';

/**
 * Displays any Result Success or Failure
 * @param {*} html
 */
const displayResults = (html) => {
	const resultsElm = document.getElementById('report-details');
	resultsElm.innerHTML = '';
	resultsElm.appendChild(html);
};

const displayServiceRequest = (serviceRequest) => {
	const { report = {}, comments = [] } = serviceRequest;

	if (report.ErrorsCount === 0) {
		const reportDetails = reportDetailsTemplateFn(report.Results, comments.Results);
		displayResults(reportDetails);
	} else {
		displayDefaultError();
	}

	return serviceRequest;
};

const displayDefaultError = () => {
	displayResults(defaultErrorTemplate);
};

/**
 * Display an error showing the report tracking info is stored in another system
 * @param {*} url
 */
const displayWrongTrackingSystem = (url) => {
	const errorHtml = errorTemplateFn({
		url
	});
	displayResults(errorHtml);
};

const reportTypes = [
	{
		name: 'AnimalServiceRequest',
		testRegex: RegExp(/^(ACCMP)/i),
		action: () => {
			displayWrongTrackingSystem(
				'https://citizenaccess.baltimorecountymd.gov/CitizenAccess/Cap/CapHome.aspx?&Module=Enforce'
			);
		}
	},
	{
		name: 'VendorServiceRequest',
		testRegex: RegExp(/^(CC|CRH|CS|PP|TS|CE|CP|CB|CG)\d+$/i),
		action: () => {
			displayWrongTrackingSystem(
				'https://citizenaccess.baltimorecountymd.gov/CitizenAccess/Cap/CapHome.aspx?&Module=Enforcement'
			);
		}
	},
	{
		name: 'StandardServiceReqeust',
		testRegex: RegExp(/^\d+$/i),
		action: (trackingNumber) => {
			axios
				.get(`//localhost:54727/platform.citysourced.net/servicerequests/${trackingNumber}`)
				.then((response) => response.data)
				.then(displayServiceRequest)
				.catch(displayDefaultError);
		}
	},
	{
		name: 'default',
		action: displayDefaultError
	}
];

const GetReport = () => {
	const trackingNumber = document.getElementById('TrackingNumber').value;
	for (let i = 0, len = reportTypes.length; i < len; i++) {
		const reportType = reportTypes[i];
		if (reportType.name === 'default' || reportType.testRegex.test(trackingNumber)) {
			reportType.action(trackingNumber);
			break;
		}
	}
};

/** Events */
document.getElementById('get-report').addEventListener('click', GetReport);
