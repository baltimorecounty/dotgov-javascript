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
var dropdownWrapper = $('.language-dropdown')

$(function() {

    $(toggleButton).on('click', function(event) {
        $(dropdownMenu).slideToggle(function() {
            if ($(dropdownMenu).is(':visible')) {
                $(toggleButton).attr('aria-expanded','true');
                $(dropdownMenu).focus();
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

// Allow keyboard navigation for accessibility
function doKeypress(keys, event) {
    current = $(':focus');
    current.addClass('highlight');

    switch (event.which) {
        
        case keys.ESC:
            $(dropdownMenu).slideUp();
            $(toggleButton).trigger('focus');
            $(toggleButton).attr('aria-expanded','false');
            break;

        case keys.TAB:
            if (current.hasClass('last')) {
                if (event.shiftKey) {
                    current.removeClass('highlight').prev('a').addClass('highlight').focus();
                } else {
                    $(toggleButton).attr('aria-expanded','false');
                    $(dropdownMenu).slideUp();
                    $('*').removeClass('highlight');
                }
            }

            if (event.shiftKey) {
                current.removeClass('highlight').prev('a').addClass('highlight').focus();
            } else {
                current.removeClass('highlight').next('a').addClass('highlight').focus();
            }

            break;
        
        case keys.UP:
            event.preventDefault();
            event.stopPropagation();
            return moveUp(highligted);

        case keys.DOWN:
            highligted = $(':focus');
            event.preventDefault();
            event.stopPropagation();
            return moveDown(highligted);

        
        case keys.RETURN:
            highligted = $(':focus');
            if (highligted) {
                if (highligted.attr('id') === 'language-dropdown-menu' || highlighted === $(toggleButton)) {
                    return false;
                }
                break;
            }

        case keys.SPACE:
            highligted = $('.highlight');
            if (highligted) {
                if (highligted.attr('id') === 'language-dropdown-menu') {
                    return false;
                } else {					  
                    event.preventDefault();
                    event.stopPropagation();
                    return selectOption(highligted);
                }
                break;
            }
        
        default:
            return;
    }
} //doKeypress function

function selectOption(highligted) {
    if (highligted) {
        highligted.attr('aria-selected', true);
        $(toggleButton).html(highligted.text());
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