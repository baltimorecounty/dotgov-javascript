# Modal

A javascript dialog for your site or app.

## Modal Markup

*Note*: The modal must include the `dg_modal` the in order for this to work.

```html
<div class="dg_modal dialog" id="my-awesome-modal">
  <div class="dialog-overlay" tabindex="-1" data-a11y-dialog-hide></div>
  <dialog class="dialog-content" aria-labelledby="dialog-title">
    <button type="button" class="dialog-close" data-a11y-dialog-hide aria-label="Close this dialog window">
      &times;
    </button>
    <h1 id="dialog-title">Dialog Title</h1>
    <p>This is content that lives inside of a dialog box. It's fully accessible which makes our users happy. And because it's inside of a dialog that pops up, it makes our designers and UX people happy as well.</p>

    <p>The focus is already on the close button. This way users do not need to tab again after reading the content in this box. Pushing ESC will also close this dialog.</p>

  </dialog>
  </section>
</div>

```

## Triggering the Modal

A button is used in order to trigger the modal, this can be included anywhre in your app or website. The `id` of the modal dialog must match the `data-a11y-dialog-show` attribute on the button that will trigger the modal.

```html
<button type="button" data-a11y-dialog-show="my-awesome-modal">
  Open Modal
</button>
```
