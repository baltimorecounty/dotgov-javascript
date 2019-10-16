Html Snippet: Markup for Dialog Box

```html
<div class="dg_modal dialog" id="my-accessible-dialog">

  <!--
    Overlay related notes:
    - Class should be `dg_modal`
    - It has to have the `tabindex="-1"` attribute.
    - It doesn’t have to have the `data-a11y-dialog-hide` attribute, however this is recommended. It hides the dialog when clicking outside of it.
  -->
  <div class="dialog-overlay" tabindex="-1" data-a11y-dialog-hide></div>

  <!--
    Dialog window content related notes:
    - It is the actual visual dialog element.
    - It may have the `alertdialog` role to make it behave like a “modal”. See the “Usage as a modal” section of the docs.
    - It doesn’t have to be a `<dialog>` element, it can be a `<div>` element with the `dialog` or `alertdialog` role (e.g. `<div role="dialog">`).
    - It doesn’t have to have the `aria-labelledby` attribute however this is recommended. It should match the `id` of the dialog title.
  -->
  <dialog class="dialog-content" aria-labelledby="dialog-title">
    <!--
      Closing button related notes:
      - It does have to have the `type="button"` attribute.
      - It does have to have the `data-a11y-dialog-hide` attribute.
      - It does have to have an aria-label attribute if you use an icon as content.
    -->
    <button type="button" class="dialog-close" data-a11y-dialog-hide aria-label="Close this dialog window">
      &times;
    </button>

    <!--
      Dialog title related notes:
      - It should have a different content than `Dialog Title`.
      - It can have a different id than `dialog-title`.
    -->
    <h1 id="dialog-title">Dialog Title</h1>

    <p>This is content that lives inside of a dialog box. It's fully accessible which makes our users happy. And because it's inside of a dialog that pops up, it makes our designers and UX people happy as well.</p>

    <p>The focus is already on the close button. This way users do not need to tab again after reading the content in this box. Pushing ESC will also close this dialog.</p>
  </dialog>
  </section>
</div>

```

How to associate button to Dialog Box

```html
<button type="button" data-a11y-dialog-show="my-accessible-dialog">
  <!--
    `data-a11y-dialog-show="my-accessible-dialog"` attribute should match with the `Id` of a dialog box. 
  -->
  Open Modal
</button>
```
