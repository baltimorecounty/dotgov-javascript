import { GetFirstElementOrDefault } from "../utilities/dom.utilities";

const cssClasses = {
  filterCollapse: "dg_filter-collapse",
  filterCollapseToggleButton: "dg_filter-collapse__toggle-btn",
};

const toggleFilterElms = (filterCollapseElms, shouldShow) => {
  if (filterCollapseElms && filterCollapseElms.length > 0) {
    [...filterCollapseElms].forEach((elm) => {
      const { itemsToShow = "5" } = elm.dataset;

      const childElms = elm.children;
      [...childElms].forEach((childElm, index) => {
        if (index > parseInt(itemsToShow) - 1) {
          childElm.style.display = shouldShow ? "inherit" : "none";
        }
      });
    });
  }
};

const onDocumentReady = () => {
  // Find any filters to collapse
  const filterCollapseElms = document.getElementsByClassName(
    cssClasses.filterCollapse
  );
  toggleFilterElms(filterCollapseElms, false);
};

const handleFilterCollapseToggle = (targetElm) => {
  const shouldShowMore = /.*more.*/i.test(targetElm.textContent);
  targetElm.textContent = `Show ${shouldShowMore ? "Less" : "More"}`;
  const filterCollapseElms = GetFirstElementOrDefault(
    targetElm.parentElement,
    `.${cssClasses.filterCollapse}`
  );

  toggleFilterElms([filterCollapseElms], shouldShowMore);
};

const handleDocumentClick = (onDocumentClick) => {
  const { target } = onDocumentClick;
  const targetClassList = target.classList;
  const isToggleClick = targetClassList.contains(
    cssClasses.filterCollapseToggleButton
  );

  if (isToggleClick) {
    handleFilterCollapseToggle(target);
  } else {
    return;
  }
};

/** Handler when the DOM is fully loaded */
document.addEventListener("DOMContentLoaded", onDocumentReady);
document.addEventListener("click", handleDocumentClick, false);
