//COLOR PICKER


$(document).ready(function() {
    $('#colorPickerForm').bootstrapValidator({
        fields: {
            color: {
                validators: {
                    hexColor: {
                        message: 'The color code is not valid'
                    }
                }
            }
        }
    });

    $('#colorPicker')
        .colorpicker()
        .on('showPicker changeColor', function(e) {
            // Revalidate the color when user choose a color from the color picker
            $('#colorPickerForm').bootstrapValidator('revalidateField', 'color');
        });
});

//END COLOR PICKER

//VALIDATOR

$(document).ready(function() {
    $('#colorForm').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            color: {
                validators: {
                    hexColor: {
                        message: 'The color code is not valid'
                    }
                }
            }
        }
    });
});

//VALIDATOR