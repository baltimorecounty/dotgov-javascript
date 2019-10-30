# Accordion & Collapse

A javascript accordion and collapse similar inspired by bootstrap [collapse](https://getbootstrap.com/docs/4.3/components/collapse/).

## Accordion

An accordion will consist of multiple panels, which can be expanded and collapsed independently. A Show / Close all button should be located at the top of the accordion to allow users to easily expand or collapse all content. This component was inspired by the gov.uk [accordion](https://design-system.service.gov.uk/components/accordion/).

### Markup

In order for the accordion to work the following must be true:

Note: "The accordion" is referencing the main container of the markup with the class `dg_accordion`.

- The accordion must include the `dg_accordion`
- Each accordion button must have a unique `id` attribute the corresponding content area must have `aria-labelledby` specified and match the toggle button `id` attribute

```html
<div class="dg_accordion" id="accordionExample1">
  <button class="dg_allitems" id="menuActionButton1">
    Open All
  </button>
  <div class="collapsed dg_accordion__collapsible">
    <button id="accordion-header-1" class="fa dg_accordion-btn btn-link" type="button" aria-expanded="false">
      <span class="dg_accordion_buttontext-holder">Collapsible Group Item #1</span>
    </button>
    <div id="collapseOne1" class="multi-collapse collapse" aria-labelledby="accordion-header-1">
      <div class="dg_accordion-item-body">
        <p>Some content goes here</p>
      </div>
    </div>
  </div>
  <div class="collapsed dg_accordion__collapsible">
    <button id="accordion-header-2" class="fa dg_accordion-btn btn-link" type="button" aria-expanded="false">
      <span class="dg_accordion_buttontext-holder">
        Collapsible Group Item #2
      </span>
    </button>
    <div>
      This is a sub header
    </div>
    <div id="collapseTwo2" class="multi-collapse collapse" aria-labelledby="accordion-header-2">
      <div class="dg_accordion-item-body">
        <p>Some content goes here</p>
      </div>
    </div>
  </div>
  <div class="collapsed dg_accordion__collapsible">
    <button id="accordion-header-3" class="fa dg_accordion-btn btn-link" type="button" aria-expanded="false"">
      <span class="dg_accordion_buttontext-holder">
        Collapsible Group Item #3
      </span>
    </button>
    <div id="collapseThree3" class="multi-collapse collapse" aria-labelledby="accordion-header-3">
      <div class="dg_accordion-item-body">
        <p>Some content goes here</p>
      </div>
    </div>
  </div>
</div>
```

## Collapse

Expand or collapse a single section of a page based on bootstrap [collapse](https://getbootstrap.com/docs/4.3/components/collapse/). This component does not require the additional markup of the accordion.

### Markup

In order for the collapse to work the following must be true:

Note: "The collapse" is referencing the main container of the markup with the class `dg_collapse`.

- The collapse must include the `dg_collapse` and `dg_accordion__collapsible`
- Each collapse button must have a unique `id` attribute the corresponding content area must have `aria-labelledby` specified and match the toggle button `id` attribute.

**Note**: By default the collapse will be expanded. However, if you want to control this, you can set the `aria-expanded` attribute on the collapse button to `false` for it to be hidden by default.

```html
<div class="dg_collapse dg_accordion__collapsible">
  <button
    class="fa dg_accordion-btn btn-link"
    type="button"
    aria-expanded="true"
    id="collapse-example-1"
  >
    <span class="dg_accordion_buttontext-holder">
      New Collapsible Group Item #1
    </span>
  </button>
  <div
    id="collapseOne"
    class="multi-collapse collapse show"
    aria-expanded="true"
    aria-labelledby="collapse-example-1"
  >
    <div class="dg_accordion-item-body">
      <p>Some content goes here</p>
    </div>
  </div>
</div>
```
