export default (type = null) => `
<style>
      .dg_step-list.static .dg_step-list__toggle-btn {
        cursor: default;
      }
      .dg_step-list.static .dg_step-list__toggle-btn__btn-text,
      .dg_step-list.static .dg_step-list__show-all-btn {
        display: none;
      }

      .dg_step-list__list {
        counter-reset: my-awesome-counter;
        list-style: none;
        padding-left: 60px;
      }

      .dg_step-list__list > li {
        border-bottom: 1px solid #e0e0e0;
        margin-bottom: 15px;
        padding-bottom: 15px;
        counter-increment: my-awesome-counter;
        position: relative;
      }

      .dg_step-list__list > li:first-child {
        border-top: 1px solid #e0e0e0;
        padding-top: 15px;
      }

      .dg_step-list__list > li::before {
        background: white;
        border: 2px solid black;
        content: counter(my-awesome-counter);
        font-weight: bold;
        font-size: 20px;
        position: absolute;
        top: -5px;
        bottom: 0;
        left: -60px;
        height: 40px;
        width: 40px;
        line-height: 38px; /* Offset by the border width */
        border-radius: 50%;
        text-align: center;
      }

      .dg_step-list__list > li::after {
        content: "";
        position: absolute;
        z-index: -2;
        width: 0;
        height: 100%;
        border-left: 2px solid #e0e0e0;
        background: white;
        left: -41px; /* I think this offset is being caused by the border width */
        top: 30px;
      }

      .dg_step-list__list > li:last-child::after {
        border: none;
      }

      .dg_step-list__list > li:first-child::before {
        top: 15px;
      }

      .dg_step-list__toggle-btn,
      .dg_step-list__toggle-btn__title {
        display: inline-block;
      }

      .dg_step-list__toggle-btn {
        background: none;
        border: none;
        padding: 0;
        text-align: left;
      }

      .dg_step-list__toggle-btn__title {
        font-size: 24px;
        font-family: Arial, Helvetica, sans-serif;
      }

      .dg_step-list__toggle-btn__btn-text {
        color: #002280;
        display: block;
        font-size: 16px;
      }

      .dg_step-list__toggle-btn__btn-text:hover {
        color: #1076bc;
        cursor: pointer;
        text-decoration: none;
      }

      .dg_step-list__show-all-btn {
        margin-bottom: 15px;
      }

      .dg_step-list__details {
        margin-top: 15px;
      }
    </style>
    <div class="dg_step-list ${type}">
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
            <p>Step 2 details.</p>
        </div>
        </li>
        <li class="dg_step-list__list-section" id="registration-step-3">
            <button class="dg_step-list__toggle-btn" aria-expanded="false" aria-controls="registration-panel-3" type="button">
                <span class="dg_step-list__toggle-btn__title">Step 3: Gather Required Documentation</span>
                <span class="dg_step-list__toggle-btn__btn-text">Show</span>
            </button>
            <div class="dg_step-list__details" id="registration-panel-3" aria-labelledby="registration-step-3">
                <p>Step 3 details.</p>
            </div>
        </li>
    </ol>
    </div>
`;
