{\rtf1\ansi\ansicpg1252\cocoartf2759
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 document.addEventListener('DOMContentLoaded', function() \{\
    const tasks = document.querySelectorAll('.task-list li');\
    const dropzones = document.querySelectorAll('.dropzone');\
    const addTaskButton = document.getElementById('addTaskButton');\
    const taskPool = document.getElementById('taskPool');\
\
    // Load saved state from localStorage\
    loadState();\
\
    tasks.forEach(task => \{\
        task.addEventListener('dragstart', handleDragStart);\
        task.addEventListener('dblclick', () => editTask(task));\
    \});\
\
    dropzones.forEach(dropzone => \{\
        dropzone.addEventListener('dragover', handleDragOver);\
        dropzone.addEventListener('drop', function(e) \{\
            handleDrop(e);\
            saveState();\
        \});\
    \});\
\
    addTaskButton.addEventListener('click', () => \{\
        const taskText = prompt("Neue Aufgabe:");\
        if (taskText) \{\
            addTask(taskText);\
            saveState();\
        \}\
    \});\
\
    function handleDragStart(e) \{\
        e.dataTransfer.setData('text/plain', e.target.textContent);\
    \}\
\
    function handleDragOver(e) \{\
        e.preventDefault();\
        e.dataTransfer.dropEffect = 'move';\
    \}\
\
    function handleDrop(e) \{\
        e.preventDefault();\
        const data = e.dataTransfer.getData('text/plain');\
        e.target.textContent = data;\
    \}\
\
    function addTask(taskText) \{\
        const taskItem = document.createElement('li');\
        taskItem.draggable = true;\
        taskItem.textContent = taskText;\
        taskItem.addEventListener('dragstart', handleDragStart);\
        taskItem.addEventListener('dblclick', () => editTask(taskItem));\
        taskPool.appendChild(taskItem);\
    \}\
\
    function editTask(taskItem) \{\
        const newText = prompt("Bearbeite die Aufgabe:", taskItem.textContent);\
        if (newText) \{\
            taskItem.textContent = newText;\
            saveState();\
        \}\
    \}\
\
    function saveState() \{\
        const aryaTasks = document.querySelectorAll('.time-table:nth-of-type(1) .dropzone');\
        const aleynaTasks = document.querySelectorAll('.time-table:nth-of-type(2) .dropzone');\
        const poolTasks = document.querySelectorAll('#taskPool li');\
\
        let aryaData = Array.from(aryaTasks).map(task => task.textContent);\
        let aleynaData = Array.from(aleynaTasks).map(task => task.textContent);\
        let poolData = Array.from(poolTasks).map(task => task.textContent);\
\
        localStorage.setItem('aryaTasks', JSON.stringify(aryaData));\
        localStorage.setItem('aleynaTasks', JSON.stringify(aleynaData));\
        localStorage.setItem('poolTasks', JSON.stringify(poolData));\
    \}\
\
    function loadState() \{\
        const aryaData = JSON.parse(localStorage.getItem('aryaTasks')) || [];\
        const aleynaData = JSON.parse(localStorage.getItem('aleynaTasks')) || [];\
        const poolData = JSON.parse(localStorage.getItem('poolTasks')) || [];\
        \
        const aryaTasks = document.querySelectorAll('.time-table:nth-of-type(1) .dropzone');\
        const aleynaTasks = document.querySelectorAll('.time-table:nth-of-type(2) .dropzone');\
\
        aryaTasks.forEach((task, index) => task.textContent = aryaData[index] || '');\
        aleynaTasks.forEach((task, index) => task.textContent = aleynaData[index] || '');\
\
        taskPool.innerHTML = ''; // Clear existing tasks\
        poolData.forEach(taskText => addTask(taskText));\
    \}\
\});\
}