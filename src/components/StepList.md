# Step List

## Usage

### Setup

Include the following in your app or website:

- `<link href="//baltimorecountymd.gov/sebin/j/n/step-list.css" rel="stylesheet" type="text/css">`
- `<script src="//baltimorecountymd.gov/sebin/r/z/dotgov-steplist.min.js"></script>`

The css will handle basic styling, feel free to override the styles with your own stylesheet.

The script will automatically handle any number of step lists on the page and the functionality to each list.

### Markup

Add your step list markup. It should match the snippet below.

```html
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
```

## Modifying Content

The only two pieces of content that should be modified is the button text and the details.

### Button

```html
<span class="dg_step-list__toggle-btn__title">Your Step Button Text Goes Here</span>
```

### Details

```html
<div class="dg_step-list__details" id="registration-panel-3" aria-labelledby="registration-step-3">
    <!-- put any html here -->
</div>
```



### Step List Item Association

The `id` of the step much match the step detail's `aria-labelledby`. In the example below, the id is `registration-step-1`.

**Step**

```html
<li class="dg_step-list__list-section" id="registration-step-1">
```

**Details**

```html
<div id="registration-panel-1" class="dg_step-list__details" aria-labelledby="registration-step-1">
```

### Step List Button Association

The `aria-controls` attribute of the step toggle button much match the step detail's `id`. In the example below, the id is `registration-panel-1`.

**Button**

```html
<button class="dg_step-list__toggle-btn" aria-expanded="false" aria-controls="registration-panel-1" type="button">
```

**Content**
```html
<div id="registration-panel-1" class="dg_step-list__details" aria-labelledby="registration-step-1">
```
