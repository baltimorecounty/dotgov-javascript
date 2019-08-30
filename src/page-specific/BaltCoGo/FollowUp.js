import axios from '../../lib/axios';
import { defaultErrorTemplate, errorTemplateFn, reportDetailsTemplateFn } from '../../templates/BaltCoGo-Templates';
//const targetEndpoint = '//localhost:54727/platform.citysourced.net/servicerequests';
const targetEndpoint = '//testservices.baltimorecountymd.gov/platform.citysourced.net/servicerequests';

const appDocumentIds = {
	form: 'service-request-form',
	loadingIndicator: 'sr-loading-indicator',
	reportDetails: 'report-details',
	resetForm: 'sr-reset-form',
	submit: 'get-report'
};

const clearResults = () => {
	displayResults('');
};

/**
 * Displays any Result Success or Failure
 * @param {*} html
 */
const displayResults = (html) => {
	const resultsElm = document.getElementById(appDocumentIds.reportDetails);
	resultsElm.innerHTML = '';
	if (html) {
		resultsElm.appendChild(html);
	}
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

const getElmById = (id) => document.getElementById(id);

const toggleElm = (elms = [], status = 'show') => {
	elms.forEach((elm) => {
		if (status.toLowerCase() === 'show') {
			elm.classList.remove('hidden');
		} else {
			elm.classList.add('hidden');
		}
	});
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
		name: 'StandardServiceRequest',
		testRegex: RegExp(/^\d+$/i),
		action: (trackingNumber) =>
			axios
				.get(`${targetEndpoint}/${trackingNumber}`)
				.then((response) => response.data)
				.then(displayServiceRequest)
				.catch(displayDefaultError)
	},
	{
		name: 'default',
		action: displayDefaultError
	}
];

const GetReport = async (submitEvent) => {
	submitEvent.preventDefault();
	const trackingNumber = document.getElementById('TrackingNumber').value;
	for (let i = 0, len = reportTypes.length; i < len; i++) {
		const reportType = reportTypes[i];
		if (reportType.name === 'default' || reportType.testRegex.test(trackingNumber)) {
			toggleElm([ getElmById(appDocumentIds.form) ], 'hide');
			toggleElm([ getElmById(appDocumentIds.loadingIndicator) ], 'show');

			try {
				await reportType.action(trackingNumber);
			} catch (ex) {
			} finally {
				toggleElm([ getElmById(appDocumentIds.loadingIndicator) ], 'hide');
				toggleElm([ getElmById(appDocumentIds.resetForm) ], 'show');
			}

			break;
		}
	}
};

const ResetForm = () => {
	clearResults();
	const formElm = getElmById(appDocumentIds.form);
	toggleElm([ formElm ], 'show');
	toggleElm([ getElmById(appDocumentIds.resetForm) ], 'hide');
	formElm.scrollIntoView();
};

/** Events */
document.getElementById(appDocumentIds.form).addEventListener('submit', GetReport);
document.getElementById(appDocumentIds.resetForm).addEventListener('click', ResetForm);
