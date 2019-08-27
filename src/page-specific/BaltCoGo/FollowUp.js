function CheckID() {
	var animalVendorComplaint = RegExp(/^(ACCMP)/i);
	var standardVendorComplaint = RegExp(/^(CC|CRH|CS|PP|TS|CE|CP|CB|CG)\d+$/i);
	var standardComplaint = RegExp(/^\d+$/i);
	var AlertURL = '';

	var trackingNumber = document.getElementById('TrackingNumber').value;
	var UserInfoPanel = document.getElementById('citizen-access-info');
	var UserInfoPanelBadID = document.getElementById('UserBadIDPanel');

	var RedirectURL = document.getElementById('RedirectURLParameter');

	UserInfoPanel.style.display = 'none';
	UserInfoPanelBadID.style.display = 'none';

	if (animalVendorComplaint.test(trackingNumber)) {
		UserInfoPanel.style.display = '';
		AlertURL = 'https://citizenaccess.baltimorecountymd.gov/CitizenAccess/Cap/CapHome.aspx?&Module=Enforce';
		RedirectURL.setAttribute('href', AlertURL);
	} else if (standardVendorComplaint.test(trackingNumber)) {
		UserInfoPanel.style.display = '';
		AlertURL = 'https://citizenaccess.baltimorecountymd.gov/CitizenAccess/Cap/CapHome.aspx?&Module=Enforcement';
		RedirectURL.setAttribute('href', AlertURL);
	} else if (standardComplaint.test(trackingNumber)) {
		GetReport();
	} else {
		UserInfoPanelBadID.style.display = '';
	}

	function GetReport() {
		var reportTemplate = '{{#each (limit Data 3)}}<p>{{Comment}}</p>{{/each}}';
		reportTemplate += '<div id="target">{{#each (skip Data 3)}}<p>{{Comment}}</p>{{/each}}</div>';
		reportTemplate += '<button type="button" data-a11y-toggle="target">Show more...</button>';
		BcApiHelpers.display({
			url:
				'https://testservices.baltimorecountymd.gov/platform.citysourced.net/servicerequests/' +
				document.getElementById('TrackingNumber').value,
			params: {},
			template: reportTemplate,
			targetId: 'app'
		}).then(function() {
			window.a11yToggle();
		});
	}
}
