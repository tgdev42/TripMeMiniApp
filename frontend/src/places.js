const throttlingTimer = 300; // 2000

let placesLoaded = false;
let isFavorites = false;
let requestTimeoutStarted = false;

document.addEventListener('DOMContentLoaded', () => {

	initHtmlElements(
		'#lightgallery',
		'#place-card-template',
		'#places-count-area',
		'#places-count',
		'#places-cards',
		'#stack-places-cards',
		'#stack-place-card-template',
		'#stack-cards-area',
		'#filter-form',
		'#no-places-results',
		'#no-favorites-results',
		'#filter-form-area',
		'#hide-filter',
		'#show-filter',
	);

	$favoritesBtn.addEventListener('click', () => {
		isFavorites = true;
		currentScreen = 'favorites';
		hide($favoritesBtn, $placesCountArea, $noPlacesResults, $filterForm);
		show($quizListBtn);
		$cardsArea.style.marginTop = '65px';
		$placesCards.innerHTML = '';
		$placesCards.classList.add('favorites');
		const requestTimeout = () => {
			if ( ! placesLoaded) {
				httpQuery('favorites.get', (response) => {
					// console.debug(response);
					if (response.items && response.items.length) {
						hide($noFavoritesResults);
						renderQuizList(response.items);
					}
					else show($noFavoritesResults);

					impactOccurredHeavy();
				}, {
					initData: getInitData(),
				});
				placesLoaded = true;
				setTimeout(() => { placesLoaded = false; }, throttlingTimer);
			}
			else if ( ! requestTimeoutStarted) {
				requestTimeoutStarted = true;
				setTimeout(() => {
					requestTimeoutStarted = false;
					requestTimeout();
				}, throttlingTimer);
			}
		};
		requestTimeout();

		notificationOccurredSuccess();
	});

	$quizListBtn.addEventListener('click', () => {
		currentScreen = 'main';
		hide($quizListBtn, $noFavoritesResults);
		show($favoritesBtn, $filterForm);
		$cardsArea.style.marginTop = null;
		getPlaces();

		notificationOccurredSuccess();
	});

	document.querySelector('#quiz-restart').addEventListener('click', () => {
		showConfirm('Вы уверены, что хотите начать сначала?', (result) => {
			if (result) {
				currentScreen = 'questions';
				monthValue = null;
				// $question2.classList.remove('animate__fadeOut');
				// $question31.classList.remove('animate__fadeOut');
				// $question32.classList.remove('animate__fadeOut');
				hide($resultScreen, $placesCountArea, $noPlacesResults, $noFavoritesResults, $cardsArea, $question31First, $question31Second, $question31Third, $question32First, $question32Second, $question32Third, $question2, $question31, $question32, $quizListBtn); // $stackCardsArea
				show($question1First, $question1Second, $question1Third, $quizMonthArea, $favoritesBtn, $filterForm);
				setTimeout(() => { show($quizPage); }, 1000); // fck ios
				isFavorites = false;
				$placesCards.classList.remove('favorites');
				$cardsArea.style.marginTop = null;
				initQuiz();
				window.scrollTo({ top: 0, behavior: 'smooth' });

				notificationOccurredSuccess();
			}
		});

		notificationOccurredWarning();
	});

	// TODO: find another fix for card width
	/* start fix card width */
	const setCardsWidth = () => {
		setTimeout(() => {
			const screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
			if (screenWidth > 0) {
				const styleSheet = document.createElement('style');
				styleSheet.type = 'text/css';
				styleSheet.innerText = `#cards-area .card img { width: ${screenWidth}px !important; }`;
				document.head.appendChild(styleSheet);
			}
			else setCardsWidth();
		}, 100);
	};
	setCardsWidth();
	/* end fix card width */

	/* start only web, not from telegram */
	const screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
	if (screenHeight > 1000) {
		$lightgallery.addEventListener('onSlideClick', () => {
			window.lgData[$lightgallery.getAttribute('lg-uid')].goToNextSlide();
		});
	}
	/* end only web, not from telegram */
	$lightgallery.addEventListener('onBeforeOpen', () => {
		document.querySelector('html').style.overflowY = 'hidden';
	});
	$lightgallery.addEventListener('onCloseAfter', () => {
		window.lgData[$lightgallery.getAttribute('lg-uid')].destroy(true);
		lightgalleryOptions.dynamicEl = [];
		document.querySelector('html').style.overflowY = null;
	});

	$selectMonth.addEventListener('change', () => {
		if ($selectMonth.selectedIndex > 0) $prevMonth.removeAttribute('disabled');
		else $prevMonth.setAttribute('disabled', '');
		if ($selectMonth.selectedIndex < 11) $nextMonth.removeAttribute('disabled');
		else $nextMonth.setAttribute('disabled', '');
		if ( ! placesLoaded) {
			if (monthValue !== $selectMonth.value) {
				monthValue = $selectMonth.value;
				getPlaces();
			}
			placesLoaded = true;
			setTimeout(() => { placesLoaded = false; }, throttlingTimer);
		}
		else if ( ! requestTimeoutStarted) {
			requestTimeoutStarted = true;
			setTimeout(() => {
				requestTimeoutStarted = false;
				trigger($selectMonth, 'change');
			}, throttlingTimer);
		}
	});

	$prevMonth.addEventListener('click', () => {
		if ($selectMonth.selectedIndex > 0) {
			$selectMonth.selectedIndex--;
			trigger($selectMonth, 'change');

			notificationOccurredSuccess();
		}
	});

	$nextMonth.addEventListener('click', () => {
		if ($selectMonth.selectedIndex < 11) {
			$selectMonth.selectedIndex++;
			trigger($selectMonth, 'change');

			notificationOccurredSuccess();
		}
	});

	$secondFilter1.addEventListener('click', () => {
		if ( ! $secondFilter1.classList.contains('active')) {
			$secondFilter2.classList.remove('active');
			$secondFilter1.classList.add('active');
			$thirdFilter1.innerText = 'Горы и водопады';
			$thirdFilter2.innerText = 'Океан и море';
			const requestTimeout = () => {
				if ( ! placesLoaded) {
					if (question2 !== 1) {
						question2 = 1;
						getPlaces();
					}
					placesLoaded = true;
					setTimeout(() => { placesLoaded = false; }, throttlingTimer);
				}
				else if ( ! requestTimeoutStarted) {
					requestTimeoutStarted = true;
					setTimeout(() => {
						requestTimeoutStarted = false;
						requestTimeout();
					}, throttlingTimer);
				}
			};
			requestTimeout();

			notificationOccurredSuccess();
		}
	});
	$secondFilter2.addEventListener('click', () => {
		if ( ! $secondFilter2.classList.contains('active')) {
			$secondFilter1.classList.remove('active');
			$secondFilter2.classList.add('active');
			$thirdFilter1.innerText = 'Старинные';
			$thirdFilter2.innerText = 'Современные';
			const requestTimeout = () => {
				if ( ! placesLoaded) {
					if (question2 !== 2) {
						question2 = 2;
						getPlaces();
					}
					placesLoaded = true;
					setTimeout(() => { placesLoaded = false; }, throttlingTimer);
				}
				else if ( ! requestTimeoutStarted) {
					requestTimeoutStarted = true;
					setTimeout(() => {
						requestTimeoutStarted = false;
						requestTimeout();
					}, throttlingTimer);
				}
			};
			requestTimeout();

			notificationOccurredSuccess();
		}
	});

	$thirdFilter1.addEventListener('click', () => {
		if ( ! $thirdFilter1.classList.contains('active')) {
			$thirdFilter2.classList.remove('active');
			$thirdFilter1.classList.add('active');
			const requestTimeout = () => {
				if ( ! placesLoaded) {
					if (question3 !== 1) {
						question3 = 1;
						getPlaces();
					}
					placesLoaded = true;
					setTimeout(() => { placesLoaded = false; }, throttlingTimer);
				}
				else if ( ! requestTimeoutStarted) {
					requestTimeoutStarted = true;
					setTimeout(() => {
						requestTimeoutStarted = false;
						requestTimeout();
					}, throttlingTimer);
				}
			};
			requestTimeout();

			notificationOccurredSuccess();
		}
	});
	$thirdFilter2.addEventListener('click', () => {
		if ( ! $thirdFilter2.classList.contains('active')) {
			$thirdFilter1.classList.remove('active');
			$thirdFilter2.classList.add('active');
			const requestTimeout = () => {
				if ( ! placesLoaded) {
					if (question3 !== 2) {
						question3 = 2;
						getPlaces();
					}
					placesLoaded = true;
					setTimeout(() => { placesLoaded = false; }, throttlingTimer);
				}
				else if ( ! requestTimeoutStarted) {
					requestTimeoutStarted = true;
					setTimeout(() => {
						requestTimeoutStarted = false;
						requestTimeout();
					}, throttlingTimer);
				}
			};
			requestTimeout();

			notificationOccurredSuccess();
		}
	});

	$showFilter.addEventListener('click', () => {
		$filterFormArea.classList.add('animate__backInDown');
		const handleAnimationEnd = () => {
			$filterFormArea.removeEventListener('animationend', handleAnimationEnd);
			$filterFormArea.classList.remove('animate__backInDown');
		};
		$filterFormArea.addEventListener('animationend', handleAnimationEnd);
		hide($showFilter);
		show($filterFormArea);

		notificationOccurredSuccess();
	});
	$hideFilter.addEventListener('click', () => {
		$filterFormArea.classList.add('animate__backOutUp');
		const handleAnimationEnd = () => {
			$filterFormArea.removeEventListener('animationend', handleAnimationEnd);
			$filterFormArea.classList.remove('animate__backOutUp');
			hide($filterFormArea);
			show($showFilter);
		};
		$filterFormArea.addEventListener('animationend', handleAnimationEnd);

		notificationOccurredSuccess();
	});

	/*
	// TODO
	// const initData = getInitData();
	const urlParams = new URLSearchParams(window.location.search);
	const allowsWriteToPM = urlParams.get('allows_write_to_pm') === 'true' ? true : false;
	if ( ! allowsWriteToPM && ! localStorage.notificationsAsk) {
		const handleScroll = () => {
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
				// console.debug('bottom', currentScreen, allowsWriteToPM);
				if (currentScreen === 'main') {
					window.removeEventListener('scroll', handleScroll);
					Swal.fire({
						html: 'Мы постоянно обновляем приложение и добавляем новые места! Разрешите уведомления, и мы будем вам сообщать об обновлениях и о наших новостях раз в неделю!',
						confirmButtonText: 'Конечно!',
						icon: 'warning',
						customClass: {
							confirmButton: 'btn btn-success btn-lg',
						},
						onOpen: (toast) => {
							toast.querySelector('.swal2-confirm').blur();
						},
					}).then(() => {
						const accessNotifications = () => {
							Telegram.WebApp.requestWriteAccess((result) => {
									if (result) {
										thanksMessage();
										delete localStorage.notificationsAsk;
										// TODO
										httpQuery()
									}
									else {
										Swal.fire({
											title: 'Вы уверены?',
											html: 'Очень жаль... Вы не разрешили уведомления :(',
											icon: 'question',
											showCancelButton: true,
											customClass: {
												actions: 'btn-group',
												confirmButton: 'btn btn-success btn-lg',
												cancelButton: 'btn btn-outline-danger btn-lg',
											},
											showCloseButton: true,
											showLoaderOnConfirm: true,
											confirmButtonText: 'Я передумал, разрешаю!',
											cancelButtonText: 'Да',
											onOpen: (toast) => {
												toast.querySelector('.swal2-confirm').blur();
												toast.querySelector('.swal2-close').blur();
											},
										}).then((result) => {
											if (result.value) accessNotifications();
											else localStorage.notificationsAsk = 0;
										});
									}
							});
						};
						accessNotifications();
					});
				}
			};
		};
		window.addEventListener('scroll', handleScroll);
	}
	*/

});

const lightgalleryOptions = {
	hideBarsDelay: 1000,
	getCaptionFromTitleOrAlt: false,
	preload: 10,
	showAfterLoad: false,
	download: false,
	actualSize: false,
	// autoplay: true,
	pause: 2000,
	dynamic: true,
	dynamicEl: [],
};

const showImages = (images) => {
	for (const image of images) {
		lightgalleryOptions.dynamicEl.push({
			src: image,
		});
	}
	lightGallery($lightgallery, lightgalleryOptions);
};

const renderQuizList = (response) => {
	for (const place of response) {
		const $newPlaceCard = $placeCardTemplate.cloneNode(true);
		$newPlaceCard.removeAttribute('id');
		$newPlaceCard.dataset.id = place.id;
		$newPlaceCard.querySelector('source').srcset = `places/${place.id}/1.webp`;
		$newPlaceCard.querySelector('img').src = `places/${place.id}/1.jpg`;
		$newPlaceCard.querySelector('.country').innerText = place.country;
		$newPlaceCard.querySelector('.place').innerText = place.name;
		$newPlaceCard.querySelector('.description').innerText = place.description;
		$newPlaceCard.querySelector('.season').innerText = place.season_mini_description;
		let classList;
		if (place.season === 1) classList = 'success'; else classList = 'warning';
		$newPlaceCard.querySelector('.season').classList.add(`text-${classList}`);

		const $placeLikeBtn = $newPlaceCard.querySelector('.place-like');
		$placeLikeBtn.addEventListener('click', () => {
			const placeId = $placeLikeBtn.closest('.card').dataset.id;
			const favoriteMonth = $placeLikeBtn.dataset.month;
			if ( ! $placeLikeBtn.classList.contains('liked')) {
				// console.debug('add favorites', placeId);
				$placeLikeBtn.classList.add('animate__heartBeat');
				$placeLikeBtn.classList.add('liked');
				const handleAnimationEnd = () => {
					$placeLikeBtn.removeEventListener('animationend', handleAnimationEnd);
					$placeLikeBtn.classList.remove('animate__heartBeat');
					$placeLikeBtn.classList.remove('text-secondary');
					$placeLikeBtn.classList.add('text-danger');
				};
				$placeLikeBtn.addEventListener('animationend', handleAnimationEnd);
				httpQuery('favorites.set', (response) => {
					// console.debug(response);
				}, {
					initData: getInitData(),
					placeId,
					month: favoriteMonth,
				});
			}
			else {
				// console.debug('remove favorites', placeId);
				$placeLikeBtn.classList.remove('liked');
				$placeLikeBtn.classList.add('animate__flip');
				const handleAnimationEnd = () => {
					$placeLikeBtn.removeEventListener('animationend', handleAnimationEnd);
					$placeLikeBtn.classList.remove('animate__flip');
					$placeLikeBtn.classList.remove('text-danger');
					$placeLikeBtn.classList.add('text-secondary');
				};
				$placeLikeBtn.addEventListener('animationend', handleAnimationEnd);
				httpQuery('favorites.remove', (response) => {
					// console.debug(response);
				}, {
					initData: getInitData(),
					placeId,
					month: favoriteMonth,
				});
			}

			notificationOccurredSuccess();
		});

		// place.favorites = 8;
		if (place.favorites) {
			$placeLikeBtn.dataset.month = place.favorites;
			if (isFavorites || place.favorites === parseInt(monthValue)) {
				$placeLikeBtn.classList.add('liked');
				$placeLikeBtn.classList.remove('text-secondary');
				$placeLikeBtn.classList.add('text-danger');
			}
			if (isFavorites) {
				const $favoritesMonth = $newPlaceCard.querySelector('.month');
				let monthText;
				switch (place.favorites) {
					case 1: monthText = 'январе'; break;
					case 2: monthText = 'феврале'; break;
					case 3: monthText = 'марте'; break;
					case 4: monthText = 'апреле'; break;
					case 5: monthText = 'мае'; break;
					case 6: monthText = 'июне'; break;
					case 7: monthText = 'июле'; break;
					case 8: monthText = 'августе'; break;
					case 9: monthText = 'сентябре'; break;
					case 10: monthText = 'октярбре'; break;
					case 11: monthText = 'ноябре'; break;
					case 12: monthText = 'декабре'; break;
				}
				$favoritesMonth.innerText = `В ${monthText}`;
				show($favoritesMonth);
			}
		}
		else $placeLikeBtn.dataset.month = monthValue;

		/* const $placeShareBtn = $newPlaceCard.querySelector('.place-share');
		$placeShareBtn.addEventListener('click', () => {
			Telegram.WebApp.sendData({
				message: 'Мне нравится, и я советую приложение TripMe!',
			});
			thanksMessage();
		});
		if (isFavorites) show($placeShareBtn); */

		const $videoBtn = $newPlaceCard.querySelector('.video');
		$videoBtn.href = `https://www.youtube.com/watch?v=${place.video}`;
		$videoBtn.addEventListener('click', (e) => {
			// localStorage.removeItem('video');

			if ( ! localStorage.video) {
				e.preventDefault();
				localStorage.video = 1;
				showAlert('Вы будете перенаправлены на YouTube. После просмотра видео не забудьте вернуться и посмотреть другие места!', () => {
					$videoBtn.click();

					notificationOccurredSuccess();
				});

				notificationOccurredWarning();
			}

			notificationOccurredSuccess();
		});

		const $photosBtn = $newPlaceCard.querySelector('.photos');
		$photosBtn.addEventListener('click', () => {
			const imagesArr = place.photos.split(';');
			showImages(imagesArr);

			notificationOccurredSuccess();
		});

		$placesCards.appendChild($newPlaceCard);
		show($newPlaceCard);

		// TODO: find another fix for max-height
		/* start fix max-height */
		setTimeout(() => {
			cardHeightResize($newPlaceCard);
		}, 1000);
		/* end fix max-height */
	};

	setTimeout(() => {
		$placesCards.querySelectorAll('.card').forEach(($card) => {
			cardHeightResize($card);
		});
	}, 2000);
};

const cardHeightResize = ($newPlaceCard) => {
	const $childrens = $newPlaceCard.querySelector('.card-img-overlay').children;
	let totalHeight = 0;
	for (let i = 0; i < $childrens.length; i++)
		totalHeight += $childrens[i].offsetHeight;
	$newPlaceCard.querySelector('.card-img-top').style.height = `${totalHeight + 40}px`;
};

const getPlaces = () => {
	isFavorites = false;
	$placesCards.innerHTML = '';
	$placesCards.classList.remove('favorites');
	const requestTimeout = () => {
		if ( ! placesLoaded) {
			httpQuery('places.get', (response) => {
				// console.debug(response);
				if (response.items && response.items.length) {
					hide($noPlacesResults);
					$placesCount.innerText = response.items.length + 1;
					show($placesCountArea);
					renderQuizList(response.items);
				}
				else {
					hide($placesCountArea);
					show($noPlacesResults);
				}

				impactOccurredHeavy();
			}, {
				initData: getInitData(),
				month: monthValue,
				question2: question2,
				question3: question3,
			});
			placesLoaded = true;
			setTimeout(() => { placesLoaded = false; }, throttlingTimer);
		}
		else if ( ! requestTimeoutStarted) {
			requestTimeoutStarted = true;
			setTimeout(() => {
				requestTimeoutStarted = false;
				requestTimeout();
			}, throttlingTimer);
		}
	};
	requestTimeout();
};

let swalQuote;

const showQuote = () => {
	if ( ! swalQuote && Swal.isVisible()) {
		setTimeout(() => { showQuote(); }, 5000);
		return;
	}
	const timer = 20000;
	if ( ! localStorage.quote) localStorage.quote = 0;
	const text = quotes[localStorage.quote];
	if (quotes[parseInt(localStorage.quote) + 1]) localStorage.quote++; else localStorage.quote = 0;
	if (swalQuote && Swal.isVisible()) {
		swalQuote.update({ title: text });
		const increaseTime = timer - Swal.getTimerLeft();
		Swal.increaseTimer(increaseTime);
	}
	else {
		swalQuote = Swal.fire({
			title: text,
			showCloseButton: true,
			toast: true,
			showConfirmButton: false,
			timer: timer,
			timerProgressBar: true,
			position: 'bottom-start',
			width: '100%',
			customClass: {
				container: 'swal2-quote',
			},
			showClass: {
				popup: 'animate__animated animate__fadeInUp',
			},
			hideClass: {
				popup: 'animate__animated animate__fadeOutDown',
			},
			onOpen: (toast) => {
				toast.addEventListener('click', showQuote);
			},
		});
	}
};
