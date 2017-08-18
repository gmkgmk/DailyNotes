(function ($) {
	var thumbnailWidth = 110,
		thumbnailHeight = 110,
		DATA_INFO = "UPLOAD_INFO";
	var DEFAULT_CONFIG = {
		name: 'picUrls',
		delName: 'deleteFileIDs',
		count: 1,
		acceptType: 'IMG',
		call: null,
		serverSave: true,
		ali: false
	};
	var ACCEPT_TYPES = {
		IMG: {
			title: 'Images',
			extensions: 'jpg,jpeg,png,bmp',
			mimeTypes: '.jpg,.jpeg,.png,.bmp',
			parseImg: function (filePath) {
				if (filePath.startsWith("data:image/") || filePath.startsWith("http")) {
					return {
						src: filePath,
						clickSrc: filePath
					};
				} else {
					var src = clickSrc = getImageDomain() + filePath;
					return {
						src: src,
						clickSrc: clickSrc
					};
				}
			}
		}
	}

	function showInfo(src) {
		window.open(src);
	}

	function putImg($queueList, itemAttrs) {
		var upAttr = $queueList.data(DATA_INFO).upAttr;
		var node = $queueList.data(DATA_INFO).node;
		if (!itemAttrs.id) itemAttrs.id = WebUploader.guid();
		upAttr.itemAttr[itemAttrs.id] = itemAttrs.val
		var $li = $('<li class="state-info">' +
				'<p class="title">' + (itemAttrs.fileName || "") + '</p>' +
				'<p class="imgWrap"></p>' +
				'<div class="file-panel" style="height: 0px;"><span class="cancel">删除</span></div>' +
				'<span class="info"></span>' +
				'</li>').insertBefore(node.filePicker),
			$btns = $li.find('.file-panel'),
			path = ACCEPT_TYPES[upAttr.acceptType].parseImg(itemAttrs.val),
			$wrap = $li.find('p.imgWrap').append(path.src == null ? "不能预览" : ('<img onerror="this.src=\''  + '/img/no_preview.jpg\'"  src="' + path.src + '"/>'));
		$li.on('mouseenter', function () {
			$btns.stop().animate({
				height: 30
			});
		});
		$li.on('mouseleave', function () {
			$btns.stop().animate({
				height: 0
			});
		});
		if (path.clickSrc != null) {
			$wrap.click(function () {
				showInfo(path.clickSrc);
			});
		}
		$btns.find(".cancel").click(function () {
			if (upAttr.serverSave) {
				$('<input type="hidden" name="' + upAttr.delName + '" value="' + itemAttrs.id + '" />').prependTo($queueList);
				delete upAttr.itemAttr[itemAttrs.id];
			} else {
				node.tagInput.val("");
				upAttr.itemAttr = {};
			}
			$li.remove();
			upAttr.currCount--;
			changeStates($queueList);
		});
		upAttr.currCount++;
	}

	function changeStates($queueList) {
		var upAttr = $queueList.data(DATA_INFO).upAttr;
		var node = $queueList.data(DATA_INFO).node;
		var $filePicker = node.filePicker;
		var $count = node.count;
		if (upAttr.currCount >= upAttr.count) {
			$filePicker.removeClass("webuploader-container").addClass("webuploader-element-invisible");
		} else {
			$filePicker.removeClass("webuploader-element-invisible").addClass("webuploader-container");
		}
		$count.html(upAttr.currCount);
	}

	$.fn.webuploader = function (method, params) {
		var that = this;
		switch (method) {
			case "getValues":
				return (function () {
					return $.map(that.data(DATA_INFO).upAttr.itemAttr, function (value, id) {
						return {
							id: id,
							value: value
						};
					});
				})();
			case "setValue":
				return (function () {
					var upAttr = that.data(DATA_INFO).upAttr;
					if (upAttr.currCount >= upAttr.count) {
						return;
					}
					putImg(that, params)
				})();
		}
	}

	$.loadWebuploaders = function () {
		var webuploaders = $('div[webuploader]');
		if (!webuploaders[0]) return;
		webuploaders.each(function (i) {
			var upAttr = this.attributes["webuploader"];
			if (upAttr == null) {
				return true;
			}
			upAttr = eval('({' + upAttr.nodeValue + '})');
			upAttr = $.extend({}, DEFAULT_CONFIG, upAttr);
			if (!upAttr.serverSave) {
				upAttr.count = 1;
			}
			upAttr.currCount = 0;
			upAttr.itemAttr = {};

			var uniqueID = WebUploader.guid();
			var spans = $(this).find('span');
			if (!upAttr.id) upAttr.id = WebUploader.guid();
			var $queueList = $('<div class="uploader" id=' + upAttr.id + ' ><div class="queueList" id=' + uniqueID + '><ul class="filelist"><li class="filePicker webuploader-element-invisible" id="filePicker' + uniqueID + '"><img height="90px" src="' + '/js/plugins/webuploader/img/add.png" /><span style="color:#1AB394;right:5px;bottom:5px;position: absolute;"><span class="count">0</span>/' + upAttr.count + '张</span></li></ul></div></div>');
			var $filePicker = $queueList.replaceAll($(this)).find('.filePicker');
			var $count = null;
			var tagInput = null;
			if (!upAttr.serverSave && spans.length > 1) return;
			if (!upAttr.serverSave) {
				tagInput = $('<input type="hidden" name="' + upAttr.name + '" value="" />').prependTo($queueList);
			}
			if (upAttr.call) {
				upAttr.call = $.proxy(upAttr.call, $queueList[0], $queueList.attr("id"));
			}
			var DATAS = {
				upAttr: upAttr,
				node: {
					tagInput: tagInput,
					filePicker: $filePicker
				}
			};
			$queueList.data(DATA_INFO, DATAS);
			spans.each(function () {
				var itemAttrs = this.attributes["info"];
				itemAttrs = eval('({' + itemAttrs.nodeValue + '})');
				if (!itemAttrs.val) return true;
				if (!upAttr.serverSave) {
					tagInput.val(itemAttrs.val);
				}
				putImg($queueList, itemAttrs);
			});
			//-----------------------------------------------------------------------------
			var uploader = WebUploader.create({
				dnd: '#' + uniqueID,
				fileVal: "uploadFile",
				formData: {
					"serverSave": upAttr.serverSave,
					"uploadAli": upAttr.ali
				},
				accept: ACCEPT_TYPES[upAttr.acceptType],
				threads: 1,
				prepareNextFile: true,
				disableGlobalDnd: true,
				swf: '/js/plugins/webuploader/Uploader.swf',
				server: '/common/uploadImage.action',
				fileSingleSizeLimit: 10 * 1024 * 1024,
				compress: {
					quality: 80,
					crop: false,
					preserveHeaders: false,
					noCompressIfLarger: false,
					compressSize: (1024 * 1024 / 0.7)
				}
			});
			setTimeout(function () {
				uploader.addButton({
					id: $filePicker
				});
				DATAS.node.count = $filePicker.find('.count');
				changeStates($queueList);
			}, 100);
			uploader.onFileQueued = function (file) {
				if (file.getStatus() === 'invalid' || (upAttr.currCount >= upAttr.count)) {
					uploader.removeFile(file, true);
					return false;
				}
				upAttr.currCount++;
				changeStates($queueList);
				var $li = $('<li id="' + file.id + '">' +
						'<p class="title">' + file.name + '</p>' +
						'<p class="imgWrap">预览中</p>' +
						'<p class="progress"><span></span></p>' +
						'</li>').insertBefore($filePicker),
					$btns = $('<div class="file-panel"><span class="cancel">删除</span></div>').appendTo($li),
					$prgress = $li.find('p.progress span'),
					$wrap = $li.find('p.imgWrap'),
					$info = $('<p class="error"></p>'),
					showError = function (code) {
						switch (code) {
							case 'exceed_size':
								text = '文件大小超出';
								break;
							case 'interrupt':
								text = '上传暂停';
								break;
							default:
								text = '上传失败';
								break;
						}
						$info.text(text).appendTo($li);
					};
				$li.on('mouseenter', function () {
					$btns.stop().animate({
						height: 30
					});
				});
				$li.on('mouseleave', function () {
					$btns.stop().animate({
						height: 0
					});
				});

				uploader.makeThumb(file, function (error, src) {
					if (error) {
						$wrap.text('不能预览');
						return;
					}
					var img = $('<img src="' + src + '" />');
					$wrap.empty().append(img);
				}, thumbnailWidth, thumbnailHeight);

				file.on('statuschange', function (cur, prev) {
					if (prev === 'progress') {
						$prgress.hide().width(0);
					}
					// 成功
					if (cur === 'error' || cur === 'invalid') {
						showError(file.statusText);
					} else if (cur === 'interrupt') {
						showError('interrupt');
					} else if (cur === 'progress') {
						$info.remove();
						$prgress.css('display', 'block');
					} else if (cur === 'complete') {
						$li.append('<span class="success"></span>');
					}
					$li.removeClass('state-' + prev).addClass('state-' + cur);
				});
				$btns.find(".cancel").click(function () {
					if (!upAttr.serverSave) {
						tagInput.val("");
					} else {
						var input = $li.find("input[name='" + upAttr.name + "']");
						if (input[0]) {
							$.post( '/common/delFile.action', {
								fileID: input.val()
							});
						}
					}
					uploader.removeFile(file, true);
					upAttr.currCount--;
					changeStates($queueList);
				});
				uploader.upload(file);
			}
			uploader.onFileDequeued = function (file) {
				$('#' + file.id).off().find('.file-panel').off().end().remove();
			};
			uploader.onUploadProgress = function (file, percentage) {
				$('#' + file.id).find('.progress span').css('width', percentage * 100 + '%');
			};
			uploader.onUploadSuccess = function (file, percentage) {
				var $li = $('#' + file.id);
				if (percentage.flag) {
					$li.find('p.imgWrap').click(function () {
						showInfo(getImageDomain() + percentage.url);
					});
					if (!percentage.fileID) {
						percentage.fileID = WebUploader.guid();
					}
					if (upAttr.serverSave) {
						$li.append('<input type="hidden" name="' + upAttr.name + '" value="' + percentage.fileID + '"/>');
						upAttr.itemAttr[percentage.fileID] = percentage.url
					} else {
						tagInput.val(percentage.url);
						upAttr.itemAttr[percentage.fileID] = percentage.url
					}
					if (upAttr.call) {
						upAttr.call({
							id: percentage.fileID,
							value: percentage.url
						});
					}
				} else {
					$li.removeClass('state-complete').addClass('state-error');
					$li.append('<p class="error">' + percentage.msg + '</p>');
					$li.find(".success").remove();
					if (!upAttr.serverSave) {
						tagInput.val("");
					}
				}
			};
			uploader.onError = function (code) {
				switch (code) {
					case 'Q_EXCEED_NUM_LIMIT':
						layer.msg('选择文件过多', {
							icon: 2
						});
						break;
					case 'Q_EXCEED_SIZE_LIMIT':
						layer.msg('文件过大小', {
							icon: 2
						});
						break;
					case 'Q_TYPE_DENIED':
						layer.msg('文件类型不正确', {
							icon: 2
						});
						break;
					case 'F_EXCEED_SIZE':
						layer.msg('文件过大小', {
							icon: 2
						});
						break;
					case 'F_DUPLICATE':
						layer.msg('重复选择', {
							icon: 2
						});
						break;
					default:
						layer.msg('错误:' + code, {
							icon: 2
						});
						break;
				}
			};

		});
	}



})(jQuery);