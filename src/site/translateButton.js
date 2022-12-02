var keys = {
    ESC: 27,
    TAB: 9,
    RETURN: 13,
    SPACE: 32,
    UP: 38,
    DOWN: 40
};

var toggleButton = $('.dropdown-toggle');
var dropdownMenu = $('.language-dropdown-menu');
var dropdownMenuDesktop = dropdownMenu.not('.language-dropdown--mobile .language-dropdown-menu');
var dropdownMenuMobile = $('.language-dropdown--mobile');
var dropdownWrapper = $('.language-dropdown');

$(function() {

    $(toggleButton).on('click', function(event) {
        $(dropdownMenu).slideToggle(function() {
            if ($(dropdownMenu).is(':visible')) {
                $(toggleButton).attr('aria-expanded','true');
                $(dropdownMenu).focus().attr('tabindex', '-1').on('keydown', function(event){ //force focus
                    handleFocusTrap(event);
                });
            } else {
                $(toggleButton).attr('aria-expanded', 'false');
            }
        });
    });

    // Close dropdown when clicking off without selecting item, as opposed to hitting ESC or toggling button off
    $(document).on('click', function(event) {
        if ($(dropdownMenu).is(':visible')) { // If the dropdown is open...
            if (!dropdownWrapper.is(event.target) // ... and if the target of the click isn't the container...
            && dropdownWrapper.has(event.target).length === 0) // ... or a descendant of the container.
                {
                    $(dropdownMenu).slideUp();
                    $(toggleButton).attr('aria-expanded','false');
                }
        }
    });

    $(dropdownMenu).on('keydown', function(event) {
        doKeypress(keys, event);
    });

    $(dropdownMenu).on('click', 'a', function(event) {
        selectOption($(this));
    });

    // if menu is open and screen is resized, keep menu open with new markup
    $(window).on('resize', function() {
        if ($(dropdownMenu).is(':visible')) {
            $(toggleButton).attr('aria-expanded','true');
            $(dropdownMenu).focus();
        } else {
            $(toggleButton).attr('aria-expanded', 'false');
        }
    })

}); //end ready function

//22750-translate-tabbing
function handleFocusTrap(event) {
    //check if event is a tab - if not a tab, return.
    if (event.key.toLowerCase() !== 'tab') {
        return;
    }

    var tabbable;

    //Split into 2 possible variables to account for different markup for mobile and desktop
    //grab all href content that does not have a tabindex of -1 and add into content we can tab through
    if (window.matchMedia("(max-width: 768px)").matches) {
        // if screen size is lower than tablet size, grab tabbable items from mobile menu.
        tabbable = $().add(dropdownMenuMobile.find('[href]')).add(dropdownMenuMobile.find('[tabindex]:not([tabindex="-1"])'));
    } else {
        // if screen size is higher than tablet size, grab tabbable items from desktop menu.
        tabbable = $().add(dropdownMenuDesktop.find('[href]')).add(dropdownMenuDesktop.find('[tabindex]:not([tabindex="-1"])'));
    }

    // listen store target event is performed on.
    var target = $(event.target);

    // if event contains the shift key, check if we're at the first item in the tabbable list so we can loop back to the last item in the list.
    if (event.shiftKey) {
        if (target.is(dropdownMenuDesktop) || target.is(tabbable.first())) {
            event.preventDefault();
            tabbable.last().focus();
        }
    } else {
        // if NOT holding down the shift button, check to see if we are currently on the last tabbable item, and go to the first tabbable item in the list.
        if (target.is(tabbable.last())) {
            event.preventDefault();
            tabbable.first().focus();
        }
    }
}

// Allow keyboard navigation for accessibility
function doKeypress(keys, event) {

    switch (event.which) {

        case keys.ESC:
            $(dropdownMenu).slideUp();
            $(toggleButton).trigger('focus');
            $(toggleButton).attr('aria-expanded','false');
            break;

        case keys.UP:
            event.preventDefault();
            event.stopPropagation();
            return moveUp(highlighted);

        case keys.DOWN:
            highlighted = $(':focus');
            event.preventDefault();
            event.stopPropagation();
            return moveDown(highlighted);


        case keys.RETURN:
            highlighted = $(':focus');
            if (highlighted) {
                if (highlighted.attr('id') === 'language-dropdown-menu' || highlighted === $(toggleButton)) {
                    return false;
                }
                break;
            }

        case keys.SPACE:
            highlighted = $('.highlight');
            if (highlighted) {
                if (highlighted.attr('id') === 'language-dropdown-menu') {
                    return false;
                } else {
                    event.preventDefault();
                    event.stopPropagation();
                    return selectOption(highlighted);
                }
                break;
            }

        default:
            return;
    }
} //doKeypress function

function selectOption(highlighted) {
    if (highlighted) {
        highlighted.attr('aria-selected', true);
        $(toggleButton).html(highlighted.text());
        $(toggleButton).attr('aria-expanded','false');
        $(dropdownMenu).slideUp();
        $('*').removeClass('highlight');
    } else {
        return;
    }
} //selectOption Function

function moveDown(highligted) {
    highligted = $(':focus');

    if (highligted.attr('id') === 'language-dropdown-menu') {
        highligted.removeClass('highlight');
        highligted.children().first('li').children('a').addClass('highlight').focus();
    } else {
        highligted.removeClass('highlight').parent().next('li').children('a').addClass('highlight').focus();
    }
} //moveDown function


function moveUp(highligted) {
    highligted = $(':focus');

    if(highligted.attr('id') === 'language-dropdown-menu') {
        highligted.removeClass('highlight');
    } else {
        highligted.removeClass('highlight').parent().prev('li').children('a').addClass('highlight').focus();
    }
} //moveUp function