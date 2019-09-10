import { compileTemplate } from "./TemplateHelpers";
import { parseISO, format } from "date-fns";

const dateFormat = "MM/dd/yyyy hh:mm a";
const formatDate = dateString => format(parseISO(dateString), dateFormat);

const commentsTemplateFn = comments =>
  `<h3>Comments</h3>
    <ul id="comments">${comments
      .map(
        comment =>
          `<li>${comment.Text}
                <div class="attribution">
                    <span class="author-name">${comment.AuthorName}</span>
                    <span class="author-date">${comment.DateCreatedFormatted}</span>
                </div>
            </li>`
      )
      .join("")}
    </ul>`;

const reportDetailsTemplateFn = (report, comments) => {
  const sortedComments = [...comments].reverse();

  return compileTemplate(
    `<div class="bc-citysourced-reporter">
        <div id="citysourced-viewer">
            <h2>
                Report Status <span>${report.StatusTypeReadable}</span>
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
            ${
              comments && comments.length > 0
                ? commentsTemplateFn(sortedComments)
                : "<p>No comments available at this time</p>"
            }
        </div>
    </div>`
  );
};

const error = text =>
  compileTemplate(
    `<div role="alert" class="alert-information bc_alert">
        <i class="fa fa-icon fa-2x fa-info-circle"></i>
        <p>${text}</p>
    </div>`
  );

const defaultErrorTemplateFn = () =>
  error(
    "We couldn’t find any records that match the ID number you entered. Please double check the number and try again."
  );

const defaultServerErrorTemplateFn = () =>
  error(
    "We’re having trouble connecting to our servers right now. Please try again in a few minutes."
  );

const errorTemplateFn = error =>
  compileTemplate(
    `<div class="alert-information" id="citizen-access-info">
        <p>The record you’re looking for is available in a different tracking system. Please visit <a id="RedirectURLParameter" href="${error.url}">Baltimore County Online Services</a> and enter the tracking number again.</p>
        <p>We’re working to better integrate these systems in the future. Until then, we apologize for any inconvenience this may cause.</p>
    </div>`
  );

export {
  defaultErrorTemplateFn,
  defaultServerErrorTemplateFn,
  commentsTemplateFn,
  errorTemplateFn,
  reportDetailsTemplateFn
};
