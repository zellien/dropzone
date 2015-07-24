(function ($) {
    $.fn.dropzone = function (params) {

        var options = $.extend({
            nameClass    : "upload-filename",
            progressClass: "upload-progress-bar",
            previewClass : "upload-preview",
            lineClass    : "upload-progress-line",
            statusClass  : "upload-status",
            radioClass   : "upload-radio",
            removeClass  : "upload-remove",
            tableClass   : "upload-table",
            dropzoneClass: "upload-drop-zone",

            dropzoneText  : "Drag and drop photo or click for select",
            errorText     : "Error",
            processText   : "Loading",
            successText   : "Success",
            uploadCallback: "",
            removeCallback: function (value) {
                console.log('Remove callback. Value: ' + JSON.stringify(value))
            },
            removeText    : "Remove",
            radioText     : "Set as default photo",
            radioCallback : function (value) {
                console.log('Radio callback. Value: ' + JSON.stringify(value))
            },
            uploadUrl     : "/photo/upload",
            thumbWidth    : 90,
            thumbHeight   : 64,
            fileSize      : 10000000,
            fileTypes     : ["image/jpeg", "image/png", "image/gif"]
        }, params);

        var $element = $(this);

        var $dropzone = $(document.createElement("div"));
        $dropzone.addClass(options.dropzoneClass);
        $dropzone.text(options.dropzoneText);
        $dropzone.insertBefore($element);

        var createPreview = function (file) {
            var $preview   = $(document.createElement("img"));
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.addEventListener("loadend", function () {
                var image = new Image();
                image.src = fileReader.result;
                image.addEventListener("load", function () {
                    var imageWidth  = parseInt(options.thumbWidth);
                    var imageHeight = parseInt(options.thumbHeight);
                    var offsetX     = 0;
                    var offsetY     = 0;
                    if (this.width > this.height) {
                        imageWidth  = Math.round(options.thumbWidth * this.width / this.height);
                        imageHeight = options.thumbHeight;
                        offsetX     = -Math.round((imageWidth - options.thumbHeight) / 2);
                    } else {
                        imageWidth  = options.thumbWidth;
                        imageHeight = Math.round(options.thumbHeight * this.height / this.width);
                        offsetY     = -Math.round((imageHeight - options.thumbWidth) / 2);
                    }
                    var canvas    = document.createElement("canvas");
                    canvas.width  = parseInt(options.thumbWidth);
                    canvas.height = parseInt(options.thumbHeight);
                    var context   = canvas.getContext("2d");
                    context.drawImage(this, offsetX, offsetY, imageWidth, imageHeight);
                    $preview.attr("src", canvas.toDataURL("image/jpeg", 1));
                });
            });
            return $preview;
        };

        var uploadFiles = function (files) {
            $.each(files, function () {
                if (undefined !== this && this.size <= options.fileSize && 0 <= options.fileTypes.indexOf(this.type)) {
                    var $table        = $(document.createElement("table"));
                    $table.addClass(options.tableClass);
                    var $topRow       = $(document.createElement("tr")).appendTo($table);
                    var $middleRow    = $(document.createElement("tr")).appendTo($table);
                    var $bottomRow    = $(document.createElement("tr")).appendTo($table);
                    var $nameCell     = $(document.createElement("td")).appendTo($topRow);
                    var $statusCell   = $(document.createElement("td")).appendTo($topRow);
                    var $previewCell  = $(document.createElement("td")).appendTo($topRow);
                    var $progressCell = $(document.createElement("td")).appendTo($middleRow);
                    var $radioCell    = $(document.createElement("td")).appendTo($bottomRow);
                    var $removeCell   = $(document.createElement("td")).appendTo($bottomRow);
                    var $progressBar  = $(document.createElement("div")).appendTo($progressCell);
                    var $progressVal  = $(document.createElement("div")).appendTo($progressBar);
                    var $radioLabel   = $(document.createElement("label")).appendTo($radioCell).text(options.radioText);
                    var $radioButton  = $(document.createElement("input")).prependTo($radioLabel);
                    var $removeButton = $(document.createElement("span")).appendTo($removeCell);

                    $nameCell.addClass(options.nameClass);
                    $statusCell.addClass(options.statusClass);
                    $previewCell.addClass(options.previewClass);
                    $radioCell.addClass(options.radioClass);
                    $removeCell.addClass(options.removeClass);

                    $previewCell.css("width", options.thumbWidth);
                    $previewCell.css("height", options.thumbHeight);
                    $previewCell.attr("rowSpan", 3);

                    $progressCell.attr("colSpan", 2);
                    $progressBar.addClass(options.progressClass);
                    $progressVal.addClass(options.lineClass);

                    $radioButton.attr("type", "radio");
                    $radioButton.attr("name", "upload-radio");

                    $removeButton.text(options.removeText);
                    $nameCell.text(this.name);
                    $table.insertAfter($element);

                    var $preview = createPreview(this);
                    $preview.appendTo($previewCell);

                    var formData = new FormData();
                    formData.append("image", this);
                    $.ajax({
                        data       : formData,
                        contentType: false,
                        method     : "POST",
                        processData: false,
                        url        : options.uploadUrl,
                        beforeSend : function () {
                            $statusCell.attr("class", options.statusClass + " process");
                            $statusCell.text(options.processText);
                        },
                        complete   : function () {
                            $removeButton.on({
                                click: function () {
                                    $table.fadeOut(250, function () {
                                        $(this).remove();
                                    });
                                }
                            });
                        },
                        success    : function (data) {
                            switch (data.status) {
                                case "success":
                                    $statusCell.attr("class", options.statusClass + " success");
                                    $statusCell.text(options.successText);
                                    break;
                                default:
                                    $statusCell.attr("class", options.statusClass + " error");
                                    $statusCell.text(options.errorText);
                                    $progressVal.addClass("error");
                            }
                            if ($.isFunction(options.removeCallback)) {
                                $removeButton.on({
                                    click: function () {
                                        options.removeCallback(data.result);
                                    }
                                });
                            }
                            if ($.isFunction(options.radioCallback)) {
                                $radioButton.removeAttr("disabled");
                                $radioButton.on("click", function () {
                                    if ($radioButton.is(":checked")) {
                                        options.radioCallback(data);
                                    }
                                });

                            }
                            if ($.isFunction(options.uploadCallback)) {
                                options.uploadCallback(data);
                            }
                        },
                        error      : function () {
                            $statusCell.attr("class", "error");
                            $statusCell.text(options.errorText);
                        },
                        xhr        : function () {
                            var xhr = $.ajaxSettings.xhr();
                            xhr.upload.addEventListener("progress", function (event) {
                                if (event.lengthComputable) {
                                    var percent = Math.ceil(event.loaded / event.total * 100);
                                    $progressVal.css("width", percent + "%");
                                    $statusCell.text(percent + "%");
                                }
                            }, false);
                            return xhr;
                        }
                    });
                }
            });
        };

        $(document).on({
            dragover : function (event) {
                event.preventDefault();
                return false;
            },
            dragleave: function (event) {
                event.preventDefault();
                return false;
            },
            drop     : function (event) {
                event.preventDefault();
                return false;
            }
        });

        $dropzone.on({
            dragover : function (event) {
                event.preventDefault();
                event.stopPropagation();
                $(this).addClass("active");
            },
            dragleave: function (event) {
                event.preventDefault();
                event.stopPropagation();
                $(this).removeClass("active");
            },
            drop     : function (event) {
                event.preventDefault();
                event.stopPropagation();
                $(this).removeClass("active");
                uploadFiles(event.originalEvent.dataTransfer.files);
            },
            click    : function (event) {
                event.preventDefault();
                event.stopPropagation();
                var $fileElement = $element;
                if (!$fileElement.is("[type=file]")) {
                    $fileElement = $(document.createElement("input"));
                    $fileElement.attr("type", "file");
                }
                $fileElement.trigger("click");
                $fileElement.on("change", function () {
                    uploadFiles(this.files);
                });
            }
        });

    }
})(jQuery);
