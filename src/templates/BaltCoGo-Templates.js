import { compileTemplate } from './TemplateHelpers';
import { parseISO, format } from 'date-fns';

const dateFormat = 'MM/dd/yyyy hh:mm a';
const formatDate = (dateString) => format(parseISO(dateString), dateFormat);

const commentsTemplateFn = (comments) =>
	`<h3>Comments</h3><ul id="comments">
			${comments
				.map(
					(comment) =>
						`<li>${comment.Text}
							<div class="attribution">
								<span class="author-name">${comment.AuthorName}</span>
								<span class="author-date">${comment.DateCreatedFormatted}</span>
							</div>
						</li>`
				)
				.join('')}
		</ul>`;

const reportDetailsTemplateFn = (report, comments) => {
	const statusClass = report.IsOpen ? 'open' : report.StatusTypeReadable === 'On Hold' ? 'on-hold' : 'closed';
	const statusText = report.IsOpen
		? 'Open'
		: report.StatusTypeReadable === 'On Hold' ? report.StatusTypeReadable : 'Closed';
	const sortedComments = [ ...comments ].reverse();

	return compileTemplate(
		`<div class="bc-citysourced-reporter">
			<div class="callout_gray" id="citysourced-viewer">
				<h2>
					Report Status <span class=${statusClass.toLowerCase()}>${statusText}</span>
				</h2>
				<dl id="meta">
					<dt>Request ID</dt>
					<dd>${report.Id}</dd>
					<dt>Issue Type</dt>
					<dd>${report.RequestType}</dd>
					<dt>Date Created</dt>
					<dd>
						${formatDate(report.DateCreated)}
					</dd>
					<dt>Last Updated</dt>
					<dd>
						${formatDate(report.DateUpdated)}
					</dd>
					<dt>Location</dt>
					<dd id="location">${report.FormattedAddress}</dd>
				</dl>
				${comments ? commentsTemplateFn(sortedComments) : '<p>No comments available at this time</p>'}
			</div>
		</div>`
	);
};

const defaultErrorTemplate = compileTemplate(
	`<div role="alert" class="alert-information bc_alert" id="UserBadIDPanel">
		<i class="fa fa-icon fa-2x fa-info-circle"></i>
		<p>We are having trouble looking up this record. Please call 410-887-2450 to verify your tracking number.</p>
	</div>`
);

const errorTemplateFn = (error) =>
	compileTemplate(
		`<div class="alert-information" id="citizen-access-info">
			<p>The record you’re looking for is available in a different tracking system. Please visit <a id="RedirectURLParameter" href="${error.url}">Baltimore County Online Services</a> and enter the tracking number again.</p>
			<p>We’re working to better integrate these systems in the future. Until then, we apologize for any inconvenience this may cause.</p>
		</div>`
	);

export { defaultErrorTemplate, commentsTemplateFn, errorTemplateFn, reportDetailsTemplateFn };
