{/* <li id="taskListNav">Lista de tareas</li>
                            <li id="addTaskNav">Agregar nueva tarea</li>
                            <li id="timeNav">Tiempo</li> */}
const taskListNav = document.getElementById('taskListNav');
const addTaskNav = document.getElementById('addTaskNav');
const timeNav = document.getElementById('timeNav');
const taskListContainer = document.getElementById('taskListContainer');
const addTaskContainer = document.getElementById('addTaskContainer');
const timeContainer = document.getElementById('timeContainer');
const addTaskBut = document.getElementById('addButton');
const taskStatus = document.getElementById('taskStatusInput');
const taskName = document.getElementById('taskNameInput');
const taskDate = document.getElementById('taskDateInput');
const headerContainer = document.getElementById('headerContainer');
const addApiKeyBut = document.getElementById('addApiKey');
const errorDiv = document.getElementById('errorMessages');


let task = [];
let idTask = 0;
let token = 'K47EeJsATAmlAq25daGeyu7BR9DBLSaB'
let idTable = '506963';
let lon;
let lat;

window.addEventListener('load', ev => {
    const storedArticles = localStorage.getItem('articles')
    if( JSON.parse(storedArticles).length != 0){
        JSON.parse(storedArticles).forEach(el => {
            createTaskArticle(el.title, el.status, el.date)
        })
        showMenus(taskListContainer);
        openMeteoApiAndUserGeolocation();
    }
    createAddTaskBaserowBut();
    
});

addApiKeyBut.addEventListener('click', () => {
    createRemoveApiKeyBut();
});

taskListNav.addEventListener('click', () => {
    showMenus(taskListContainer)
    removeErrorMessage()
});
addTaskNav.addEventListener('click', () => {
    showMenus(addTaskContainer)
    removeErrorMessage()
});
timeNav.addEventListener('click', () => { 
    showMenus(timeContainer)
});
addTaskBut.addEventListener('click', () => {
    const taskNameInput = taskName.value;
    const taskStatusInput = taskStatus.value;
    const taskDateInput = taskDate.value;
    createTaskArticle(taskNameInput, taskStatusInput, taskDateInput);
    showMenus(taskListContainer);
});

const showMenus = (element) => {
    taskListContainer.style.display = 'none';
    addTaskContainer.style.display = 'none';
    element.style.display = 'flex'
}

const createTaskArticle = (title, status, date) => {
    const article = document.createElement('article');
    article.setAttribute('class', 'main__container__taskList__cart');
    article.setAttribute('id', 'main__container__taskList__cart');
    const div = document.createElement('div');
    div.setAttribute('class', 'main__container__taskList__cart__grid');
    const divType1 = generateTaskDivByType(1);
    const firstTitle = createH3orH2('Nombre de la Tarea', 'h3');
    const secondTitle = createH3orH2('Estado', 'h3');
    divType1.append(firstTitle, secondTitle);
    const secondDivType1 = generateTaskDivByType(1);
    const p = document.createElement('p');
    const txtP = document.createTextNode(title);
    const h2 = createH3orH2(status, 'h2');
    p.append(txtP);
    secondDivType1.append(p, h2);
    const divType2 = generateTaskDivByType(2);
    const duration = createH3orH2('Vencimiento', 'h3');
    const requestDate = document.createElement('input');
    requestDate.setAttribute('type', 'datetime-local');
    requestDate.setAttribute('disabled', 'disabled');
    requestDate.style.backgroundColor = '#fff'
    requestDate.style.color = 'black'
    requestDate.style.textAlign = 'center'
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
    task.push({id: idTask, title, status, date})
    deleteAndPutConfirmSaveTasksBut();
    deleteTaskButAction(idTask);
    editTaskButAction(idTask);
    idTask++
}

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
    
}

const editTaskButAction = (idTask) => {
    const editBut = document.querySelectorAll('.editIcon');
        editBut.forEach(but => {
            but.addEventListener('click', (ev) => {
            let divValuesTitles = ev.target.closest('article').firstElementChild.firstElementChild.nextElementSibling;
            let previousTaskName = divValuesTitles.firstElementChild.textContent;
            let previousTaskStatus = divValuesTitles.firstElementChild.nextElementSibling.textContent
            if(!previousTaskName){
                previousTaskName = divValuesTitles.firstElementChild.value;
                previousTaskStatus = divValuesTitles.firstElementChild.nextElementSibling.value
            }
            while(divValuesTitles.firstElementChild){
                divValuesTitles.firstElementChild.remove();
            }
            divValuesTitles.append(createInput(previousTaskName));
            divValuesTitles.append(createSelect(previousTaskStatus));
            let ValuesDate = divValuesTitles.nextElementSibling.firstElementChild.nextElementSibling;
            ValuesDate.removeAttribute('disabled')
            let divButtons = divValuesTitles.nextElementSibling.nextElementSibling;
            while(divButtons.firstElementChild){
                divButtons.firstElementChild.remove();
            }
            const svgSave = '<svg id="saveIcon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><!-- Icon from Fluent UI System Color Icons by Microsoft Corporation - https://github.com/microsoft/fluentui-system-icons/blob/main/LICENSE --><g fill="none"><path fill="url(#fluentColorDocumentAdd480)" d="M11 43h26a3 3 0 0 0 3-3V18l-10-4l-4-10H11a3 3 0 0 0-3 3v33a3 3 0 0 0 3 3"/><path fill="url(#fluentColorDocumentAdd484)" fill-opacity=".5" d="M11 43h26a3 3 0 0 0 3-3V18l-10-4l-4-10H11a3 3 0 0 0-3 3v33a3 3 0 0 0 3 3"/><path fill="url(#fluentColorDocumentAdd485)" fill-opacity=".5" d="M11 43h26a3 3 0 0 0 3-3V18l-10-4l-4-10H11a3 3 0 0 0-3 3v33a3 3 0 0 0 3 3"/><path fill="url(#fluentColorDocumentAdd481)" d="M26 15V4l14 14H29a3 3 0 0 1-3-3"/><path fill="url(#fluentColorDocumentAdd482)" d="M13 24c6.075 0 11 4.925 11 11s-4.925 11-11 11S2 41.075 2 35s4.925-11 11-11"/><path fill="url(#fluentColorDocumentAdd483)" fill-rule="evenodd" d="M13 27a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H6a1 1 0 1 1 0-2h6v-6a1 1 0 0 1 1-1" clip-rule="evenodd"/><defs><linearGradient id="fluentColorDocumentAdd480" x1="30.4" x2="33.484" y1="4" y2="36.911" gradientUnits="userSpaceOnUse"><stop stop-color="#6CE0FF"/><stop offset="1" stop-color="#4894FE"/></linearGradient><linearGradient id="fluentColorDocumentAdd481" x1="32.977" x2="29.477" y1="9.833" y2="15.667" gradientUnits="userSpaceOnUse"><stop stop-color="#9FF0F9"/><stop offset="1" stop-color="#B3E0FF"/></linearGradient><linearGradient id="fluentColorDocumentAdd482" x1="2.786" x2="17.968" y1="28.125" y2="43.899" gradientUnits="userSpaceOnUse"><stop stop-color="#52D17C"/><stop offset="1" stop-color="#22918B"/></linearGradient><linearGradient id="fluentColorDocumentAdd483" x1="8" x2="12.909" y1="28.632" y2="45.962" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#E3FFD9"/></linearGradient><radialGradient id="fluentColorDocumentAdd484" cx="0" cy="0" r="1" gradientTransform="matrix(-17.33333 17.73237 -10.47911 -10.24329 41.333 5.219)" gradientUnits="userSpaceOnUse"><stop offset=".362" stop-color="#4A43CB"/><stop offset="1" stop-color="#4A43CB" stop-opacity="0"/></radialGradient><radialGradient id="fluentColorDocumentAdd485" cx="0" cy="0" r="1" gradientTransform="matrix(.8 17.875 -17.9901 .80516 12.8 40.563)" gradientUnits="userSpaceOnUse"><stop offset=".535" stop-color="#4A43CB"/><stop offset="1" stop-color="#4A43CB" stop-opacity="0"/></radialGradient></defs></g></svg>';
            
            divButtons.innerHTML = svgSave;
            confirmEditTaskButAction(idTask);
        })
        })
}
const confirmEditTaskButAction = (idTask) => {
    const saveBut = document.querySelector('#saveIcon');
    saveBut.addEventListener('click', (ev) => {
        let divValuesTitles = ev.target.closest('article').firstElementChild.firstElementChild.nextElementSibling;
        let previousTaskName = divValuesTitles.firstElementChild.value;
        let previousTaskStatus = divValuesTitles.firstElementChild.nextElementSibling.value
        while(divValuesTitles.firstElementChild){
            divValuesTitles.firstElementChild.remove();
        }
        divValuesTitles.append(elementsValuesForConfirmEditAction('p', previousTaskName));
        divValuesTitles.append(elementsValuesForConfirmEditAction('h2', previousTaskStatus));
        let ValuesDate = divValuesTitles.nextElementSibling.firstElementChild.nextElementSibling;
        ValuesDate.setAttribute('disabled', 'disabled')
        let divButtons = divValuesTitles.nextElementSibling.nextElementSibling;
        while(divButtons.firstElementChild){
            divButtons.firstElementChild.remove();
        }
        const svgIcons = `<svg id='deleteIcon' width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.4 0 0 5.4 0 12C0 18.6 5.4 24 12 24C18.6 24 24 18.6 24 12C24 5.4 18.6 0 12 0ZM12 2.66667C14.0667 2.66667 16 3.4 17.6 4.53333L4.53333 17.6C3.4 16 2.66667 14.0667 2.66667 12C2.66667 6.86667 6.86667 2.66667 12 2.66667ZM12 21.3333C9.93333 21.3333 8 20.6 6.4 19.4667L19.4667 6.4C20.6 8 21.3333 9.93333 21.3333 12C21.3333 17.1333 17.1333 21.3333 12 21.3333Z"
                      fill="#FF0000"/>
                    </svg>
                    
                    <svg id='editIcon' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.66667 28C5.93333 28 5.30578 27.7391 4.784 27.2173C4.26222 26.6956 4.00089 26.0676 4 25.3333V6.66667C4 5.93333 4.26133 5.30578 4.784 4.784C5.30667 4.26222 5.93422 4.00089 6.66667 4H18.5667L15.9 6.66667H6.66667V25.3333H25.3333V16.0667L28 13.4V25.3333C28 26.0667 27.7391 26.6947 27.2173 27.2173C26.6956 27.74 26.0676 28.0009 25.3333 28H6.66667ZM12 20V14.3333L24.2333 2.1C24.5 1.83333 24.8 1.63333 25.1333 1.5C25.4667 1.36667 25.8 1.3 26.1333 1.3C26.4889 1.3 26.828 1.36667 27.1507 1.5C27.4733 1.63333 27.7676 1.83333 28.0333 2.1L29.9 4C30.1444 4.26667 30.3333 4.56133 30.4667 4.884C30.6 5.20667 30.6667 5.53422 30.6667 5.86667C30.6667 6.19911 30.6058 6.52711 30.484 6.85067C30.3622 7.17422 30.1676 7.46844 29.9 7.73333L17.6667 20H12ZM14.6667 17.3333H16.5333L24.2667 9.6L23.3333 8.66667L22.3667 7.73333L14.6667 15.4333V17.3333Z" fill="white"/>
                      </svg>
                    `;
        divButtons.innerHTML = svgIcons;
        const indexOfElementToModify = task.findIndex(el => el.id === idTask);
        console.log(idTask)
        task[indexOfElementToModify] = {id: idTask, title: previousTaskName, status: previousTaskStatus, date: ValuesDate.value};
        deleteTaskButAction();
        editTaskButAction();
    });
}
const elementsValuesForConfirmEditAction = (element, text) => {
    let elementDiv = document.createElement(element);
    const txt = document.createTextNode(text);
    elementDiv.append(txt);
    return elementDiv;
}
const createInput = (prevValue) => {
    const textInput = document.createElement('input');
    textInput.setAttribute('type', 'text');
    textInput.setAttribute('autocomplete', 'task');
    textInput.setAttribute('required', 'required');
    textInput.value = prevValue;
    return textInput
}
const createSelect = (prevValue) => {
    const selectInput = document.createElement('select');
    selectInput.append(optionsForSelectEditTaskStatus('Pendiente'));
    selectInput.append(optionsForSelectEditTaskStatus('Finalizado'));
    selectInput.append(optionsForSelectEditTaskStatus('No iniciada'));
    selectInput.value = prevValue
    return selectInput
}
const optionsForSelectEditTaskStatus = (value) => {
    const optionEnded = document.createElement('option');
    optionEnded.setAttribute('value', value);
    const textOptionEnded = document.createTextNode(value);
    optionEnded.append(textOptionEnded);
    return optionEnded
}
const generateTaskDivByType = (type) => {
    const div = document.createElement('div');
    div.setAttribute('class', `main__container__taskList__cart__grid__itemsType${type}`);
    return div
}
const createH3orH2 = (text, type) => {
    const h3OrH2 = document.createElement(type);
    const txt = document.createTextNode(text);
    h3OrH2.append(txt);
    return h3OrH2;
}
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
}
const saveAllTaskButAction = (saveAllTaskBut) => {
    saveAllTaskBut.addEventListener('click', async(ev) => {
        if(localStorage.getItem('articles')){
            localStorage.clear();
        }
        localStorage.setItem('articles', JSON.stringify(task))
        if(token && idTable){
            removeErrorMessage();
            await removeAllTaskFromBaserow();
            await postTask(task);
            alert('Guardado Correctamente en baserow');
        }else{
            createErrorMessage('El token o el idTable no son correctos pero se ha guardado en localStorage');
        }
    })
}

const removeElementHeaderContainer = () => {
    while(headerContainer.firstChild){
        headerContainer.firstChild.remove();
    }
}

const createBut = (txt, classCss, id, callback) => {
    const but = document.createElement('button');
    let text = document.createTextNode(txt);
    but.append(text);
    but.setAttribute('class', classCss);
    but.setAttribute('id', id);
    but.addEventListener('click', callback);
    return but;
}

const createAddTaskBaserowBut = () => {
    removeElementHeaderContainer();
        const addApiKetBut = createBut('Agregar Taskplanner en Baserow', 'header__Notion__AddTaskPlanner', 'addApiKey', ()=> {
        token = '';
        removeElementHeaderContainer();
        const h3 = createH3orH2('Agregue su token y su idTable: ', 'h3');
        const input = createInput('');
        const input2 = createInput('');
        const submitApiKey = createBut('Agregar Api', 'header__Notion__AddTaskPlanner', 'addApiKey', () => {
            token = input.value;
            idTable = input2.value;
            createRemoveApiKeyBut();
        });
        headerContainer.append(h3, input, input2, submitApiKey);
        });
    headerContainer.append(addApiKetBut);
}
const postTask = (task) => {
    try{
        task.forEach(async(el) => {
            const response = await fetch(`https://api.baserow.io/api/database/rows/table/${idTable}/`, {
                method: "POST",
                headers: {
                  "Authorization": `Token ${token}`,
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  "field_4009866": el.title,
                    "field_4009868": el.status,
                    "field_4009867": el.date
                })
              });
            const result = await response.json();
            console.log(result);
        })
        
    }catch ( error ){
        return error;
    }
    
}
const removeAllTaskFromBaserow = async() => {
    try{
    const getRes = await fetch(`https://api.baserow.io/api/database/rows/table/${idTable}/?user_field_names=true`, {
      headers: {
        "Authorization": `Token ${token}`
      }
    });
    const existing = await getRes.json();
    for (const el of existing.results) {
      await fetch(`https://api.baserow.io/api/database/rows/table/${idTable}/${el.id}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Token ${token}`
        }
      });
      console.log(`Fila con id ${el.id} eliminada`);
    }
    }catch(error){
        console.log(error);
    }
}

const createErrorMessage = (text) => {
    let h2Error = createH3orH2(text, 'h2');
    errorDiv.append(h2Error);
}
const removeErrorMessage = () => {
    while(errorDiv.firstChild){
        errorDiv.firstChild.remove();
    }
}
const createRemoveApiKeyBut = () => {
    removeElementHeaderContainer();
    const removeApiKeyBut = createBut('Quitar token e idTable', 'header__Notion__AddTaskPlanner', 'removeApiKeyBut', ()=> {
    token = '';
    idTable = '';
    removeElementHeaderContainer();
    createAddTaskBaserowBut();
    });
    headerContainer.append(removeApiKeyBut);
}
const openMeteoApiAndUserGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
        async (position) => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        console.log(lat, lon)
        try{
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`);
            const data = await response.json();
            console.log(data)
        }catch(err){
            console.log(err);
            createErrorMessage('Ha ocurrido un error');
        }
      }, 
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          createErrorMessage('Has denegado el acceso a la ubicación. No se puede obtener el clima. La sección tiempo requiere de este permiso');
        } else {
          alert("Error al obtener la ubicación: " + error.message);
        }
        console.error("Geolocation error:", error);
      });
}