//находим элементы на странице
const start_btn = document.querySelector('.start_btn button');
const info_box = document.querySelector('.info_box');
const exit_btn = info_box.querySelector('.buttons .quit');
const continue_btn = info_box.querySelector('.buttons .restart');
const quiz_box = document.querySelector('.quiz_box');
const result_box = document.querySelector('.result_box');
const option_list = document.querySelector('.option_list');
const time_line = document.querySelector('header .time_line');
const timeText = document.querySelector('.timer .time_left_txt');
const timeCount = document.querySelector('.timer .timer_sec');

// Если была нажата кнопка "Старт"
start_btn.onclick = () => {
  info_box.classList.add('activeInfo'); //показать информационный блок
};

// Если была нажата кнопка "Выйти"
exit_btn.onclick = () => {
  info_box.classList.remove('activeInfo'); //скрыть информационный блок
};

// Если была нажата кнопка "Далее"
continue_btn.onclick = () => {
  info_box.classList.remove('activeInfo'); //скрыть информационный блок
  quiz_box.classList.add('activeQuiz'); //показать блок с викториной
  showQuetions(0); //вызвать функцию showQestions
  queCounter(1); //передать "1" в функию queCounter
  startTimer(15); //вызвать функцию startTimer
  startTimerLine(0); //вызвать функцию startTimerLine
};

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector('.buttons .restart');
const quit_quiz = result_box.querySelector('.buttons .quit');

// Если была нажата кнопка "Пройти снова"
restart_quiz.onclick = () => {
  quiz_box.classList.add('activeQuiz'); //показать блок с викториной
  result_box.classList.remove('activeResult'); //скрыть результаты
  timeValue = 15;
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  showQuetions(que_count); //вызвать функцию showQestions
  queCounter(que_numb); //передать значение переменной que_numb в функцию queCounter
  clearInterval(counter); //очистить переменную counter
  clearInterval(counterLine); //очистить переменную counterLine
  startTimer(timeValue); //вызвать функцию startTimer
  startTimerLine(widthValue); //вызвать функцию startTimerLine
  timeText.textContent = 'Время'; //изменить текст на "Время"
  next_btn.classList.remove('show'); //скрыть кнопку "Следующий вопрос"
};

// Если была нажата кнопка "Пройти снова"
quit_quiz.onclick = () => {
  window.location.reload(); //перезагрузка текущей страницы
};

const next_btn = document.querySelector('footer .next_btn');
const bottom_ques_counter = document.querySelector('footer .total_que');

// Если была нажата кнопка "Далее"
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    //если счетчик вопросов меньше, чем общее количество вопросов
    que_count++; //увеличиваем значение переменной que_count на "1"
    que_numb++; //увеличиваем значение переменной the que_numb на "1"
    showQuetions(que_count); //вызвать функцию showQestions
    queCounter(que_numb); //передать значение переменной que_numb в функцию queCounter
    clearInterval(counter); //очистить значение переменной "counter"
    clearInterval(counterLine); //очистить значение переменной "counterLine"
    startTimer(timeValue); //вызвать функцию startTimer
    startTimerLine(widthValue); //вызвать функцию startTimerLine
    timeText.textContent = 'Время'; //
    next_btn.classList.remove('show'); //скрыть кнопку "Далее"
  } else {
    clearInterval(counter); //очистить значение переменной "counter"
    clearInterval(counterLine); //очистить значение переменной "counterLine"
    showResult(); //вызвать функцию showResult
  }
};

// получить вопросы и варианты ответов из массива
function showQuetions(index) {
  const que_text = document.querySelector('.que_text');

  //создать новый span и div теги для вопроса и вариантов ответа
  let que_tag = '<span>' + questions[index].numb + '. ' + questions[index].question + '</span>';
  let option_tag =
    '<div class="option"><span>' +
    questions[index].options[0] +
    '</span></div>' +
    '<div class="option"><span>' +
    questions[index].options[1] +
    '</span></div>' +
    '<div class="option"><span>' +
    questions[index].options[2] +
    '</span></div>' +
    '<div class="option"><span>' +
    questions[index].options[3] +
    '</span></div>';
  que_text.innerHTML = que_tag; //вставить значение переменной que_tag в элемент с классом "que_text"
  option_list.innerHTML = option_tag; //добавить новый div тег в элемент с классом "option_tag"

  const option = option_list.querySelectorAll('.option');

  // установить атрибут onclick для всех доступных вариантов
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute('onclick', 'optionSelected(this)');
  }
}
// создать новые div теги для иконок
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//если пользовать кликнул на один из вариантов ответа
function optionSelected(answer) {
  clearInterval(counter); //очистить переменную "counter"
  clearInterval(counterLine); //очистить переменную "counterLine"
  let userAns = answer.textContent; //получить выбранный ответ пользователя
  let correcAns = questions[que_count].answer; //получить правильный вариант ответа из массива
  const allOptions = option_list.children.length; //получить все варианты ответа

  if (userAns == correcAns) {
    //если пользователь выбрал вариант ответа равный правильному варианту ответа из массива
    userScore += 1; //переписываем значение переменной "userScore" увеличивая эту переменную на 1
    answer.classList.add('correct'); //добавить зеленый цвет для правильного варианта ответа
    answer.insertAdjacentHTML('beforeend', tickIconTag); //добавить иконку галочки для правильного варианта
    console.log('Correct Answer');
    console.log('Your correct answers = ' + userScore);
  } else {
    answer.classList.add('incorrect'); //добавить красный цвет для неправильного варианта ответа
    answer.insertAdjacentHTML('beforeend', crossIconTag); //добавить иконку крестика для неправильного варианта
    console.log('Wrong Answer');

    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) {
        //подсвечиваем правильный вариант ответа при выборе неправильного варианта ответа
        option_list.children[i].setAttribute('class', 'option correct'); //подсвечиваем правильный вариант ответа при выборе неправильного варианта ответаertAdjacentHTML('beforeend', tickIconTag); //подсвечиваем правильный вариант ответа при выборе неправильного варианта ответаcorrect answer.');
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add('disabled'); //исключаем возможность выбора вариантов ответа после того как пользователь выбрал какой-либо вариант овтета
  }
  next_btn.classList.add('show'); //показать кнопку "Далее" после того как пользователь выбрал какой-либо вариант ответа
}

function showResult() {
  info_box.classList.remove('activeInfo'); //скрыть информационный блок
  quiz_box.classList.remove('activeQuiz'); //скрыть блок с викториной
  result_box.classList.add('activeResult'); //показать результаты викторины
  const scoreText = result_box.querySelector('.score_text');
  if (userScore > 3) {
    //если пользователь ответил правильно более чем на 3 вопроса
    //создать новый span тег и передать количество очков и общее количество вопросов
    let scoreTag =
      '<span>Вау! Вы ответили на<p>' + userScore + '</p> из <p>' + questions.length + '</p></span>';
    scoreText.innerHTML = scoreTag; //добавить новый span тег в элемент с классом "scoreText"
  } else if (userScore > 1) {
    // если пользователь ответил правильно более чем на 1 вопроc
    let scoreTag =
      '<span>Неплохо, Вы ответили на<p>' +
      userScore +
      '</p> из <p>' +
      questions.length +
      '</p></span>';
    scoreText.innerHTML = scoreTag;
  } else {
    // если пользователь ответил правильно менее чем на 1 вопроc
    let scoreTag =
      '<span>Упс! Вы ответили на<p>' +
      userScore +
      '</p> из <p>' +
      questions.length +
      '</p> вопросов <p>' +
      '</p></span>';
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time; //изменить текстовое содержимое переменной "timeCount" на значение переменной "time"
    time--; //уменьшаем на "1" значение переменной "time"
    if (time < 9) {
      //если на таймере цифра меньше 10
      let addZero = timeCount.textContent;
      timeCount.textContent = '0' + addZero; //добавляем "0" перед текстовым содержимым переменной timeCount
    }
    if (time < 0) {
      //если таймер меньше "0"
      clearInterval(counter); //очищаем значение переменной "counter"
      timeText.textContent = 'Время истекло'; //меняем текст на "Время истекло"
      const allOptions = option_list.children.length; //получить все варианты ответов
      let correcAns = questions[que_count].answer; //получить правильный вариант ответа из массива
      for (i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correcAns) {
          //подсвечиваем правильный вариант ответа при выборе неправильного варианта ответа
          option_list.children[i].setAttribute('class', 'option correct'); //подсвечиваем правильный вариант ответа при выборе неправильного варианта ответаn
          option_list.children[i].insertAdjacentHTML('beforeend', tickIconTag); //подсвечиваем правильный вариант ответа при выборе неправильного варианта ответа          console.log('Time Off: Auto selected correct answer.');
        }
      }
      for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add('disabled'); //исключаем возможность выбора вариантов ответа после того как пользователь выбрал какой-либо вариант овтета
      }
      next_btn.classList.add('show'); //показать кнопку "Далее" после того как пользователь выбрал какой-либо вариант ответа
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1; //переписываем значение переменной "time" увеличивая ее значение на "1"
    time_line.style.width = time + 'px'; //увеличиваем ширину "time_line"
    if (time > 549) {
      //если значение переменной "time" больше чем 549
      clearInterval(counterLine); //очистить значение переменной "counterLine"
    }
  }
}

function queCounter(index) {
  //создать новый span тег и передать номер вопроса и общее количество вопросов
  let totalQueCounTag =
    '<span><p>' + index + '</p> из <p>' + questions.length + '</p> вопросов</span>';
  bottom_ques_counter.innerHTML = totalQueCounTag; //добавить новый span тег в элемент "bottom_ques_counter"
}
