Swal = Swal.mixin({
	buttonsStyling: false,
	confirmButtonText: 'Да',
	cancelButtonText: 'Нет',
});

const getInitData = () => {
	return window.location.hash;
	// TODO
	/* if (Telegram.WebApp.initData) {
		return Telegram.WebApp.initData;
	}
	else {
		return window.location.hash;
	} */
};

const hapticFeedback = (field, type = null) => {
	if (Telegram.WebApp.HapticFeedback && Telegram.WebApp.HapticFeedback[field]) {
		Telegram.WebApp.HapticFeedback[field](type);
	}
};

const notificationOccurredWarning = () => hapticFeedback('notificationOccurred', 'warning');

const notificationOccurredSuccess = () => hapticFeedback('notificationOccurred', 'success');

const impactOccurredHeavy = () => hapticFeedback('impactOccurred', 'heavy');

const showAlert = (message, callback = null) => {
	if (Telegram.WebApp.showAlert) {
		Telegram.WebApp.showAlert(message, callback);
	}
	else {
		Swal.fire({
			html: message,
			confirmButtonText: 'OK!',
			icon: 'warning',
			customClass: {
				confirmButton: 'btn btn-success btn-lg',
			},
			didOpen: (toast) => {
				toast.querySelector('.swal2-confirm').blur();
			},
		}).then(() => {
			callback();
		});
	}
};

const showConfirm = (message, callback) => {
	if (Telegram.WebApp.showConfirm) {
		Telegram.WebApp.showConfirm(message, callback);
	}
	else {
		Swal.fire({
			html: message,
			icon: 'question',
			showCancelButton: true,
			customClass: {
				actions: 'btn-group',
				confirmButton: 'btn btn-success btn-lg',
				cancelButton: 'btn btn-outline-danger btn-lg',
			},
			showCloseButton: true,
			showLoaderOnConfirm: true,
			didOpen: (toast) => {
				toast.querySelector('.swal2-confirm').blur();
				toast.querySelector('.swal2-close').blur();
			},
		}).then((result) => {
			callback(result.value);
		});
	}
};

/* if (Telegram.WebApp.switchInlineQuery) {
	Telegram.WebApp.switchInlineQuery('place=42');
} */

const camelCase = (str) => {
	str = str.replace(/[=\[\]"]/g, ' ').replace(/  +/g, ' ').replace(/[#\.]/g, '');
	str = str.replace(/-([a-z])/g, (_m, l) => {
		return l.toUpperCase();
	});
	return str.replace(/ ([a-z])/g, (_m, l) => {
		return l.toUpperCase();
	});
};

const initHtmlElements = (...agrs) => {
	/* document.addEventListener('DOMContentLoaded', () => {
	}); */
	agrs.forEach(($htmlElement) => {
		const nameConst = camelCase($htmlElement);
		window[`$${nameConst}`] = document.querySelector($htmlElement);
	});
};

const hide = (...agrs) => {
	agrs.forEach((el) => {
		el.classList.add('d-none');
	});
};

const show = (...agrs) => {
	agrs.forEach((el) => {
		el.classList.remove('d-none');
	});
};

const $loader = document.getElementById('loader');
const loadingShow = () => {
	$loader.style.display = 'block';
};
const loadingHide = () => {
	$loader.style.display = 'none';
};

const fetchQuery = (url, callback, fetchParams = null) => {
	if (fetchParams) {
		fetchParams = `?${new URLSearchParams(fetchParams)}`;
		console.debug(fetchParams, fetchParams);
	};

	fetch(url + fetchParams)
			.then((response) => { return response.json(); })
			.then((responseJson) => {
				// console.debug('fetchQuery:', responseJson);
				if ( ! responseJson.error && ! responseJson.error_code) callback(responseJson);
				else {
					showAlert(`Error in response HTTP query: ${responseJson.error ? responseJson.error : responseJson.message}`);
				}
			})
			.catch((error) => {
				showAlert(`Error on HTTP query: ${error.toString()}`);
			});
};

const httpQuery = (method, callback, data = {}) => {
	loadingShow();

	const loadingHideTimerId = setTimeout(() => {
		loadingHide();
	}, 5000);

	const url = `${BACKEND_API_URL}/${method}`;

	fetchQuery(url, (responseJson) => {
		loadingHide();
		clearTimeout(loadingHideTimerId);
		// console.debug('httpQuery:', responseJson);
		callback(responseJson);
	}, data);
};

const trigger = (element, event) => {
	const evt = document.createEvent('HTMLEvents');
	evt.initEvent(event, true, true);
	return ! element.dispatchEvent(evt);
};

const thanksMessage = () => {
	Swal.fire({
		title: 'Спасибо!',
		icon: 'success',
		showCloseButton: true,
		toast: true,
		showConfirmButton: false,
		timer: 4000,
		timerProgressBar: true,
	});
};
