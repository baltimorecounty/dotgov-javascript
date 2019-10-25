# Modal

A javascript dialog for your site or app.

## Modal Markup

In order for the modal to work the following must be true:

Note: "The modal" is referencing the main container of the markup with the class `dg_modal`.

- The modal must include the `dg_modal`
- The modal must have a unique `id` attribute
- The modal must have `role="dialog"` specified
- The modal must have `aria-modal="true""` specified
- The modal must have `aria-labelledby` specified and match the heading of the modal's `id` attribute
- The modal must contain a heading with an `id` attribute that matches `aria-labelledby` of the modal.


```html
<div
    class="dg_modal hidden"
    id="my-accessible-dialog"
    role="dialog"
    aria-labelledby="my-accessible-dialog_label"
    aria-modal="true">
        <button type="button" class="dg_modal__close-button">&times;</button>
        <h2 id="my-accessible-dialog_label">
            Dialog Title
        </h2>
        <p>This is content that lives inside of a dialog box. It's fully accessible which makes our users happy. And because it's inside of a dialog that pops up, it makes our designers and UX people happy as well.</p>
</div>
```

## Triggering the Modal

A button is used in order to trigger the modal, this can be included anywhere in your app or website. The `id` of the modal dialog must match the `data-target` attribute on the button that will trigger the modal. The button will also need a class of `dg_modal__open-button` in order to open the modal.

```html
<button type="button" class="dg_modal__open-button" data-target="my-accessible-dialog">
    Open Modal
</button>
```
