
document.addEventListener("DOMContentLoaded", () => {
    
    const wordList = [['q','a','z','i',
                        'e','j','o','o',
                        'r','a','n','n',
                        'e','x','e','s'], 
                        ['l', 'a', 'c', 'k', 'i', 'r', 'o', 'n', 'm', 'e', 'r', 'e', 'b', 'a', 'k', 'e'],
                        ['l', 'i', 'm', 'b', 'a', 'r', 'e', 'a', 'c', 'o', 'r', 'k', 'k', 'n', 'e', 'e'],
                        ['b', 'a', 'r', 'n', 'a', 'r', 'e', 'a', 'l', 'i', 'a', 'r', 'l', 'a', 'd', 'y'],
                        ['s', 'l', 'a', 'm', 't', 'i', 'l', 'e', 'e', 'a', 't', 's', 'p', 'r', 'o', 's'],
                        ['t', 'a', 'n', 's', 'a', 'r', 'e', 'a', 'l', 'i', 'o', 'n', 'l', 'a', 'n', 'd'],
                        ]
    var wordArray = wordList[Math.floor(Math.random()*wordList.length)]
    console.log(wordArray)
    var remainingArray = [];
    var hintArray = [];
    var clicking = false;
    var filledLetters = [];
    var filledChoices = [];
    
    const helpButton = document.getElementById('helpButton');
    const restartButton = document.getElementById('restartButton');
    const checkButton = document.getElementById('checkButton');
    const hintButton = document.getElementById('hintButton');
    const beforeArrow = document.getElementById("before");
    const nextArrow = document.getElementById("after");
    const congratsButton = document.getElementById('congratsButton');
    var count = document.getElementById('checkCount');
    checkCount = 0;

    helpButton.click();

    const clickSound = new Audio();
    clickSound.src = "./click-6.mp3";

    for( let i = 0; i < 16; i++){
        remainingArray.push(i);
        filledChoices.push('1');
    }

    createSquares();
    function createSquares(){
        const gameBoard = document.getElementById("board");

        for(let i = 0; i <  16; i ++){
            let square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('id',i);
            gameBoard.appendChild(square);
        }
    
    createAvailableWords();
    function createAvailableWords(){
        for( let j = 0; j < 6; j ++){
            let k = Math.floor(Math.random()*wordArray.length);
                while(hintArray.includes(k)){
                    k = Math.floor(Math.random()*wordArray.length);
                }
                hintArray.push(k);
                let index = remainingArray.indexOf(k);
                if ( index > -1){
                    remainingArray.splice(index, 1);
                }
            }
        }        
    }

    for(i = 0; i < remainingArray.length; i ++){
        k = remainingArray[i];
        document.getElementById(k).classList.add('blank');
        console.log(k);
    }

    createChoice();
    function createChoice(){
        for(let i = 0; i < 10; i ++){
            let choice = document.createElement('button');
            choice.classList.add('choice');
            choice.setAttribute('id', 'c'+i);
            choiceBoard.appendChild(choice);
        }
    }

    displayHints();
    function displayHints(){
        for( let i = 0; i < hintArray.length; i ++){
            k = hintArray[i];
            document.getElementById(k).textContent = wordArray[k];
            document.getElementById(k).style.backgroundColor = "#a8dadc";
            document.getElementById(k).style.border = "2px solid #a8dadc";
            
        }

    displayChoices();
    function displayChoices(){
        remainingArray.sort((a, b) => 0.5 - Math.random());
        for( let i = 0; i < remainingArray.length; i ++){
            k = remainingArray[i];
            document.getElementById('c'+ i).textContent = wordArray[k];
        }
    }


    const blanks = document.querySelectorAll(".blank");
    const choices = document.querySelectorAll(".choice");

    blanks.forEach(square =>{
        square.addEventListener('click', sonclick);
    })

    function sonclick(){
        console.log('click');
        this.className += ' sclick';
        for( let i=0; i< blanks.length; i ++){
            if(blanks[i] != document.getElementById(this.id)){
                blanks[i].className = ' square';
                blanks[i].classList.add('blank');
            }
        }
        clickSound.play();
    }

    function chover(){
        this.style.width = '65px';
        this.style.height = '65px';
    }

    function choverout(){
        this.style.width = '60px';
        this.style.height = '60px';
    }

    function conclick(){
        let num = document.querySelector('.sclick');
        if(num.textContent != null){
            filledChoices[num.id].className = 'choice';
            filledChoices[num.id] = this;
            clickSound.play();
        }
         
        num.textContent = this.textContent;
        filledLetters.push(this.textContent);
        filledChoices.forEach(id => {
            if(id != '1'){
                id.classList.add('invisible');
                id.disabled = true;
            }
        })
        
        for( let i = 0; i < choices.length; i++){
            if(filledChoices.includes(choices[i]) == false){
                choices[i].disabled = false;
            }
        }  
    }
    
    choices.forEach(choice => {
        choice.addEventListener('click', conclick);
        choice.addEventListener('mouseover', chover);
        choice.addEventListener('mouseout', choverout);
    })

    function before(){
        wordArray = wordList[wordList.indexOf(wordArray)-1];
        location.reload();
    }
    
    function next(){
        wordArray = wordList[wordList.indexOf(wordArray)+1];
        location.reload();
    }

    hintButton.addEventListener('click', definition);
    checkButton.addEventListener('click', check);
    restartButton.addEventListener('click', restart);
    beforeArrow.addEventListener('click', before);
    nextArrow.addEventListener('click', next);
    
    function definition(){
        console.log(wordList.indexOf(wordArray));
        switch(wordList.indexOf(wordArray)){
            case 0:
                document.getElementById('a1').textContent = 'magistrate or judge of a Sharia court, who also exercises extrajudicial functions.';
                document.getElementById('a2').textContent = 'fibre of gomuti';
                document.getElementById('a3').textContent = 'a stanza especially of a song';
                document.getElementById('a4').textContent = 'plural form of a former spouse or former partner in an intimate relationship';
                document.getElementById('d1').textContent = 'variant of kere';
                document.getElementById('d2').textContent = 'a Greek hero in the Trojan War who kills himself because the armor of Achilles is awarded to Odysseus';
                document.getElementById('d3').textContent = 'any of five great divisions of the earth\'s surface with respect to latitude and temperature';
                document.getElementById('d4').textContent = 'plural of an atom or group of atoms that carries a positive or negative electric charge';
                break;
            case 1:
                document.getElementById('a1').textContent = 'to be short or have need of something'
                document.getElementById('a2').textContent = 'a silver-white malleable ductile magnetic heavy metallic element that readily rusts in moist air';
                document.getElementById('a3').textContent = 'being nothing more than';
                document.getElementById('a4').textContent = 'to cook by dry heat especially in an oven';
                document.getElementById('d1').textContent = 'a leg or arm of a human being';
                document.getElementById('d2').textContent = 'the scope of a concept, operation, or activity';
                document.getElementById('d3').textContent = 'a usually cork stopper for a bottle or jug';
                document.getElementById('d4').textContent = 'a joint in the middle part of the human leg';
                break;
            case 2:
                document.getElementById('a1').textContent = 'a usually large building for the storage of farm products or feed';
                document.getElementById('a2').textContent = 'the scope of a concept, operation, or activity';
                document.getElementById('a3').textContent = 'a person who tells lies';
                document.getElementById('a4').textContent = 'a woman of superior social position';
                document.getElementById('d1').textContent = 'a round or roundish body or mass';
                document.getElementById('d2').textContent = 'an accompanied, elaborate melody sung (as in an opera) by a single voice';
                document.getElementById('d3').textContent = 'to receive or take in the sense of (letters, symbols, etc.) especially by sight or touch';
                document.getElementById('d4').textContent = 'not any : not one';
                break;         
            case 3:
                document.getElementById('a1').textContent = 'to shut forcibly and noisily';
                document.getElementById('a2').textContent = 'a flat or curved piece of fired clay, stone, or concrete used especially for roofs, or floors';
                document.getElementById('a3').textContent = 'third person singular form of the action of taking food or a meal';
                document.getElementById('a4').textContent = 'advantages';
                document.getElementById('d1').textContent = 'lift your foot and put it down in a different place';
                document.getElementById('d2').textContent = 'a person who tells lies';
                document.getElementById('d3').textContent ='the second highest voice part in a 4-part chorus';
                document.getElementById('d4').textContent = 'a disordered, untidy, offensive, or unpleasant state or condition';
                break;
            case 4:
                document.getElementById('a1').textContent = 'plural of your skin has become darker than usual because you have been in the sun';
                document.getElementById('a2').textContent = 'the scope of a concept, operation, or activity';
                document.getElementById('a3').textContent = 'a large wild member of the cat family that is found in Africa';
                document.getElementById('a4').textContent = 'an area of ground';
                document.getElementById('d1').textContent = 'having a greater height than is normal or average';
                document.getElementById('d2').textContent = 'a song for one of the leading singers in an opera or choral work';
                document.getElementById('d3').textContent = 'lights or signs are made from glass tubes filled with this gas';
                document.getElementById('d4').textContent = 'the substance that is used for making glass;'
        }
    }

    function restart(){
        location.reload();
    }
    function check(){
        let correct = 0;
        checkCount += 1;
        count.textContent = "Check(s): "  + checkCount;
        for(let i = 0; i < 16; i ++){
            let currentSquare = document.getElementById(i);
            if(currentSquare.textContent == wordArray[i]){
                correct +=1;
                currentSquare.style.backgroundColor = '#a8dadc';
                currentSquare.style.border = " 2px solid #a8dadc";
                currentSquare.removeEventListener('click',sonclick);
                if(filledChoices[currentSquare.id] != '1'){
                    filledChoices[currentSquare.id] = '1';
                }
            }else{
                currentSquare.textContent = null;
                filledChoices[currentSquare.id].className = 'choice';
                filledChoices[currentSquare.id].disabled = false;
                filledChoices[currentSquare.id] = '1';
            }
        }
        console.log(correct);
        if(correct == 16){
            document.getElementById('nochecks').textContent = checkCount ;
            document.getElementById('congratsPop').style.visibility = 'visible';
            document.getElementById('congratsPop').style.opacity = 1;
            console.log('c');
        }
        }
    }
  }
)

