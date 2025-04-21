import {postTask, removeAllTaskFromBaserow} from './js/Services/baseRowServices.js';
import {showMenus, showFilter, elementsValuesForConfirmEditAction, createInput, createSelect, generateTaskDivByType, createH3orH2, createBut} from '/js/domHelper.js';
import {openMeteoApiAndUserGeolocation} from './js/Services/weatherService.js'
const taskListNav = document.getElementById('taskListNav');
const addTaskNav = document.getElementById('addTaskNav');
const timeNav = document.getElementById('timeNav');
const taskListContainer = document.getElementById('taskListContainer');
const addTaskContainer = document.getElementById('addTaskContainer');
const timeContainer = document.getElementById('timeContainer');
const addTaskBut = document.getElementById('addButton');
const taskTitle = document.getElementById('taskTitleInput')
const taskStatus = document.getElementById('taskStatusInput');
const taskDesc= document.getElementById('taskDescInput');
const taskDate = document.getElementById('taskDateInput');
const headerContainer = document.getElementById('headerContainer');
const addApiKeyBut = document.getElementById('addApiKey');
const errorDiv = document.getElementById('errorMessages');
const filterContainer = document.getElementById('filter')
const showAll = document.getElementById('showAll');
const showFinished = document.getElementById('showFinished');
const showPending = document.getElementById('showPending');
const showNotStarted = document.getElementById('showNotStarted');


let task = [];
let idTask = 0;
//El token y el idtable se consigue dentro de baserow, primero hay que crear una base de datos -> click en los 3 puntitos (numero entre parentesis)
//El token se obtiene en tu perfil -> mi configuración -> fichas de la base de datos (dar permisos). La base de datos tiene que tener:
//Columnas: +Fecha -> fecha con hora, +Descripción -> texto largo, +estado -> selección única opciones: 1. Pendiente 2. Finalizado 3. No iniciada, 
// +titulo ->Texto de una sola línea y por último fecha_creacion -> fecha con hora. Es importante tanto el orden como esta escrito en estos comentarios
let token = '';
let idTable = '';
let lon;
let lat;

window.addEventListener('load', (ev) => {
    const storedArticles = localStorage.getItem('articles');
    if( JSON.parse(storedArticles).length != 0){
        JSON.parse(storedArticles).forEach(el => {
            createTaskArticle(el.title, el.desc, el.status, el.date, el.creationDate, el.id)
        });
        console.log(task);
        showMenus(taskListContainer);
        openMeteoApiAndUserGeolocation(generateWeatherCarts, createErrorMessage, lat, lon);
    }
    createAddTaskBaserowBut();
});

showAll.addEventListener('click', () => {
    taskFilterArticle('');
});

showNotStarted.addEventListener('click', () => {
    taskFilterArticle('No iniciada');
});

showFinished.addEventListener('click', () => {
    taskFilterArticle('Finalizado');
});

showPending.addEventListener('click', () => {
    taskFilterArticle('Pendiente');
});

addApiKeyBut.addEventListener('click', () => {
    createRemoveApiKeyBut();
});

taskListNav.addEventListener('click', () => {
    showFilter('block');
    showMenus(taskListContainer);
    removeErrorMessage();
});

addTaskNav.addEventListener('click', () => {
    showMenus(addTaskContainer);
    removeErrorMessage();
    showFilter('none');
});

timeNav.addEventListener('click', () => { 
    showMenus(timeContainer);
    showFilter('none');
});

addTaskBut.addEventListener('click', () => {
    const taskTitleInput = taskTitle.value;
    const taskDescInput = taskDesc.value;
    const taskStatusInput = taskStatus.value;
    const taskDateInput = taskDate.value;
    createTaskArticle(taskTitleInput, taskDescInput, taskStatusInput, taskDateInput, '', idTask);
    showMenus(taskListContainer);
    showFilter('block');
    console.log(task)
});

const taskFilterArticle = (filter) => {
    if(filter){
        let taskFiltered = task.filter(el => el.status === filter);
        while(taskListContainer.firstElementChild){
            taskListContainer.firstElementChild.remove();
        }
        taskFiltered.forEach(el => {
            generateTaskWithoutAddingTaskArr(el.title, el.desc, el.status, el.date, el.id);
        })
    }else{
        while(taskListContainer.firstElementChild){
            taskListContainer.firstElementChild.remove();
        }
        task.forEach(el => {
            generateTaskWithoutAddingTaskArr(el.title, el.desc, el.status, el.date, el.id);
        })
    }
    
};

const generateTaskWithoutAddingTaskArr = (title, desc, status, date, id) => {
    const article = document.createElement('article');
    article.setAttribute('class', 'main__container__taskList__cart');
    article.setAttribute('id', 'main__container__taskList__cart');
    const div = document.createElement('div');
    div.setAttribute('class', 'main__container__taskList__cart__grid');
    const divType1 = generateTaskDivByType(1);
    const titleh2 = createH3orH2('Titulo', 'h3');
    const descTitle = createH3orH2('Descripción', 'h3');
    const statusTitle = createH3orH2('Estado', 'h3');
    divType1.append(titleh2, descTitle, statusTitle);
    const secondDivType1 = generateTaskDivByType(1);
    const h2Desc = createH3orH2(desc, 'h3');
    const h2Status = createH3orH2(status, 'h2');
    const h2Title = createH3orH2(title, 'h2');
    secondDivType1.append(h2Title, h2Desc, h2Status);
    const divType2 = generateTaskDivByType(2);
    const duration = createH3orH2('Vencimiento', 'h3');
    const requestDate = document.createElement('input');
    requestDate.setAttribute('type', 'datetime-local');
    requestDate.setAttribute('disabled', 'disabled');
    requestDate.style.backgroundColor = '#fff';
    requestDate.style.color = 'black';
    requestDate.style.textAlign = 'center';
    requestDate.value = date;
    divType2.append(duration, requestDate);
    const divType3 = generateTaskDivByType(3);
    const svgIcons = `<svg class='deleteIcon' width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.4 0 0 5.4 0 12C0 18.6 5.4 24 12 24C18.6 24 24 18.6 24 12C24 5.4 18.6 0 12 0ZM12 2.66667C14.0667 2.66667 16 3.4 17.6 4.53333L4.53333 17.6C3.4 16 2.66667 14.0667 2.66667 12C2.66667 6.86667 6.86667 2.66667 12 2.66667ZM12 21.3333C9.93333 21.3333 8 20.6 6.4 19.4667L19.4667 6.4C20.6 8 21.3333 9.93333 21.3333 12C21.3333 17.1333 17.1333 21.3333 12 21.3333Z"
                      fill="#FF0000"/>
                    </svg>
                    
                    <svg class='editIcon' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.66667 28C5.93333 28 5.30578 27.7391 4.784 27.2173C4.26222 26.6956 4.00089 26.0676 4 25.3333V6.66667C4 5.93333 4.26133 5.30578 4.784 4.784C5.30667 4.26222 5.93422 4.00089 6.66667 4H18.5667L15.9 6.66667H6.66667V25.3333H25.3333V16.0667L28 13.4V25.3333C28 26.0667 27.7391 26.6947 27.2173 27.2173C26.6956 27.74 26.0676 28.0009 25.3333 28H6.66667ZM12 20V14.3333L24.2333 2.1C24.5 1.83333 24.8 1.63333 25.1333 1.5C25.4667 1.36667 25.8 1.3 26.1333 1.3C26.4889 1.3 26.828 1.36667 27.1507 1.5C27.4733 1.63333 27.7676 1.83333 28.0333 2.1L29.9 4C30.1444 4.26667 30.3333 4.56133 30.4667 4.884C30.6 5.20667 30.6667 5.53422 30.6667 5.86667C30.6667 6.19911 30.6058 6.52711 30.484 6.85067C30.3622 7.17422 30.1676 7.46844 29.9 7.73333L17.6667 20H12ZM14.6667 17.3333H16.5333L24.2667 9.6L23.3333 8.66667L22.3667 7.73333L14.6667 15.4333V17.3333Z" fill="white"/>
                      </svg>
                    `;
    
    divType3.innerHTML = svgIcons;
    div.append(divType1, secondDivType1, divType2, divType3);
    article.append(div);
    taskListContainer.append(article);
    deleteAndPutConfirmSaveTasksBut();
    deleteTaskButAction(id);
    editTaskButAction(id);
};

const createTaskArticle = (title, desc, status, date, creationDate, id) => {
    generateTaskWithoutAddingTaskArr(title, desc, status, date, id)
    if(creationDate === ''){
        creationDate = new Date();
    }
    task.push({id: idTask, title, desc, status, date, creationDate});
    idTask++;
};

const deleteTaskButAction = (idTask) => {
    const deleteBut = document.querySelectorAll('.deleteIcon');
    deleteBut.forEach(but => {
        if(!but.dataset.listenerAdded){
            but.addEventListener('click', (ev) => {
                if(confirm("¿Estás seguro de que quieres continuar?")){
                    ev.target.closest('article').remove();
                    task = task.filter(el => el.id !== idTask);
                }
            })
        }
        but.dataset.listenerAdded = true;
    })
};

const editTaskButAction = (idTask) => {
    const editBut = document.querySelectorAll('.editIcon');
        editBut.forEach(but => {
            but.addEventListener('click', (ev) => {
            let divValuesTitles = ev.target.closest('article').firstElementChild.firstElementChild.nextElementSibling;
            let previousTaskTitle = divValuesTitles.firstElementChild.textContent;
            let previousTaskDesc = divValuesTitles.firstElementChild.nextElementSibling.textContent;
            let previousTaskStatus = divValuesTitles.firstElementChild.nextElementSibling.nextElementSibling.textContent;
            if(!previousTaskTitle){
                previousTaskTitle = divValuesTitles.firstElementChild.value;
                previousTaskDesc = divValuesTitles.firstElementChild.nextElementSibling.value;
                previousTaskStatus = divValuesTitles.firstElementChild.nextElementSibling.nextElementSibling.value;
            }
            while(divValuesTitles.firstElementChild){
                divValuesTitles.firstElementChild.remove();
            }
            divValuesTitles.append(createInput(previousTaskTitle));
            divValuesTitles.append(createInput(previousTaskDesc));
            divValuesTitles.append(createSelect(previousTaskStatus));
            let ValuesDate = divValuesTitles.nextElementSibling.firstElementChild.nextElementSibling;
            ValuesDate.removeAttribute('disabled')
            let divButtons = divValuesTitles.nextElementSibling.nextElementSibling;
            while(divButtons.firstElementChild){
                divButtons.firstElementChild.remove();
            }
            const svgSave = '<svg class="saveIcon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><!-- Icon from Fluent UI System Color Icons by Microsoft Corporation - https://github.com/microsoft/fluentui-system-icons/blob/main/LICENSE --><g fill="none"><path fill="url(#fluentColorDocumentAdd480)" d="M11 43h26a3 3 0 0 0 3-3V18l-10-4l-4-10H11a3 3 0 0 0-3 3v33a3 3 0 0 0 3 3"/><path fill="url(#fluentColorDocumentAdd484)" fill-opacity=".5" d="M11 43h26a3 3 0 0 0 3-3V18l-10-4l-4-10H11a3 3 0 0 0-3 3v33a3 3 0 0 0 3 3"/><path fill="url(#fluentColorDocumentAdd485)" fill-opacity=".5" d="M11 43h26a3 3 0 0 0 3-3V18l-10-4l-4-10H11a3 3 0 0 0-3 3v33a3 3 0 0 0 3 3"/><path fill="url(#fluentColorDocumentAdd481)" d="M26 15V4l14 14H29a3 3 0 0 1-3-3"/><path fill="url(#fluentColorDocumentAdd482)" d="M13 24c6.075 0 11 4.925 11 11s-4.925 11-11 11S2 41.075 2 35s4.925-11 11-11"/><path fill="url(#fluentColorDocumentAdd483)" fill-rule="evenodd" d="M13 27a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H6a1 1 0 1 1 0-2h6v-6a1 1 0 0 1 1-1" clip-rule="evenodd"/><defs><linearGradient id="fluentColorDocumentAdd480" x1="30.4" x2="33.484" y1="4" y2="36.911" gradientUnits="userSpaceOnUse"><stop stop-color="#6CE0FF"/><stop offset="1" stop-color="#4894FE"/></linearGradient><linearGradient id="fluentColorDocumentAdd481" x1="32.977" x2="29.477" y1="9.833" y2="15.667" gradientUnits="userSpaceOnUse"><stop stop-color="#9FF0F9"/><stop offset="1" stop-color="#B3E0FF"/></linearGradient><linearGradient id="fluentColorDocumentAdd482" x1="2.786" x2="17.968" y1="28.125" y2="43.899" gradientUnits="userSpaceOnUse"><stop stop-color="#52D17C"/><stop offset="1" stop-color="#22918B"/></linearGradient><linearGradient id="fluentColorDocumentAdd483" x1="8" x2="12.909" y1="28.632" y2="45.962" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#E3FFD9"/></linearGradient><radialGradient id="fluentColorDocumentAdd484" cx="0" cy="0" r="1" gradientTransform="matrix(-17.33333 17.73237 -10.47911 -10.24329 41.333 5.219)" gradientUnits="userSpaceOnUse"><stop offset=".362" stop-color="#4A43CB"/><stop offset="1" stop-color="#4A43CB" stop-opacity="0"/></radialGradient><radialGradient id="fluentColorDocumentAdd485" cx="0" cy="0" r="1" gradientTransform="matrix(.8 17.875 -17.9901 .80516 12.8 40.563)" gradientUnits="userSpaceOnUse"><stop offset=".535" stop-color="#4A43CB"/><stop offset="1" stop-color="#4A43CB" stop-opacity="0"/></radialGradient></defs></g></svg>';
            divButtons.innerHTML = svgSave;
            confirmEditTaskButAction(idTask);
        })
        })
};

const confirmEditTaskButAction = (idTask) => {
        const saveBut = document.querySelector('.saveIcon');
        saveBut.addEventListener('click', (ev) => {
            let divValuesTitles = ev.target.closest('article').firstElementChild.firstElementChild.nextElementSibling;
            let previousTaskTitle = divValuesTitles.firstElementChild.value;
            let previousTaskDesc = divValuesTitles.firstElementChild.nextElementSibling.value;
            let previousTaskStatus = divValuesTitles.firstElementChild.nextElementSibling.nextElementSibling.value;
            while(divValuesTitles.firstElementChild){
                divValuesTitles.firstElementChild.remove();
            }
            divValuesTitles.append(elementsValuesForConfirmEditAction('h2', previousTaskTitle));
            divValuesTitles.append(elementsValuesForConfirmEditAction('h3', previousTaskDesc));
            divValuesTitles.append(elementsValuesForConfirmEditAction('h2', previousTaskStatus));
            let ValuesDate = divValuesTitles.nextElementSibling.firstElementChild.nextElementSibling;
            ValuesDate.setAttribute('disabled', 'disabled');
            let divButtons = divValuesTitles.nextElementSibling.nextElementSibling;
            while(divButtons.firstElementChild){
                divButtons.firstElementChild.remove();
            }
            const svgIcons = `<svg class='deleteIcon' width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 0C5.4 0 0 5.4 0 12C0 18.6 5.4 24 12 24C18.6 24 24 18.6 24 12C24 5.4 18.6 0 12 0ZM12 2.66667C14.0667 2.66667 16 3.4 17.6 4.53333L4.53333 17.6C3.4 16 2.66667 14.0667 2.66667 12C2.66667 6.86667 6.86667 2.66667 12 2.66667ZM12 21.3333C9.93333 21.3333 8 20.6 6.4 19.4667L19.4667 6.4C20.6 8 21.3333 9.93333 21.3333 12C21.3333 17.1333 17.1333 21.3333 12 21.3333Z"
                          fill="#FF0000"/>
                        </svg>
                        
                        <svg class='editIcon' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6.66667 28C5.93333 28 5.30578 27.7391 4.784 27.2173C4.26222 26.6956 4.00089 26.0676 4 25.3333V6.66667C4 5.93333 4.26133 5.30578 4.784 4.784C5.30667 4.26222 5.93422 4.00089 6.66667 4H18.5667L15.9 6.66667H6.66667V25.3333H25.3333V16.0667L28 13.4V25.3333C28 26.0667 27.7391 26.6947 27.2173 27.2173C26.6956 27.74 26.0676 28.0009 25.3333 28H6.66667ZM12 20V14.3333L24.2333 2.1C24.5 1.83333 24.8 1.63333 25.1333 1.5C25.4667 1.36667 25.8 1.3 26.1333 1.3C26.4889 1.3 26.828 1.36667 27.1507 1.5C27.4733 1.63333 27.7676 1.83333 28.0333 2.1L29.9 4C30.1444 4.26667 30.3333 4.56133 30.4667 4.884C30.6 5.20667 30.6667 5.53422 30.6667 5.86667C30.6667 6.19911 30.6058 6.52711 30.484 6.85067C30.3622 7.17422 30.1676 7.46844 29.9 7.73333L17.6667 20H12ZM14.6667 17.3333H16.5333L24.2667 9.6L23.3333 8.66667L22.3667 7.73333L14.6667 15.4333V17.3333Z" fill="white"/>
                          </svg>
                        `;
            divButtons.innerHTML = svgIcons;
            deleteTaskButAction(idTask);
            editTaskButAction(idTask);
            const indexOfElementToModify = task.findIndex(el => el.id === idTask);
            let oldCreationDate = task[indexOfElementToModify].creationDate;
            task[indexOfElementToModify] = {id: idTask, title: previousTaskTitle, desc: previousTaskDesc,  status: previousTaskStatus, date: ValuesDate.value, creationDate: oldCreationDate}; 
            console.log(task);
        });
};

const deleteAndPutConfirmSaveTasksBut = () => {
    if(document.getElementById('saveAllTasks')){
        document.getElementById('saveAllTasks').remove();
    }
    const saveAllTaskBut = document.createElement('button');
    saveAllTaskBut.setAttribute('id', 'saveAllTasks');
    const txt = document.createTextNode('Guardar Tareas');
    saveAllTaskBut.append(txt);
    taskListContainer.append(saveAllTaskBut);
    saveAllTaskButAction(saveAllTaskBut);
};

const saveAllTaskButAction = (saveAllTaskBut) => {
    saveAllTaskBut.addEventListener('click', async(ev) => {
        if(localStorage.getItem('articles')){
            localStorage.clear();
        }
        localStorage.setItem('articles', JSON.stringify(task));
        if(token && idTable){
            removeErrorMessage();
            await removeAllTaskFromBaserow(idTable, token);
            await postTask(task, idTable, token);
            alert('Guardado Correctamente en baserow');
        }else{
            createErrorMessage('El token o el idTable no son correctos pero se ha guardado en localStorage');
        }
    })
};

const removeElementHeaderContainer = () => {
    while(headerContainer.firstChild){
        headerContainer.firstChild.remove();
    }
};

const createAddTaskBaserowBut = () => {
    removeElementHeaderContainer();
        const addApiKetBut = createBut('Agregar Taskplanner en Baserow', 'header__Notion__AddTaskPlanner', 'addApiKey', ()=> {
        token = '';
        removeElementHeaderContainer();
        const h3 = createH3orH2('Agregue su token y su idTable: ', 'h3');
        const input = createInput('');
        input.setAttribute('placeholder', 'token');
        const input2 = createInput('');
        input2.setAttribute('placeholder', 'idTable');
        const submitApiKey = createBut('Agregar Api', 'header__Notion__AddTaskPlanner', 'addApiKey', () => {
            token = input.value;
            idTable = input2.value;
            createRemoveApiKeyBut();
        });
        headerContainer.append(h3, input, input2, submitApiKey);
        });
    headerContainer.append(addApiKetBut);
};

const createErrorMessage = (text) => {
    let h2Error = createH3orH2(text, 'h2');
    errorDiv.append(h2Error);
};

const removeErrorMessage = () => {
    while(errorDiv.firstChild){
        errorDiv.firstChild.remove();
    }
};

const createRemoveApiKeyBut = () => {
    removeElementHeaderContainer();
    const removeApiKeyBut = createBut('Quitar token e idTable', 'header__Notion__AddTaskPlanner', 'removeApiKeyBut', ()=> {
    token = '';
    idTable = '';
    removeElementHeaderContainer();
    createAddTaskBaserowBut();
    });
    headerContainer.append(removeApiKeyBut);
};

const generateWeatherCarts = (data) => {
    for(let i = 0; i< 7; i++){
        let divTime = document.createElement('div');
        divTime.setAttribute('class', 'main__container__time_cart');
        let day = createH3orH2(`Dia: ${data.daily.time[i]}`, 'h2');
        divTime.append(day);
        let divSvg = document.createElement('div');
        const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 48 48"><circle cx="23.997" cy="23.995" r="9.438" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M2.5 23.995h7.346M23.997 45.5v-7.35m0-28.3V2.5m14.157 21.495H45.5M8.79 39.192l5.195-5.194M39.2 39.2l-5.198-5.198M13.989 13.991L8.79 8.794m25.212 5.19l5.194-5.194"/></svg>';
        divSvg.innerHTML = svg;
        divTime.append(divSvg);
        let tempMax = createH3orH2('Temp Maxima: ', 'h3');
        let spanTemp = document.createElement('span');
        let txtTempMax = document.createTextNode(data.daily.temperature_2m_max[i]);
        spanTemp.append(txtTempMax);
        tempMax.append(spanTemp);
        divTime.append(tempMax);
        let tempMin = createH3orH2('Temp Minima: ', 'h3');
        let spanTempMin = document.createElement('span');
        let txtTempMin = document.createTextNode(data.daily.temperature_2m_min[i]);
        spanTempMin.append(txtTempMin);
        tempMin.append(spanTempMin);
        divTime.append(tempMin);
        let precipitation = createH3orH2('Precipitacion: ', 'h3');
        let spanPrecipitation = document.createElement('span');
        let txtPrecipitation= document.createTextNode(data.daily.precipitation_sum[i]);
        spanPrecipitation.append(txtPrecipitation);
        precipitation.append(spanPrecipitation);
        divTime.append(precipitation);
        timeContainer.append(divTime);
    }
};