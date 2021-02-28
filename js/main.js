


if(window.location.pathname == "/step_one.html"){
    
    let mode = document.querySelectorAll('.mode');
    mode[0].onclick = function(e){
        localStorage.setItem('mode',1);
    }
    mode[1].onclick = function(e){
        localStorage.setItem('mode',2);
    }
}

if(window.location.pathname == "/step_two.html"){
   
    let size = document.querySelectorAll(".size");
    size[0].onclick = function(e){
        localStorage.setItem('size',5)
        
    }
    size[1].onclick = function(e){
        localStorage.setItem('size',6)
    }
    size[2].onclick = function(e){
        localStorage.setItem('size',7)
    }
    
}   



if(window.location.pathname == "/canvas.html"){
    
    let canvasWrapper = document.querySelector('.canvas_wrapper');
    let str = localStorage.getItem('info').split(';');
    let row = "";
    for(let i = 0; i <str.length;i++){
        row += str[i].trim() + " ";
    }
    var uniqueListIndex=row.split(' ').filter(function(currentItem,i,allItems){
        return (i == allItems.indexOf(currentItem));
    });
    uniqueListIndex.pop();
    str.pop();
    
    let elements = [];
    for(let i = 0; i <str.length;i++){
        let val = str[i].split(" ");
        elements[i] = val;
    }
    
    let selectedColor = document.querySelector('.color-block');
    
    let elemconcat = [].concat(...elements);
    console.log(elemconcat);
    let canvas = document.querySelector('.canvas');
    canvas.onclick = function(e){
        if (e.target.tagName == "TD" && e.target.innerHTML == "")
        {
            let id = e.target.id;
            e.target.style.backgroundColor = `${colorValue}`;
            if (e.target.style.backgroundColor == elements[id.substr(0,1).trim()][id.substr(1,2)].trim()){
                highlight(canvas,"greenyellow");
            }
            else{
                highlight(canvas,"red");
            }
            for(i in elemconcat){
                if(elemconcat[i].trim()==td[i].style.backgroundColor){
                    if(i == elemconcat.length-1){
                        location.href = './congratulation.html';

                    }
                }
                else{
                    break;
                }
            }
        }
        
    };
    canvas.addEventListener('dblclick',(e)=>{
        if (e.target.tagName == "TD" && e.target.innerHTML == ""){
            e.target.style.backgroundColor = "white";
        }
    })
    let alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','a1','b1'];
    canvas.innerHTML = "";
    let size = localStorage.getItem('size');
    let b = +size + 1;
    if(localStorage.getItem('mode')==1){
        for(i = 0; i <= size; i++){
            canvas.innerHTML += "<tr></tr>";
            let tr = document.getElementsByTagName('TR');
            for(j = 0; j<=size;j++){
               if(i == 0 && j > 0){
                tr[i].innerHTML += `<td style = "width:${400/b}px;height:${400/b}px;font-size:12px;">${alphabet[j-1]}</td>`;
                continue;
               }
               if (j == 0 && i > 0){
                tr[i].innerHTML += `<td style = "width:${400/b}px;height:${400/b}px;font-size:12px;">${i}</td>`;
                continue;
               }
               if(i == 0 && j ==0){
                   tr[i].innerHTML += `<td style = "width:${400/b}px;height:${400/b}px;font-size:12px;">&#9786;</td>`;
                   continue;
               }
               tr[i].innerHTML += `<td id = "${i-1}${j-1}" class = "td"; style = "background-color:white;"></td>`;
            }
        }
    }
    else{
        for(i = 0; i < size; i++){
            canvas.innerHTML += "<tr></tr>";
            let tr = document.getElementsByTagName('TR');
            for(j = 0; j<size;j++){
               tr[i].innerHTML += `<td id = '${i}${j}' class = "td" style = "background-color:white;width:${400/b}px;height:${400/b}px;"></td>`;
            }
        }
    }

    let guideWrapper = document.querySelector('.guide_wrapper');
    if(localStorage.getItem('mode') == 1){

        for(let i = 0;i < uniqueListIndex.length;i++){
            guideWrapper.innerHTML += `<div class = "guide_item"><div class = "guide_color" style = "background-color: ${uniqueListIndex[i]}"></div><div class = "guide_info"></div></div>`
        }
        
        let guideInfo = document.querySelectorAll('.guide_info');
        let guideColor = document.querySelectorAll('.guide_color');
        for(let i = 0;i < guideColor.length;i++){
            for(let j = 0;j < elements.length;j++){
                for(let k = 0; k < elements.length;k++){
                    if(guideColor[i].style.backgroundColor == elements[j][k].trim()){
                        guideInfo[i].innerHTML += j + 1 + alphabet[k] + "<br>";
                        
                    }
                    
                }
            }
        }
        
        
    }
    if(localStorage.getItem('mode') == 2){
        let table = document.createElement('table');
        guideWrapper.append(table);
        for(let i = 0; i < elements.length;i++){
            table.innerHTML += "<tr class = guide_rows></tr>";
        }
        let guideRows = document.querySelectorAll('.guide_rows');
        
        
        
        for (k in elements){
            for(let i = 0; i<elements[k].length;i++){
                let counter = 0;
                for( let j = i; j< elements[k].length;j++){
                    if(elements[k][j].trim() == elements[k][i].trim()){
                        counter += 1;
                    }
                    else{
                        break;
                    }
                }
                guideRows[k].innerHTML += `<td style = "width:${400/b}px;height:${400/b}px;font-size:12px;background-color: ${elements[k][i]}" class = "td">${counter}</td>`;
                i += counter-1;
            }
        }

      
        
    }

    let colors = document.createElement('div');
    colors.className = "colors_wrapper";
    canvasWrapper.append(colors);
    
    for(let i = 0;i<uniqueListIndex.length;i++)
    {
        colors.innerHTML += `<div class = 'color' style = 'background-color: ${uniqueListIndex[i]}'></div>`;
        
    }

    let colorBlock = document.querySelectorAll('.color');
    let colorValue;
    for(let i = 0; i<colorBlock.length;i++){
        colorBlock[i].onclick = function(e){
            if(e.target.classList.contains("highlight")){
                e.target.classList.remove('highlight');
                colorValue = "";
                selectedColor.style.backgroundColor = "";
                
            }
            else{
                for(let j = 0; j<colorBlock.length;j++){
                    colorBlock[j].classList.remove('highlight');
                }
                e.target.classList.add('highlight');
                colorValue = e.target.style.backgroundColor;
                selectedColor.style.backgroundColor = e.target.style.backgroundColor;
            }
            
        }
    }
    let td = document.querySelectorAll(".td");
    
    let helper = document.querySelector(".helper");
    helper.onclick = function(e){
        if (guideWrapper.style.visibility != "hidden"){
            guideWrapper.style.visibility = "hidden";
            
        }
        else{
            guideWrapper.style.visibility = "visible";
        }
    }
}


function highlight(elem,color){
    elem.style.boxShadow = `0px 0px 20px 2px ${color}`
    setTimeout(()=>{
        elem.style.boxShadow = "";
    },300);
}


if(window.location.pathname == "/test.php"){
    
    let size = document.querySelectorAll('.size');
    let mode = document.querySelectorAll('.mode');
    let selectedWrapper = document.querySelectorAll('selected_wrapper');
    let pictures = document.querySelectorAll('.picture');
    
    
    for(let i = 0; i < size.length; i++){
        size[i].onclick = function(e){
            for(let j = 0; j < size.length; j++){
                size[j].style.backgroundColor = "rgba(0, 0, 0, 0.2)";
            }
            size[i].style.backgroundColor = "rgba(0, 0, 0, 0.7)";
            localStorage.setItem('size',+size[i].getAttribute('data-size'));
            for (let j = 0; j <pictures.length; j++){
                if(pictures[j].getAttribute('data-size') != size[i].getAttribute('data-size')){
                    pictures[j].style.display = "none";
                }
                else{
                    pictures[j].style.display = "";
                }
            }
        }
    } 
    //читаем значение выбраного размера 

    for(let i = 0; i < mode.length; i++){
        mode[i].onclick = function(e){
            for(let j = 0; j < mode.length; j++){
                mode[j].style.backgroundColor = "rgba(0, 0, 0, 0.2)";
            }
            mode[i].style.backgroundColor = "rgba(0, 0, 0, 0.7)";
            localStorage.setItem('mode',+mode[i].getAttribute('data-mode'));
        }
    } 
    //читаем значение выбраного режима

    for(let i = 0;i <pictures.length; i++){
        pictures[i].onclick = function(e){
            
            localStorage.setItem('info',pictures[i].getAttribute('data-info'));
            localStorage.setItem('size', pictures[i].getAttribute('data-size'));
        }
    }

}