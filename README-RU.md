# TripMe Mini App for Telegram

<a href="https://github.com/tgdev42/TripMeMiniApp/blob/master/LICENSE"><img src="https://camo.githubusercontent.com/76f0e887c183ccc31c1cb63c33d2dbf48cb2df51/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d4d49542d677265656e2e737667" alt="" data-canonical-src="https://img.shields.io/badge/License-MIT-green.svg" style="max-width:100%;"></a>

## О проекте
[TripMe Mini App](https://t.me/TripMeAppBot/miniapp) - a Mini App for independent travelers that shows places with the best season to travel in Asia. Answer 3 questions, and generate your personalized list of places to travel in the right month of your planned trip.

------------

## Подробное описание
Это мини-приложение Trip Me - идеальный вариант для самостоятельных путешественников, позволяющий узнать о местах с лучшим сезоном для путешествий в Азии.
Сначала ответьте на три вопроса, чтобы составить свой персональный список направлений для путешествий. Он будет составлен с учетом ваших предпочтений и наилучшего сезона для месяца планируемой поездки.
Затем ознакомьтесь с каждым из этих мест, используя краткую информацию, фотографии и видеоматериалы.
И наконец, добавьте выбранные направления в избранное, куда вы сможете вернуться и сравнить варианты, более подробно изучив их.
TripMeApp помогает путешественникам эффективно планировать свои поездки и экономить время!

------------

## Скриншоты
![screen-record](screenshot.jpg)

------------

## Прод-версия
https://t.me/TripMeAppBot/miniapp

------------

## Технические преимущества
- Frontend is written without using JS frontend frameworks (React, Vue.JS, etc.), which is why it has a very simple and clear codebase and code architecture.
- Frontend use Telegram JavaScript library [“telegram-web-app.js”](https://telegram.org/js/telegram-web-app.js).
- Бэкенд реализован на самом популярном серверном стеке: Node.js and MySQL.
- В бэкенде используется самые популярные библиотеки: [Express](https://github.com/expressjs/express), [MySQL 2](https://github.com/sidorares/node-mysql2), [joi](https://github.com/hapijs/joi).

------------

## Функции
- [x] отличный UX и респонсивный UI
- [x] сохраняется сущность пользователя в БД на стороне сервера
- [x] реализовано сохранение данных для пользователя в БД на стороне сервера (функция "добавить в избранное"")
- [x] валидация всех входных параметров от приложения на стороне сервера
- [x] валидация initData данных при помощи hash от приложения на стороне сервера
- [x] просмотр галереи изображений
- [x] использование Telegram.WebApp.ready
- [x] использование Telegram.WebApp.initData
- [x] использование Telegram.WebApp.expand
- [x] использование Telegram.WebApp.HapticFeedback
- [x] использование Telegram.WebApp.enableClosingConfirmation
- [x] использование Telegram.WebApp.showAlert
- [x] использование Telegram.WebApp.showConfirm

------------

## Архитектура
1. Mini App -> send request "places.get" to backend for get all items
2. Backend -> validate all parameters
3. Backend -> validate initData with hash
4. Backend -> created user if doesn't exist in database (for favorites)
5. Backend -> get data from database
6. Backend -> send data to Mini App
7. Mini App -> send request "favorites.get" to backend for get favorites items, and next points are similar: 2, 3, 5, 6
8. Mini App -> send request "favorites.set" to backend for set favorite item, and next points are similar: 2, 3, 5, 6
9. Mini App -> send request "favorites.remove" to backend for remove favorite item, and next points are similar: 2, 3, 5, 6
------------

## Схема архитектуры
![architecture-scheme](architecture-scheme.jpg)

------------

## Содержимое репозитория
- backend - весь бэкенд код
- frontend - весь фронтенд код
- docs: скомпилированная версия фронтенда (доступна через GitHub Pages)
- db-dump.sql - дамп БД для MySQL или MariaDB

------------

## Как установить, запустить, сбилдить
Для этого пожалуйста посмотрите README.md внутри бэкенда и фронтенда

------------

## Проблемы
Если вы обнаружите проблемы, пожалуйста, сообщите о них создав issue!

------------

## Вклад в проект
PR приветствуются! Если вы хотите внести свой вклад, но не знаете, над чем работать, проверьте список проблем.

------------

## Помощь проекту
Если вы хотите купить мне пива, я не буду жаловаться. Я тебя поблагодарю! =)
- TON: [EQC0ibE0bHkj2rz3vaLiupwfCEPjasbO8WqgKslydt0NolXj](EQC0ibE0bHkj2rz3vaLiupwfCEPjasbO8WqgKslydt0NolXj)
- USDT TRC20: [TKvFWyRvCc6gifsHQDZuVHiyDdf2fa6Au8](TKvFWyRvCc6gifsHQDZuVHiyDdf2fa6Au8)

------------

## Контакты
Telegram: [@tgdev42](https://t.me/tgdev42)

------------

## Лицензия
MIT
