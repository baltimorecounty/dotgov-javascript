import { compileTemplate } from "./TemplateHelpers";
import { parseISO, format } from "date-fns";

const dateFormat = "MM/dd/yyyy hh:mm a";
const formatDate = (dateString) => format(parseISO(dateString), dateFormat);

const commentsTemplateFn = (comments) =>
  `<h4>Comments</h4>
    <ul id="comments">${comments
      .map(
        (comment) =>
          `<div class="dg_card text-left">
          ${comment.Text}
          <div class="dg_card__content">
            <span style="font-weight: bold">${comment.AuthorName}</span>
            <span style="font-style: italic">${comment.DateCreatedFormatted}</span>
          </div>
        </div>`
      )
      .join("")}
    </ul>`;

const reportDetailsTemplateFn = (report, comments) => {
  const sortedComments = [...comments].reverse();

  return compileTemplate(
    `<div class="table-responsive">
      <h3>
        Report Status: <span>${report.StatusTypeReadable}</span>
      </h3>
      <table class="table">
        <tbody>
          <tr>
            <th>Request ID</th>
            <td>${report.Id}</td>
          </tr>
          <tr>
            <th>Issue Type</th>
            <td>${report.RequestType}</td>
          </tr>
          <tr>
            <th>Date Created</th>
            <td>${formatDate(report.DateCreated)}</td>
          </tr>
          <tr>
            <th>Last Updated</th>
            <td>${formatDate(report.DateUpdated)}</td>
          </tr>
          <tr>
            <th>Location</th>
            <td id="location">${report.FormattedAddress}</td>
          </tr>
        </tbody>
      </table>
      ${
        comments && comments.length > 0
          ? commentsTemplateFn(sortedComments)
          : ""
      }
    </div>`
  );
};

const defaultWarningTemplateFn = () =>
  compileTemplate(
    `<div class="dg_alert status warning">
      <span class="dg_alert__status">
        <i class="dg_alert__icon far fa-exclamation-triangle"></i>
        warning
      </span>
      <p>
        We couldn’t find any records that match the ID number you entered.
        Please double check the number and try again.
      </p>
    </div>`
  );

const defaultServerErrorTemplateFn = () =>
  compileTemplate(
    `<div class="dg_alert status error">
      <span class="dg_alert__status">
        <i class="dg_alert__icon fas fa-exclamation-circle"></i>
        error
      </span>
      <p>
        We’re having trouble connecting to our servers right now. Please try
        again in a few minutes.
      </p>
    </div>`
  );

const infoTemplateFn = (error) =>
  compileTemplate(
    `<div class="dg_alert status information">
      <span class="dg_alert__status">
        <i class="dg_alert__icon far fa-info-circle"></i>
        information
      </span>
      <p>The record you’re looking for is available in a different tracking system. Please visit <a id="RedirectURLParameter" href="${error.url}">Baltimore County Online Services</a> and enter the tracking number again.</p>
      <p>We’re working to better integrate these systems in the future. Until then, we apologize for any inconvenience this may cause.</p>
    </div>`
  );

export {
  defaultWarningTemplateFn,
  defaultServerErrorTemplateFn,
  commentsTemplateFn,
  infoTemplateFn,
  reportDetailsTemplateFn,
};
