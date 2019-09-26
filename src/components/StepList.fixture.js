export default `
    <div class="dg_step-list collapsed">
    <button class="dg_step-list__show-all-btn">Show All</button>
    <ol class="dg_step-list__list">
        <li class="dg_step-list__list-section" id="registration-step-1">
        <button class="dg_step-list__toggle-btn" aria-expanded="false" aria-controls="registration-panel-1" type="button">
            <span class="dg_step-list__toggle-btn__title">Step 1: Know the Registration Fees</span>
            <span class="dg_step-list__toggle-btn__btn-text">Show</span>
        </button>
        <div id="registration-panel-1" class="dg_step-list__details" aria-labelledby="registration-step-1">
            <p>Step 1 details.</p>
        </div>
        </li>
        <li class="dg_step-list__list-section" id="registration-step-2">
        <button class="dg_step-list__toggle-btn" aria-expanded="false" aria-controls="registration-panel-2" type="button">
            <span class="dg_step-list__toggle-btn__title">Step 2: Have Your Property Inspected</span>
            <span class="dg_step-list__toggle-btn__btn-text">Show</span>
        </button>
        <div class="dg_step-list__details" id="registration-panel-2" aria-labelledby="registration-step-2">
            <p>
            Have an inspection performed by a
            <a title="Find state licensed home inspectors." href="http://www.dllr.state.md.us/pq/">state-licensed home inspector</a>. The inspector must complete an
            <a target="_blank" onclick="window.open('http://resources.baltimorecountymd.gov/Documents/Permits/rental_registration/5inspectionsheet.pdf', '_blank', 'toolbar=yes,menubar=yes,location=yes,scrollbars=yes,resizable=yes,status=yes,width=800,height=600'); return false;" title="Download inspection sheet filled out by an inspector. (opens new window)" href="http://resources.baltimorecountymd.gov/Documents/Permits/rental_registration/5inspectionsheet.pdf">Inspection Sheet</a>
            (PDF) for each unit you intend to rent.
            </p>
        </div>
        </li>
        <li class="dg_step-list__list-section" id="registration-step-3">
        <button class="dg_step-list__toggle-btn" aria-expanded="false" aria-controls="registration-panel-3" type="button">
            <span class="dg_step-list__toggle-btn__title">Step 3: Gather Required Documentation</span>
            <span class="dg_step-list__toggle-btn__btn-text">Show</span>
        </button>
        <div class="dg_step-list__details" id="registration-panel-3" aria-labelledby="registration-step-3">
            <p>You must provide the following with your application:</p>
            <ul>
            <li>
                The
                <a target="_blank" onclick="window.open('http://resources.baltimorecountymd.gov/Documents/Permits/rental_registration/5inspectionsheet.pdf', '_blank', 'toolbar=yes,menubar=yes,location=yes,scrollbars=yes,resizable=yes,status=yes,width=800,height=600'); return false;" title="Download the inspection sheet to be filled out by inspector. (opens new window)" href="http://resources.baltimorecountymd.gov/Documents/Permits/rental_registration/5inspectionsheet.pdf">Inspection Sheet</a>
                (PDF) completed by a
                <a title="Find state-licensed home inspectors." href="http://www.dllr.state.md.us/pq/">licensed home inspector</a>
                in Step 2 above
            </li>
            <li>
                A
                <a target="_blank" onclick="window.open('http://resources.baltimorecountymd.gov/Documents/Permits/rental_registration/alarmverificationform.pdf', '_blank', 'toolbar=yes,menubar=yes,location=yes,scrollbars=yes,resizable=yes,status=yes,width=800,height=600'); return false;" title="Download form to verify carbon monoxide alarm is installed. (opens new window)" href="http://resources.baltimorecountymd.gov/Documents/Permits/rental_registration/alarmverificationform.pdf">Carbon Monoxide Alarm Verification</a>
                (PDF)
            </li>
            <li>
                If the home was built before 1978, a lead inspection
                certificate
            </li>
            </ul>
        </div>
        </li>
    </ol>
    </div>
`;
