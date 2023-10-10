const BACKEND_API_URL = 'https://api.telegramapps.app';
// const BOT_API_VERSION = '6.9';

if (Telegram.WebApp.ready) {
	Telegram.WebApp.ready();
}

if (Telegram.WebApp.expand) {
	Telegram.WebApp.expand();
}

if (Telegram.WebApp.enableClosingConfirmation) {
	Telegram.WebApp.enableClosingConfirmation();
}

let currentScreen = 'questions'; /* eslint prefer-const: 0 */
let monthValue;
let question2;
let question3;

document.addEventListener('DOMContentLoaded', () => {

	initHtmlElements(
		'#welcome',
		'#quiz-page',
		'#questions-progress',
		'#quiz-month-area',
		'#quiz-list-btn',
		'#favorites-btn',
		'#select-month',
		'#prev-month',
		'#next-month',
		'#second-filter1',
		'#second-filter2',
		'#third-filter1',
		'#third-filter2',
	);

});

document.addEventListener('DOMContentLoaded', () => {

	if (localStorage.runs) localStorage.runs++;
	else localStorage.runs = 1;

	// localStorage.removeItem('welcome');

	if ( ! localStorage.welcome) {
		localStorage.welcome = 1;

		/* Telegram.WebApp.showPopup({
			title: 'TripMe показывает лучший сезон для путешествий!',
			message: 'И делает планирование вашего следующего путешествия намного проще.',
			buttons: [
				{
					type: 'default',
					text: 'Отлично!',
				},
			],
		}); */

		SwalWelcome = Swal.mixin({
			imageUrl: 'graphics/logo.svg',
			customClass: {
				image: 'w-50',
				confirmButton: 'btn btn-success btn-lg',
			},
			showClass: {
				popup: 'animate__animated animate__fadeIn', // animate__zoomIn
			},
			grow: 'fullscreen',
			backdrop: '#fff',
			onOpen: (toast) => {
				toast.querySelector('.swal2-confirm').blur();
			},
		});
		SwalWelcome.fire({
			html: $welcome.innerHTML,
			confirmButtonText: 'Отлично!',
		}).then(() => {
			SwalWelcome.fire({
				html: '<h1>Ответьте на <b>три</b> вопроса и сформируйте свой персональный список мест для путешествия!</h1>',
				confirmButtonText: 'Давайте начнём!',
			}).then(() => {
				initQuiz();
				setTimeout(() => { show($quizPage); }, 1000); // fck ios

				notificationOccurredSuccess();
			});

			notificationOccurredSuccess();
		});

		notificationOccurredWarning();
	}
	else {
		initQuiz();
		show($quizPage);
	}
});
